import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import SpaceFlightItem from '../components/SpaceFlightItem';
import { Link } from 'react-router-dom';

const SpaceFlights = () => {
  const [spaceFlights, setSpaceFlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getSpaceFlights();
        setSpaceFlights(response?.data || []);
      } catch (error) {
        console.error('Error fetching SpaceFlights data in component:', error);
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="p-6 mb-10 sm:px-0 bg-white shadow-xl rounded">
          <Link
            className="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4"
            to="/add-flight"
          >
            {' '}
            Добавить рейс
          </Link>
          <div className="flex flex-wrap gap-2 justify-between p-4 ">
            {spaceFlights &&
              Array.isArray(spaceFlights) &&
              spaceFlights.map((spaceFlight, index) => (
                <div className="w-[49%]" key={index}>
                  <SpaceFlightItem spaceFlight={spaceFlight} />
                </div>
              ))}
          </div>
        </div>
        <Link
          className="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600"
          to="/gagarin"
        >
          На главную страницу
        </Link>
      </div>
    </>
  );
};

export default SpaceFlights;
