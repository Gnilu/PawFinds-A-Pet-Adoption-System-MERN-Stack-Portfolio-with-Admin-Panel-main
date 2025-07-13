const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    date: {
      type: String, // keep as String for simplicity
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
