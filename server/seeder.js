const connectDB = require('./config/config');
const dotenv = require('dotenv');
const Product = require('./models/productModal');
const productsData = require('./data/products');
const Stock = require('./models/stockModal');
const stockData = require('./data/stock');

//
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // await Product.deleteMany();
    // await Product.insertMany(productsData);
    // console.log('Products data reset successfuly');

    console.log('Stock data reset ...');
    await Stock.deleteMany();
    await Stock.insertMany(stockData);
    console.log('Stock data reset successfuly');

    process.exit();
  } catch (error) {
    console.log('importData  error:', error);
    process.exit(1);
  }
};

importData();
