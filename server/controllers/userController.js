const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...keys) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(k => {
    if (!keys.includes(k)) delete newObj[k];
  });
  return newObj;
};

exports.update = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'name', 'email');

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.roleUpdate = catchAsync(async (req, res, next) => {
  const { userId, role } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new AppError('userId is invalid', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.getAll = factory.getAll(User);
exports.getOne = factory.getOne(User);
exports.updateOne = factory.updateOne(User);
exports.deleteOne = factory.deleteOne(User);
