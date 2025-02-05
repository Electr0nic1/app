import React, { useState } from 'react';
import {ErrorMessage} from "../url";


const AuthForm = ({ onRegister }) => { // onRegister вместо onSubmit
  const [error, setError] = useState(null);
  const [backendValidationErrors, setBackendValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronymic: '',
    email: '',
    password: '',
    birth_date: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setBackendValidationErrors({});

    // Отправляем данные на сервер через функцию, переданную из Registration
    const err = await onRegister(formData);  // onRegister вместо handleRegistration

    if(err && err?.error?.errors) {
        setBackendValidationErrors(err.error.errors);
      }

      // Если есть общее сообщение об ошибке, показываем его
    if (err && err?.error?.message) {
        setError(err.error.message);
      } else if (err) {
        setError('Registration failed. Please try again.');
      }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Создайте свою учетную запись
    </h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Фамилия
        </label>
        <div className="mt-2">
          <input
            id="lastname"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${backendValidationErrors.last_name ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {backendValidationErrors.last_name && (
                <p className="text-red-500 text-xs italic">{ErrorMessage(backendValidationErrors.last_name)}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Имя
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${backendValidationErrors.first_name ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {backendValidationErrors.first_name && (
                <p className="text-red-500 text-xs italic">{ErrorMessage(backendValidationErrors.first_name)}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="patronymic"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Отчество
        </label>
        <div className="mt-2">
          <input
            id="patronymic"
            name="patronymic"
            type="text"
            value={formData.patronymic}
            onChange={handleChange}
            className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${backendValidationErrors.patronymic ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {backendValidationErrors.patronymic && (
                <p className="text-red-500 text-xs italic">{ErrorMessage(backendValidationErrors.patronymic)}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Электронная почта
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${backendValidationErrors.email ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {backendValidationErrors.email && (
                <p className="text-red-500 text-xs italic">{ErrorMessage(backendValidationErrors.email)}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="b_date"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Дата рождения
        </label>
        <div className="mt-2">
          <input
            id="b_date"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${backendValidationErrors.birth_date ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {backendValidationErrors.birth_date && (
                <p className="text-red-500 text-xs italic">{ErrorMessage(backendValidationErrors.birth_date)}</p>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Пароль
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${backendValidationErrors.password ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {backendValidationErrors.password && (
                <p className="text-red-500 text-xs italic">{ErrorMessage(backendValidationErrors.password)}</p>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default AuthForm;