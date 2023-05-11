const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const orderRouter = express.Router();
orderRouter.use(authController.protect);
orderRouter.post('/', orderController.add);

orderRouter.use(authController.restrictTo('admin', 'lead'));
orderRouter.route('/').get(orderController.getAll);
orderRouter
  .route('/:id')
  .get(orderController.getOne)
  .patch(orderController.update)
  .delete(orderController.delete);

module.exports = orderRouter;
