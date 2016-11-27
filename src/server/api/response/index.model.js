// Load required packages
const mongoose = require('mongoose');

// Define teacher schema
const ResponseSchema = new mongoose.Schema({
  ask: { type: String, required: false },
  answerOptions: [String],
  explicitOptions: [String],
  type: { type: String, required: true },
  src: { type: String, required: true },
});

// Export the Mongoose model
module.exports = mongoose.model('Response', ResponseSchema);
