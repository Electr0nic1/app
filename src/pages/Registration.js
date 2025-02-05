import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../api';
import Header from '../components/Header';

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegistration = async (data) => {
    setError(null);

    try {
      const responseData = await api.register(data);

      console.log("Registration successful:", responseData);
      navigate('/login'); 

    } catch (err) {
      // Обрабатываем ошибки, которые произошли в api.register
      console.error("Registration error:", err);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Собираем данные из формы
    const formData = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      patronymic: event.target.patronymic.value,
      email: event.target.email.value,
      password: event.target.password.value,
      birth_date: event.target.birth_date.value,
    };

    // Вызываем функцию для отправки данных на сервер
    await handleRegistration(formData);
  };

  return (
    <>
        <Header />
        <AuthForm onSubmit={handleSubmit} type="Registration" error={error} />
    </>
  );
};

export default Registration;