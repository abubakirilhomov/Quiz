import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(`http://localhost:5000/${category}`); // Убедитесь, что URL правильный
      if (!response.ok) {
        throw new Error('Сервер вернул ошибку.');
      }

      const result = await response.json();
      setData(result.questions); // Предполагается, что результат содержит вопросы
      calculateScore(result.category); // Расчет баллов в зависимости от категории
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const calculateScore = (category) => {
    let points = 0;
    if (category === 'mathematics') points = 3;
    if (category === 'english') points = 2;
    if (category === 'world-history') points = 1;
    setScore(points);
    setTestCompleted(true); // Завершение теста
    navigate('/results'); // Перенаправление на страницу результатов
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/app"
          element={
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">Выберите категорию</h1>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleCategoryClick('mathematics')}
                  className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Математика
                </button>
                <button
                  onClick={() => handleCategoryClick('english')}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                >
                  Английский
                </button>
                <button
                  onClick={() => handleCategoryClick('world-history')}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Всемирная история
                </button>
              </div>
              {data && (
                <div className="mt-6 p-4 border rounded-md border-gray-300">
                  <h2 className="text-xl font-bold text-gray-800">Вопросы:</h2>
                  <ul className="list-disc pl-5">
                    {data.map((question, index) => (
                      <li key={index} className="text-gray-700">{question}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        />
        <Route path="/results" element={<ResultsPage score={score} />} />
      </Routes>
    </div>
  );
}

export default App;
