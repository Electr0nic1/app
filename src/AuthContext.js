import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Состояние пользователя (null если не авторизован)
  const [loading, setLoading] = useState(true); // Флаг загрузки

  useEffect(() => {
    // Проверка авторизации при загрузке компонента
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token'); // Или другой способ получения токена
        if (token) {
          // Запрос к бэкенду для проверки токена
          const response = await fetch('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('token'); // Удаляем невалидный токен
            setUser(null);
          }
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