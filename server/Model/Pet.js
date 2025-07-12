const mongoose = require('mongoose');

// Define the Pet schema
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  justification: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true // Example: Dog, Cat, Rabbit
  },
  filename: {
    type: String, // Path to uploaded image
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Adopted'],
    default: 'Pending'
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

// Create the Pet model
const Pet = mongoose.model('Pet', petSchema);

// Export the model
module.exports = Pet;