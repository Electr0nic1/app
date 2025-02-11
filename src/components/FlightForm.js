import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../url';

const FlightForm = ({ flight, onChange, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    onChange({ ...flight, [name]: value });
  };

  const handleSubmitLocal = async () => {
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
            <div className="mt-6 border-t border-gray-100 w-full">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">Номер рейса</label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      onChange={handleChange}
                      type='text'
                      name='flight_number'
                      value={flight.flight_number || ''}
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${
                        errors?.flight_number
                          ? 'border-red-500 ring-red-500 focus:ring-red-500'
                          : 'ring-gray-300 focus:ring-sky-600'
                      }`}
                    />
                    {errors?.flight_number && (
                      <p className="text-red-500 text-xs italic">
                        {ErrorMessage(errors.flight_number)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">
                    Место прибытия
                  </label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      onChange={handleChange}
                      type='text'
                      name='destination'
                      value={flight.destination || ''}
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${
                        errors?.destination
                          ? 'border-red-500 ring-red-500 focus:ring-red-500'
                          : 'ring-gray-300 focus:ring-sky-600'
                      }`}
                    />
                    {errors?.destination && (
                      <p className="text-red-500 text-xs italic">
                        {ErrorMessage(errors.destination)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">
                    Дата запуска
                  </label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      onChange={handleChange}
                      type='date'
                      name='launch_date'
                      value={flight.launch_date || ''}
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${
                        errors?.launch_date
                          ? 'border-red-500 ring-red-500 focus:ring-red-500'
                          : 'ring-gray-300 focus:ring-sky-600'
                      }`}
                    />
                    {errors?.launch_date && (
                      <p className="text-red-500 text-xs italic">
                        {ErrorMessage(errors.launch_date)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <label className="text-sm font-medium leading-6 text-gray-900">
                    Количество мест
                  </label>
                  <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      onChange={handleChange}
                      type='number'
                      name='seats_available'
                      value={flight.seats_available || ''}
                      className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${
                        errors?.seats_available
                          ? 'border-red-500 ring-red-500 focus:ring-red-500'
                          : 'ring-gray-300 focus:ring-sky-600'
                      }`}
                    />
                    {errors?.seats_available && (
                      <p className="text-red-500 text-xs italic">
                        {ErrorMessage(errors.seats_available)}
                      </p>
                    )}
                  </div>
                </div>
              </dl>
            </div>
          </div>
          <div className="my-10">
            <button
              type="submit"
              onClick={handleSubmitLocal}
              className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Сохранить
            </button>
          </div>
        </div>
        <Link
          className="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600"
          to="/flights"
        >
          К списку рейсов
        </Link>
      </div>
    </>
  );
};

export default FlightForm;
