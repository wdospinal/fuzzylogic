// Load required packages
const mongoose = require('mongoose');

// Define teacher schema
const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  degree: { type: String, required: true },
  deparment: { type: String, required: true },
  cvlacUrl: { type: String, unique: true },
});

// Export the Mongoose model
module.exports = mongoose.model('Teacher', TeacherSchema);