const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  // Optional fields
  first_name: String,
  last_name:  String,
  phone_no:   String,
  address:    String,
  user_image: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
