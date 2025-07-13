const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet", // Reference to Pet model
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const deliveryDetailsSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postal_code: { type: String, required: true },
  phone_number: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  order_status: {
    type: String,
    enum: ["Pending", "Successful", "Failed"],
    default: "Pending",
  },
  total_amount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  final_amount: {
    type: Number,
    required: true,
  },
  order_items: [orderItemSchema],
  delivery_details: deliveryDetailsSchema,
  order_date: {
    type: Date,
    default: Date.now,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
