import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import MissionForm from '../components/MissionForm';

const MissionEdit = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMission(id);
        setMission(data);
      } catch (error) {
        console.log('Error fetching Missions data in component:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (newMission) => {
    setMission(newMission);
  };

  const handleSubmit = async () => {
    // Убрали event.preventDefault() и event
    try {
      await api.updateMission(mission); // Обновляем миссию на сервере
      navigate('/missions'); // Перенаправляем на страницу Missions после успешного сохранения
    } catch (error) {
      console.error('Error updating mission:', error);
      return error;
    }
  };

  return (
    <>
      <Header />
      <MissionForm mission={mission} onChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
};

export default MissionEdit;
