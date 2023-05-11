const mongoose = require('mongoose');
const Product = require('./productModal');

const orderSchema = new mongoose.Schema({
  items: {
    type: [Object],
    requried: true,
  },
  orderNum: Number,
  total: Number,
  takenBy: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

orderSchema.pre('save', async function (next) {
  // console.log('orderSchema  this:', this);
  const itemsPromises = this.items.map(async ({ id, qty }) => {
    const item = await Product.findByIdAndUpdate(id, {
      $inc: { stockAvailable: -qty },
    })
      .select('-__v -stockAvailable -category -image')
      .lean();

    item.qty = qty;
    return item;
  });
  this.items = await Promise.all(itemsPromises);
  this.total = this.items.reduce((a, c) => a + c.price * c.qty, 0);
  const allItems = await Order.find();
  this.orderNum = (allItems[allItems.length - 1]?.orderNum || 0) + 1;

  // console.log('this:', this);
  next();
});
orderSchema.post('findOneAndDelete', async function (doc) {
  // console.log('orderSchema  doc:⭐️⭐️⭐️⭐️', doc);
  doc.items.forEach(
    async item =>
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stockAvailable: item.qty },
      })
  );
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
