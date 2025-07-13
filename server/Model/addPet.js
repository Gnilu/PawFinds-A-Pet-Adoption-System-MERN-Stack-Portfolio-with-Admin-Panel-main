const mongoose = require("mongoose");

const petsSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: String, required: true },
  breed: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Pets", petsSchema);

