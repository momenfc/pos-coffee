const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, role } = req.body;

  const user = await User.create({
    name,
    role,
  });

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new AppError('Please provide name and password!', 400));
  }

  const user = await User.findOne({ name }).select('+password');

  const isCorrectPassword = user.password === password;

  if (!user || !isCorrectPassword)
    return next(new AppError('Incorrect name or password', 401));

  createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  const auth = req.headers?.authorization;

  let token;
  if (auth && auth.startsWith('Bearer')) {
    token = auth?.split(' ')[1];
  }
  if (!token)
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );

  req.user = user;
  next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You dont have permission to perform this action.', 403)
      );
    }

    next();
  });

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } = req.body;
  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  const isPassCorrect = user.password === currentPassword;

  if (!isPassCorrect) {
    return next(new AppError('Password incorrect', 401));
  }
  user.password = newPassword;

  await user.save();
  createSendToken(user, 200, res);
});
