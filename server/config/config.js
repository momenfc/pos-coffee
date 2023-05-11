const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE_URL;
    const connectDB = await mongoose.connect(DB, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log(`MongoDB Connected ${connectDB.connection.host}`);
  } catch (error) {
    console.log('module.exports=  error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
