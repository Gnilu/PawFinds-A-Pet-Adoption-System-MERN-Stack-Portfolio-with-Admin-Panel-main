const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    first_name: String,
    last_name: String,
    phone_no: String,
    address: String,
    profileImage: String,
    user_image: String
  },
  { timestamps: true }
);

// ✅ Add static methods
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

userSchema.statics.findAllUsers = function () {
  return this.find({ role: "user" });
};

// ✅ Add missing admin helpers
userSchema.statics.createAdmin = function (adminData) {
  return this.create(adminData);
};

userSchema.statics.findAllAdmins = function () {
  return this.find({ role: "admin" });
};

userSchema.statics.deleteById = function (userId) {
  return this.findByIdAndDelete(userId);
};

module.exports = mongoose.model("User", userSchema);
