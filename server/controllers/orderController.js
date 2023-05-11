const Order = require('../models/orderModal');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const orderController = {};

// orderController.addItem = catchAsync(async (req, res, next) => {
//   console.log('req.body', req.body);
//   const order = await Order.find();
//   console.log('orderController.addItem=catchAsync  order:', order);
// });

orderController.getAll = factory.getAll(Order);
orderController.getOne = factory.getOne(Order);
orderController.update = factory.updateOne(Order);
orderController.delete = factory.deleteOne(Order);
orderController.add = catchAsync(async (req, res, next) => {
  const orderData = { ...req.body, takenBy: req.user?.name };
  const order = await Order.create(orderData);

  res.status(201).json({
    code: 201,
    status: 'succes',
    data: {
      data: order,
    },
  });
});

module.exports = orderController;
