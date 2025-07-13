/* const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet', // or 'Item' depending on your model
      },
      quantity: {
        type: Number,
        default: 1,
      }
    }
  ],
  total_amount: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema); */
