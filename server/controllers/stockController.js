const Stock = require('../models/stockModal');
const Product = require('../models/productModal');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const stockController = {};

stockController.updateProducts = async products => {
  // console.log('products:', products);
  const stock = (await Stock.find())[0];
  // console.log('stockController.update=catchAsync  stock:', stock);

  // Make sure stock exists
  if (!stock) {
    return next(new AppError('No stock found', 404));
  }

  // Update stock
  const updatedStock = await Stock.findByIdAndUpdate(stock._id, { products });
  console.log('updateProducts  updatedStock:💥', updatedStock);
};

stockController.get = catchAsync(async (req, res, next) => {
  const stock = (await Stock.find().populate('products'))[0];

  res.status(200).json({
    code: 200,
    status: 'succes',
    data: {
      stock,
    },
  });
});

stockController.update = catchAsync(async (req, res, next) => {
  console.log('stockController.update=catchAsync  req:', req);
  // Get all stock
  const stock = (await Stock.find())[0];
  // console.log('stockController.update=catchAsync  stock:', stock);

  // Make sure stock exists
  if (!stock) {
    return next(new AppError('No stock found', 404));
  }

  // const currentProduct = await Product.find();

  // Update products stockAvailable
  req.body.forEach(async item => {
    await Product.findByIdAndUpdate(item.id, {
      stockAvailable: item.stockAvailable,
    });
  });
  // Update stock
  stock.lastUpdate = Date.now();
  stock.updatedBy = req.user;

  await stock.save();

  res.status(200).json({
    status: 'success',
    data: stock,
  });
});
// stockController.update = catchAsync(async (req, res, next) => {
//   console.log(req.body);
//   // Get all stock
//   const stock = (await Stock.find())[0];
//   // console.log('stockController.update=catchAsync  stock:', stock);

//   // Make sure stock exists
//   if (!stock) {
//     return next(new AppError('No stock found', 404));
//   }

//   // const currentProduct = await Product.find();

//   // Update stock

//   const updatedStock = await Stock.findByIdAndUpdate(
//     stock._id,
//     { products: req.products },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   // console.log('stockController.update=catchAsync  updatedStock:', updatedStock);

//   res.status(200).json({
//     status: 'success',
//     data: updatedStock,
//   });
// });

module.exports = stockController;
