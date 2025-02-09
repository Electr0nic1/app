import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from "../url";

const MissionForm = ({ mission, onChange, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors(prevErrors => ({ ...prevErrors, [`mission.${name}`]: null }))

    const fieldParts = name.split('?.');

    onChange((prevMission) => {
      const newMission = { ...prevMission };
      let current = newMission.mission;

      for (let i = 0; i < fieldParts.length - 1; i++) {
        const part = fieldParts[i];
        if (part.includes('[')) {
          const arrayPart = part.substring(0, part.indexOf('['));
          const index = parseInt(part.substring(part.indexOf('[') + 1, part.indexOf(']')));

          if (!current[arrayPart]) {
            current[arrayPart] = [];
          }

          if (!current[arrayPart][index]) {
            current[arrayPart][index] = {};
          }

          current = current[arrayPart][index];
        } else {
          current = current[part];
        }
      }

      current[fieldParts[fieldParts.length - 1]] = value;

      return newMission;
    });
  };

  const handleClick = async () => {
    const validationErrors = await handleSubmit();
    if (validationErrors && validationErrors?.error?.errors) {
      setErrors(validationErrors.error.errors);
    }
  };

  return (
    <>
      <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
          <div className="flex justify-between w-full items-center p-6">
            <label className="text-base font-semibold leading-7 text-sky-600 text-xl">
              Название миссии
            </label>
            <input
              className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.name'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
              type="text"
              name="name"
              value={mission.mission.name || ''}
              onChange={handleChange}
            />
            {errors?.['mission.name'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.name'])}
                </p>
              )}
          </div>
          <div className="px-6">
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата запуска</p>
            <input
              className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.launch_details.launch_date'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
              type="date"
              name="launch_details?.launch_date"
              value={mission?.mission?.launch_details?.launch_date || ''}
              onChange={handleChange}
            />
            {errors?.['mission.launch_details.launch_date'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.launch_details.launch_date'])}
                </p>
              )}
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Дата посадки</p>
            <input
              className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.landing_details.landing_date'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
              type="date"
              name="landing_details?.landing_date"
              value={mission?.mission?.landing_details?.landing_date || ''}
              onChange={handleChange}
            />
            {errors?.['mission.landing_details.landing_date'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.landing_details.landing_date'])}
                </p>
              )}
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">
                    Место запуска
                  </label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.launch_details.launch_site.name'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="text"
                      name="launch_details?.launch_site?.name"
                      value={mission?.mission?.launch_details?.launch_site?.name || ''}
                      onChange={handleChange}
                    />
                    {errors?.['mission.launch_details.launch_site.name'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.launch_details.launch_site.name'])}
                </p>
              )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">Широта</label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.launch_details.launch_site.location.latitude'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="number"
                      name="launch_details?.launch_site?.location?.latitude"
                      value={
                        mission?.mission?.launch_details?.launch_site?.location?.latitude || ''
                      }
                      onChange={handleChange}
                    />
                    {errors?.['mission.launch_details.launch_site.location.latitude'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.launch_details.launch_site.location.latitude'])}
                </p>
              )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">Долгота</label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.launch_details.launch_site.location.longitude'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="number"
                      name="launch_details?.launch_site?.location?.longitude"
                      value={
                        mission?.mission?.launch_details?.launch_site?.location?.longitude || ''
                      }
                      onChange={handleChange}
                    />
                    {errors?.['mission.launch_details.launch_site.location.longitude'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.launch_details.launch_site.location.longitude'])}
                </p>
              )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">
                    Место посадки
                  </label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.landing_details.landing_site.name'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="text"
                      name="landing_details?.landing_site?.name"
                      value={mission?.mission?.landing_details?.landing_site?.name || ''}
                      onChange={handleChange}
                    />
                    {errors?.['mission.landing_details.landing_site.name'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.landing_details.landing_site.name'])}
                </p>
              )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">Широта</label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading- 6 ${errors?.['mission.landing_details.landing_site.coordinates.latitude'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="number"
                      name="landing_details?.landing_site?.coordinates?.latitude"
                      value={
                        mission?.mission?.landing_details?.landing_site?.coordinates?.latitude || ''
                      }
                      onChange={handleChange}
                    />
                    {errors?.['mission.landing_details.landing_site.coordinates.latitude'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.landing_details.landing_site.coordinates.latitude'])}
                </p>
              )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">Долгота</label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.landing_details.landing_site.coordinates.longitude'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="number"
                      name="landing_details?.landing_site?.coordinates?.longitude"
                      value={
                        mission?.mission?.landing_details?.landing_site?.coordinates?.longitude ||
                        ''
                      }
                      onChange={handleChange}
                    />
                    {errors?.['mission.landing_details.landing_site.coordinates.longitude'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.landing_details.landing_site.coordinates.longitude'])}
                </p>
              )}
                  </div>
                </div>
              </dl>
            </div>
            <h2 className="my-6 text-xl text-sky-600">Информация о космическом корабле</h2>
            <div className="px-4 sm:px-0">
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Лунный модуль: </p>
              <input
                className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.spacecraft.lunar_module'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                type="text"
                name="spacecraft?.lunar_module"
                value={mission?.mission?.spacecraft?.lunar_module || ''}
                onChange={handleChange}
              />
              {errors?.['mission.spacecraft.lunar_module'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.spacecraft.lunar_module'])}
                </p>
              )}
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Управляющий модуль:</p>
              <input
                className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.spacecraft.command_module'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                type="text"
                name="spacecraft?.command_module"
                value={mission?.mission?.spacecraft?.command_module || ''}
                onChange={handleChange}
              />
              {errors?.['mission.spacecraft.command_module'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.spacecraft.command_module'])}
                </p>
              )}
            </div>
            <div className="px-4 py-6 flex justify-between items-center">
              <ul>
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4 items-center">
                    <p className="text-sm font-semibold text-gray-900">ФИО</p>
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.spacecraft.crew[0].name'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="text"
                      name="spacecraft?.crew[0]?.name"
                      value={mission?.mission?.spacecraft?.crew?.[0]?.name || ''}
                      onChange={handleChange}
                    />
                    {errors?.['mission.spacecraft.crew[0].name'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.spacecraft.crew[0].name'])}
                </p>
              )}
                    <p className="mt-1 text-xs text-gray-500">Должность</p>
                    <input
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${errors?.['mission.spacecraft.crew[0].role'] ? "border-red-500 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus:ring-sky-600"}`}
                      type="text"
                      name="spacecraft?.crew[0]?.role"
                      value={mission?.mission?.spacecraft?.crew?.[0]?.role || ''}
                      onChange={handleChange}
                    />
                    {errors?.['mission.spacecraft.crew[0].role'] && (
                <p className="text-red-500 text-xs italic">
                  {ErrorMessage(errors['mission.spacecraft.crew[0].role'])}
                </p>
              )}
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <i className="text-sky-600 text-2xl fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="my-10">
          <button
            type="submit"
            onClick={handleClick}
            className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Сохранить
          </button>
        </div>
      </div>
      <Link
        className="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600"
        to="/missions"
      >
        К списку миссий
      </Link>
    </>
  );
};

export default MissionForm;
