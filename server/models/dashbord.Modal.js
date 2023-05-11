const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  orders: [{ type: mongoose.Schema.ObjectId, ref: 'Order' }],
  products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
