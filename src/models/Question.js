const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;