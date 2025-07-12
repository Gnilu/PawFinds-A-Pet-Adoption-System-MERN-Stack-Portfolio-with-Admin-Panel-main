const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  // add other fields as needed
});

module.exports = mongoose.model("Item", itemSchema);
