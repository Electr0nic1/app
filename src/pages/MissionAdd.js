import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import MissionForm from '../components/MissionForm';

const MissionAdd = () => {
  const navigate = useNavigate();
  const [mission, setMission] = useState({
    mission: {
      name: '',
      launch_details: {
        launch_date: '',
        launch_site: {
          name: '',
          location: {
            latitude: '',
            longitude: '',
          },
        },
      },
      landing_details: {
        landing_date: '',
        landing_site: {
          name: '',
          coordinates: {
            latitude: '',
            longitude: '',
          },
        },
      },
      spacecraft: {
        command_module: '',
        lunar_module: '',
        crew: [],
      },
    },
  });

  const handleChange = (newMission) => {
    setMission(newMission);
  };

  const handleSubmit = async () => {
    // Убрали event.preventDefault() и event
    try {
      await api.addMission(mission); // Обновляем миссию на сервере
      navigate('/missions'); // Перенаправляем на страницу Missions после успешного сохранения
    } catch (error) {
      console.error('Error updating mission:', error);
    }
  };

  return (
    <>
      <Header />
      <MissionForm mission={mission} onChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
};

export default MissionAdd;
