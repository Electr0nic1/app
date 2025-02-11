import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import RegistrationForm from '../components/RegistrationForm';
import Header from '../components/Header';

const Registration = () => {
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      const responseData = await api.register(data);
      navigate('/login');
    } catch (err) {
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
