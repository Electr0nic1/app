import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import MissionItem from '../components/MissionItem';
import { Link } from 'react-router-dom';

const Missions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMissions();
        setMissions(data);
      } catch (error) {
        console.log('Error fetching Missions data in component:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <Link className="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4" to='/add-mission'>
          Добавить миссию
        </Link>
        {missions.map((mission) => (
          <MissionItem key={mission.mission.id} mission={mission} />
        ))}
      </div>{' '}
    </>
  );
};

export default Missions;
