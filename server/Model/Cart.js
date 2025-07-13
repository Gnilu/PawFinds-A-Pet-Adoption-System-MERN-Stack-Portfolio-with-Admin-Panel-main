// server/Model/Cart.js

const mongoose = require("mongoose");

// Define schema for individual items in the cart
const cartItemSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet", // Must match the Pet model exactly
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  selected: {
    type: Boolean,
    default: false, // Indicates if the item is selected for checkout
  },
});

// Define main Cart schema
const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
    unique: true,
  },
  items: [cartItemSchema], // Embedded array of cart items
  added_at: {
    type: Date,
    default: Date.now,
  },
});

// Export the Cart model
module.exports = mongoose.model("Cart", cartSchema);
