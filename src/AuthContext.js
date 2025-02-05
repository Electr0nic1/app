import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Состояние пользователя (null если не авторизован)
  const [loading, setLoading] = useState(true); // Флаг загрузки

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            console.error(`Authentication failed: ${response.status} ${response.statusText}`);
            // Попытка распарсить JSON, даже если статус не 200
            try {
              const errorData = await response.json();
              console.error('Error data:', errorData);
              // Обработать ошибку, например, вывести сообщение пользователю
              localStorage.removeItem('token');
              setUser(null);
            } catch (jsonError) {
              console.error('Error parsing error response:', jsonError);
              // Обработать ошибку парсинга JSON
              localStorage.removeItem('token');
              setUser(null);
            }
            return;
          }

          const responseData = await response.json();
          // Доступ к данным пользователя теперь через responseData.data.user
          setUser(responseData.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Сохраните токен в localStorage
    localStorage.setItem('token', userData.token); // Или другой способ сохранения данных
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Удалите токен из localStorage
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;