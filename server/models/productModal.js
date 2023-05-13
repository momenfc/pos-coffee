const mongoose = require('mongoose');
// const stockController = require('../controllers/stockController');
const Stock = require('./stockModal');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product must have a name'],
      unique: [true, 'Name repated try another name!'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price'],
    },
    category: {
      type: String,
      required: [true, 'Product must have a category'],
      // enum: {
      //   values: ['drinks', 'foods'],
      //   message: 'Category ',
      // },
    },
    qtyType: {
      type: String,
      required: [true, 'Product must have a qtyType'],
      enum: {
        values: ['piece', 'weight'],
        message: 'qtyType must be <piece | weight>',
      },
    },
    image: String,
    stockAvailable: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

productSchema.post(
  ['save', 'deleteOne', 'findOneAndDelete', 'findOneAndUpdate'],
  async function (doc) {
    const stock = (await Stock.find())[0];
    const productsIds = (await Product.find()).map(product => product._id);

    stock.products = productsIds;
    // console.log('stock:', stock);
    await stock.save();
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
