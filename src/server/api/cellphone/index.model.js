// Load required packages
const mongoose = require('mongoose');

// Define teacher schema
const CellphoneSchema = new mongoose.Schema({
  name: { type: String, required: false, unique: true, index: true },
  capacity: { type: String, required: true },
  scream: { type: String, required: true },
  camera: { type: String, required: true, index: true },
  processor: { type: String, required: true },
  so: { type: String, required: true },
  red: { type: String, required: true },
});

// Export the Mongoose model
module.exports = mongoose.model('Cellphone', CellphoneSchema);
