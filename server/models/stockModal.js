const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  updatedBy: {
    type: Object,
    default: null,
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
});

// stockSchema.pre('save', async function (next) {
//   console.log('this:⭐️⭐️⭐️⭐️', this);
//   // this.lastUpdate = Date.now();
//   next();
// });

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
