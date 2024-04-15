const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;