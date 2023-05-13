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

  user.password = undefined;
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

  user.password = undefined;

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});

exports.getAll = factory.getAll(User);
exports.getOne = factory.getOne(User);
exports.addOne = factory.addOne(User);
exports.deleteOne = factory.deleteOne(User);

exports.updateOne = catchAsync(async (req, res, next) => {
  const data = {
    ...req.body,
  };
  if (req.body?.isResetPassword) {
    data.password = '123456';
  }
  const user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('No user found with that ID', 404));

  user.password = undefined;

  res.status(201).json({
    code: 201,
    status: 'succes',
    data: {
      data: user,
    },
  });
});
