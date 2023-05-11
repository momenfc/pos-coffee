const Dashboard = require('../models/dashbord.Modal');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const dashboardController = {};

dashboardController.get = catchAsync(async (req, res, next) => {
  const dashboard = (await Dashboard.find().populate('products'))[0];

  res.status(200).json({
    code: 200,
    status: 'succes',
    data: {
      dashboard,
    },
  });
});

module.exports = dashboardController;
