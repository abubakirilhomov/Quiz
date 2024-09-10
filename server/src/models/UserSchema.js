// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  score: { type: Number, default: 0 },
  testsCompleted: {
    math: { type: Boolean, default: false },
    english: { type: Boolean, default: false },
    history: { type: Boolean, default: false }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;