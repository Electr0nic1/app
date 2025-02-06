import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import MissionItem from '../components/MissionItem';

const Missions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMissions();
        console.log(data);
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
        <button className="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
          Добавить миссию
        </button>
        {missions.map((mission, index) => (
          <MissionItem key={index} mission={mission} />
        ))}
      </div>{' '}
    </>
  );
};

export default Missions;
