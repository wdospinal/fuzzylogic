// Load required packages
const mongoose = require('mongoose');

// Define teacher schema
const CellphoneSchema = new mongoose.Schema({
  name: { type: String, required: false, unique: true, index: true },
  scream: { type: String, required: true },
  camera: { type: String, required: true, index: true },
  processor: { type: String, required: true },
  price: { type: String, required: true },
  src: { type: String, required: true },
  url: { type: String, required: true },
  red: String,
  so: String,
  capacity: String,
  memoryInter: String,
  ram: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Cellphone', CellphoneSchema);
