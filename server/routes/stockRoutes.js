const express = require('express');
const stockController = require('../controllers/stockController');
// const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const stockRouter = express.Router();

stockRouter.use(authController.protect, authController.restrictTo('admin'));
stockRouter
  .route('/')
  .get(stockController.get)
  // .patch(stockController.update,productController.updateStockAvalible, stockController.get);
  .patch(stockController.update);

module.exports = stockRouter;
