import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Gagarin = () => {
  const [gagarinData, setGagarinData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getGagarin();
        setGagarinData(data);
      } catch (error) {
        console.log('Error fetching Gagarin data in component:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
          <div className="flex justify-between w-full items-center p-6">
            <div className="mt-6 w-full">
              <div className="shadow-lg p-2 rounded">
                <h2 className="font-bold text-2xl">Миссия</h2>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Название</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.mission?.name}</p>
                </div>
                <h3 className="mt-4 font-bold text-xl">Подробности запуска</h3>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Дата запуска</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.mission?.launch_details?.launch_date}
                  </p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Название космодрова</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.mission?.launch_details?.launch_site?.name}
                  </p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Широта</p>
                  <p className="text-sm">
                    {
                      gagarinData?.data?.[0]?.mission?.launch_details?.launch_site?.location
                        ?.latitude
                    }
                  </p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Долгота</p>
                  <p className="text-sm">
                    {
                      gagarinData?.data?.[0]?.mission?.launch_details?.launch_site?.location
                        ?.longitude
                    }
                  </p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Продолжителность полета</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.mission?.flight_duration?.hours} час{' '}
                    {gagarinData?.data?.[0]?.mission?.flight_duration?.minutes} минут
                  </p>
                </div>
              </div>
              <div className="mt-4 shadow-lg p-2 rounded">
                <h2 className="mt-2 font-bold text-xl">Космический корабль</h2>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Название</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.mission?.spacecraft?.name}</p>
                </div>

                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Производитель</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.mission?.spacecraft?.manufacturer}
                  </p>
                </div>

                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Вместимость экипажа</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.mission?.spacecraft?.crew_capacity}
                  </p>
                </div>
              </div>

              <div className="mt-4 shadow-lg p-2 rounded">
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Дата</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.landing?.date}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Страна</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.landing?.site?.country}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Название населеного пункта</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.landing?.site?.name}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Широта</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.landing?.site?.coordinates?.latitude}
                  </p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Долгота</p>
                  <p className="text-sm">
                    {gagarinData?.data?.[0]?.landing?.site?.coordinates?.longitude}
                  </p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Раскрытие парашгюта</p>
                  {gagarinData?.data?.[0]?.landing?.details?.parachute_landing === true ? (
                    <p className="text-sm">Да</p>
                  ) : (
                    <p className="text-sm">Нет</p>
                  )}
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Cкорость удара, м/с</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.landing?.details?.mpc}</p>
                </div>
              </div>
              <div className="mt-4 shadow-lg p-2 rounded">
                <h2 className="mt-2 font-bold text-xl">Информация о космонафте</h2>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">ФИО</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.cosmonaut?.name}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Дата рождения</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.cosmonaut?.birthdate}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Звание</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.cosmonaut?.rank}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Биографию</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.cosmonaut?.bio?.early_life}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Информация о карьере</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.cosmonaut?.bio?.career}</p>
                </div>
                <div className="px-4 py-6 grid grid-cols-2 sm:px-0">
                  <p className="font-bold text-gray-900">Информация после полета</p>
                  <p className="text-sm">{gagarinData?.data?.[0]?.cosmonaut?.bio?.post_flight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="items-center flex justify-center bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600"
          to="/missions"
        >
          К списку миссий
        </Link>
      </div>
    </>
  );
};

export default Gagarin;
