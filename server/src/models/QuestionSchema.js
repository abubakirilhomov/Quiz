const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  questionText: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  points: { type: Number, required: true } // 3 - математика, 2 - английский, 1 - история
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
