// Load required packages
const mongoose = require('mongoose');

// Define teacher schema
const QuestionSchema = new mongoose.Schema({
  ask: { type: String, required: false, unique: true, index: true },
  answerOptions: [String],
  explicitOptions: [String],
  type: { type: String, required: true, index: true },
  src: { type: String, required: true },
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);
