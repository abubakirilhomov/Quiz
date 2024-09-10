import React from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const ResultsPage = ({ score }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Confetti />
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Тест завершен!</h1>
        <p className="text-xl text-gray-700">Вы получили {score} баллов.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
