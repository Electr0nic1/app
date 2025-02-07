import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MissionItem = ({ mission, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete(mission.id);
  };

  const handleEdit = () => {
    navigate(`/edit-mission/${mission.mission.id}`);
  };

  return (
    <div className="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
      <div className="flex justify-between w-full items-center p-6">
        <h2 className="text-base font-semibold leading-7 text-sky-600 text-xl">
          Название миссии: {mission?.mission?.name}
        </h2>
        <div className="flex gap-4">
          <button onClick={handleToggle}>
            {isOpen ? (
              <i className="fa fa-angle-down text-xl" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-angle-left text-xl" aria-hidden="true"></i>
            )}
          </button>
          <button onClick={handleEdit}>
            <i className="fa fa-edit text-xl" aria-hidden="true"></i>
          </button>
          <button onClick={handleDelete}>
            <i className="fa fa-trash text-xl text-red-500" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-6">
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Дата запуска: {mission?.mission?.launch_details?.launch_date}
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Дата посадки: {mission?.mission?.landing_details?.landing_date}
          </p>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Место запуска</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {mission?.mission?.launch_details?.launch_site?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Широта</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {mission?.mission?.launch_details?.launch_site?.location?.latitude}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {mission?.mission?.launch_details?.launch_site?.location?.longitude}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Место посадки</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {mission?.mission?.landing_details?.landing_site?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Широта</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {mission?.mission?.landing_details?.landing_site?.coordinates?.latitude}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Долгота</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {mission?.mission?.landing_details?.landing_site?.coordinates?.longitude}
                </dd>
              </div>
            </dl>
          </div>
          <h2 className="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
          <div className="px-4 sm:px-0">
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Лунный модуль: {mission?.mission?.spacecraft?.lunar_module}{' '}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Управляющий модуль: {mission?.mission?.spacecraft?.command_module}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <ul>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {mission?.mission?.spacecraft?.crew?.[0]?.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {mission?.mission?.spacecraft?.crew?.[0]?.role}
                  </p>
                </div>
              </li>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {mission?.mission?.spacecraft?.crew?.[1]?.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {mission?.mission?.spacecraft?.crew?.[1]?.role}
                  </p>
                </div>
              </li>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {mission?.mission?.spacecraft?.crew?.[2]?.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {mission?.mission?.spacecraft?.crew?.[2]?.role}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionItem;
