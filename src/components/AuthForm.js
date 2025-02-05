import React, { useState } from 'react';
import {useAuth} from "../context";
import {ErrorMessage} from "../url";
import { useNavigate } from 'react-router-dom';
import api from '../api';


const AuthForm = ({onSubmit}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [backendValidationErrors, setBackendValidationErrors] = useState({}); // Состояние для ошибок с бэкенда
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronymic: '',
    email: '',
    password: '',
    birth_date: '',
  });

  const handleRegistration = async (data) => {
    setError(null);
    setBackendValidationErrors({})

    try {
      const responseData = await api.register(data);

      console.log("Registration successful:", responseData);
      navigate('/login'); 

    } catch (err) {
      // Обрабатываем ошибки, которые произошли в api.register
      console.error("Registration error:", err);

      if (err?.error?.errors) {
        setBackendValidationErrors(err.error.errors);
        console.log(backendValidationErrors)
      }

      // Проверяем, есть ли в ошибке данные о валидации (предполагаем, что бэкенд возвращает их в формате responseData.errors)
      if (err?.error?.message) {
        setError(err.error.message);
        console.log(error)
      } else {
        console.log(error)
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Собираем данные из формы
    const formData = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      patronymic: event.target.patronymic.value,
      email: event.target.email.value,
      password: event.target.password.value,
      birth_date: event.target.birth_date.value,
    };

    // Вызываем функцию для отправки данных на сервер
    await handleRegistration(formData);
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
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
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
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
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
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
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
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
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
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
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