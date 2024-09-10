// routes/TestRoutes.js
const express = require('express');
const router = express.Router();
const Question = require('../models/QuestionSchema');
const User = require('../models/UserSchema');

// Получение вопросов по теме
router.get('/test', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// Отправка ответов и обновление баллов пользователя
router.post('/submit/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { score } = req.body;
  
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Invalid score provided' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.score += score;
      await user.save();
      res.json({ message: 'Score updated', score: user.score });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating score' });
    }
  });

// Лидерборд
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10); // Топ 10 пользователей
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
});

module.exports = router;
