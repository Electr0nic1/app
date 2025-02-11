import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import AuthContext from '../AuthContext';
import { inputClasses } from '../utils';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [backendValidationErrors, setBackendValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setBackendValidationErrors({});

    try {
      const responseData = await api.login(formData);

      await login(responseData.data);

      navigate('/gagarin');
    } catch (err) {
      if (err?.error?.errors) {
        setBackendValidationErrors(err.error.errors);
      }

      if (err && err?.error?.message) {
        setError(err.error.message);
      } else if (err) {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Войдите в свою учетную запись
        </h2>
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Электронная почта
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses(backendValidationErrors && backendValidationErrors.email)}
                />
                {backendValidationErrors.email && (
                  <p className="text-red-500 text-xs italic">
                    {backendValidationErrors.email}
                  </p>
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
                  className={inputClasses(backendValidationErrors && backendValidationErrors.password)}
                />
                {backendValidationErrors.password && (
                  <p className="text-red-500 text-xs italic">
                    {backendValidationErrors.password}
                  </p>
                )}
              </div>
            </div>

            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Авторизоваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
