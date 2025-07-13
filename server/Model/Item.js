// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  // other fields if any
});

module.exports = mongoose.model("Item", itemSchema); // ✅ Name must be exactly "Item"
