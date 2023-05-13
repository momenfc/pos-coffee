const connectDB = require('./config/config');
const dotenv = require('dotenv');
const Product = require('./models/productModal');
const productsData = require('./data/products');
const Stock = require('./models/stockModal');
const stockData = require('./data/stock');
const userData = require('./data/users');
console.log('userData:', userData);
const User = require('./models/userModel');

//
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // await Product.deleteMany();
    // await Product.insertMany(productsData);
    // console.log('Products data reset successfuly');

    await User.deleteMany();
    const users = await User.insertMany(userData);
    console.log('importData  users:', users);
    // await Stock.deleteMany();
    // await Stock.insertMany(stockData);

    process.exit();
  } catch (error) {
    console.log('importData  error:', error);
    process.exit(1);
  }
};

importData();
