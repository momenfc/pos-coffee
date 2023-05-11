const Item = require('../models/productModal');
const catchAsync = require('../utils/catchAsync');

const viewController = {};

viewController.index = catchAsync(async (req, res, next) => {
  return res.render('index', {
    title: 'Home',
  });
});

viewController.email = catchAsync(async (req, res, next) => {
  return res.render('email/passwordReset', {
    firstName: 'Memo',
  });
});

module.exports = viewController;
