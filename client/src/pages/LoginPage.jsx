import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', { // Убедитесь, что URL правильный
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname }),
      });

      if (!response.ok) {
        throw new Error('Сервер вернул ошибку.');
      }

      const result = await response.json();

      if (result.id) {
        navigate('/app');
      } else {
        setModalMessage('Пользователь с таким именем и фамилией не найден.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setModalMessage('Произошла ошибка. Попробуйте позже.');
      setShowModal(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Вход в систему</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              placeholder="Имя"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              placeholder="Фамилия"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Войти
          </button>
        </form>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-gray-800">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
