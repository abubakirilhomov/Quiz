// server.js
const express = require('express');
const morgan = require('morgan'); // Логирование запросов
const app = express();
const connectDB = require('./config/database');
const userRoutes = require('./routes/UserRoutes');
const testRoutes = require('./routes/TestRoutes');
require('dotenv').config()
console.log("mongo:",process.env.MONGODB_URI)

connectDB(); // Подключение к MongoDB

app.use(morgan('dev')); // Включаем логировани      е запросов
app.use(express.json()); // Для обработки JSON данных

app.use('/api/users', userRoutes); // Роуты пользователей
app.use('/api/tests', testRoutes); // Роуты тестов

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});