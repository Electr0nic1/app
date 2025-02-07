import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import MissionItem from '../components/MissionItem';
import { Link } from 'react-router-dom';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMissions();
        setMissions(data);
      } catch (error) {
        console.log('Error fetching Missions data in component:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMission = async (id) => {
    try {
      await api.deleteMission(id);
      setMissions(missions.filter((mission) => mission.mission.id !== id));
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

  return (
    <>
      <Header />{' '}
      <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        {loading ? (
          <h2>Загрузка...</h2>
        ) : (
          <>
            <Link
              className="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4"
              to="/add-mission"
            >
              {' '}
              Добавить миссию
            </Link>
            
            {missions &&
              Array.isArray(missions) &&
              missions.map((mission) => (
                <MissionItem
                  key={mission.mission.id}
                  mission={mission}
                  handleDeleteMission={handleDeleteMission}
                />
              ))}
            
          </>
        )}
      </div>
    </>
  );
};

export default Missions;
