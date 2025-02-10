import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import FlightForm from '../components/FlightForm';

const FlightAdd = () => {
  const navigate = useNavigate();
  const [flight, setFlight] = useState({
    flight_number: '',
    destination: '',
    launch_date: '',
    seats_available: '',
  });

  const handleChange = (newFlight) => {
    setFlight(newFlight);
  };

  const handleSubmit = async () => {
    try {
      console.log('Data being sent:', flight);
      await api.addFlight(flight);
      navigate('/flights');
    } catch (error) {
      console.error('Error updating flight:', error);

      return error;
    }
  };

  return (
    <>
      <Header />
      <FlightForm flight={flight} onChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
};

export default FlightAdd;
