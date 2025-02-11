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
      await api.addFlight(flight);
      navigate('/flights');
    } catch (error) {
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
