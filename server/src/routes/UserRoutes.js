// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }

  try {
    const newUser = new User({ firstName, lastName });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;