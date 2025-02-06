import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import api from '../api';
import Header from '../components/Header';

const Registration = () => {
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      const responseData = await api.register(data);
      console.log('Registration successful:', responseData);
      navigate('/login');
    } catch (err) {
      // Обрабатываем ошибки, которые произошли в api.register
      return err;
    }
  };

  return (
    <>
      <Header />
      <RegistrationForm onRegister={handleRegistration} />
    </>
  );
};

export default Registration;
