const app = require('./app');
const connectDB = require('./config/config');

const port = process.env.PORT || 8080;
console.log('port:', port);

// CONNECT MONGOODB
connectDB();
// RUN SERVER
const server = app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
