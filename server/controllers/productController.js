const Product = require('../models/productModal');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAll = factory.getAll(Product);
exports.getOne = factory.getOne(Product);
exports.add = factory.addOne(Product);
exports.update = factory.updateOne(Product);
exports.delete = factory.deleteOne(Product);

// exports.updateStockAvalible = catchAsync(async (req, res, next) => {
//   req.body.forEach(async item => {
//     await Product.findByIdAndUpdate(item.id, {
//       stockAvailable: item.stockAvailable,
//     });
//   });

//   next();
// });

// exports.updateStockAvalible = catchAsync(async (req, res, next) => {
//   // todo Need enhancement
//   const products = await Product.find();

//   const productsUpdated = products.map(product => {
//     req.body.forEach(item => {
//       if (item.id === product._id.toString()) {
//         product.stockAvailable = item.stockAvailable;
//       }
//     });

//     return product;
//   });

//   //   req.body.forEach(async item => {
//   //     await Product.findByIdAndUpdate(item.id, {
//   //       stockAvailable: item.stockAvailable,
//   //     });
//   //   });

//   req.products = productsUpdated;
//   next();
// });
