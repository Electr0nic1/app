import React from 'react';

const SpaceFlightItem = ({ spaceFlight }) => {
  return (
    <div className="shadow-md rounded w-full p-4">
      <h2 className="font-bold">{spaceFlight?.flight_number}</h2>
      <p>{spaceFlight?.destination}</p>
      <p>{spaceFlight?.launch_date}</p>
      <p>{spaceFlight?.seats_available}</p>
      <button className="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mt-2">
        Записаться
      </button>
    </div>
  );
};

export default SpaceFlightItem;
