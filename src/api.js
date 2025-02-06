import {url} from "./url";

const api = {
  async register(data) {
    try {
      const response = await fetch(`${url}/registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let responseData; // Получаем тело ответа

      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        throw new Error(`Unexpected response from server: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        // Если HTTP статус код не в диапазоне 200-299, выбрасываем ошибку
        const error = new Error(responseData.error?.message || `Registration failed with status ${response.status}`);
        error.error = {
          code: responseData.error?.code,
          message: responseData.error?.message,
          errors: responseData.error?.errors,
        };
        throw error;
      }

      // Возвращаем тело ответа
      return responseData;

    } catch (error) {
      // Перехватываем ошибки сети или ошибки, выброшенные выше
      console.error("Registration error:", error);
      throw error; // Перебрасываем ошибку для обработки в компоненте
    }
  },

  async login(data) {
    try {
      const response = await fetch(`${url}/authorization`, { // Используйте правильный endpoint для авторизации
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let responseData;

      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        throw new Error(`Unexpected response from server: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        let errorMessage;
        let errorCode;
        let errors = null;

        if (response.status === 401) {
          // Для 401 используем message напрямую из responseData
          errorMessage = responseData.message || `Authorization failed with status ${response.status}`;
          errorCode = responseData.code;
        } else {
          // Для других ошибок используем структуру responseData.error
          errorMessage = responseData.error?.message || `Authorization failed with status ${response.status}`;
          errorCode = responseData.error?.code;
          errors = responseData.error?.errors;
        }

        const error = new Error(errorMessage);
        error.error = {
          code: errorCode,
          message: errorMessage,
          errors: errors,
        };

        console.log(error)
        throw error;
      }

      return responseData;

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async getGagarin() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        const error = new Error('Токен не найден. Пользователь не авторизован.');
        error.error = {
          code: 401,
          message: 'Токен не предоставлен'
        }
        throw error;
      }

      const response = await fetch(`${url}/gagarin-flight`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
         },
      });

      let responseData;

      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        throw new Error(`Unexpected response from server: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        let errorMessage;
        let errorCode;
        let errors = null;

        if (response.status === 401) {
          // Для 401 используем message напрямую из responseData
          errorMessage = responseData.message || `Authorization failed with status ${response.status}`;
          errorCode = responseData.code;
        } else {
          // Для других ошибок используем структуру responseData.error
          errorMessage = responseData.error?.message || `Authorization failed with status ${response.status}`;
          errorCode = responseData.error?.code;
          errors = responseData.error?.errors;
        }

        const error = new Error(errorMessage);
        error.error = {
          code: errorCode,
          message: errorMessage,
          errors: errors,
        };

        console.log(error)
        throw error;
      }

      return responseData;

    } catch (error) {
      console.error("Error fetching Gagarin data:", error);
      throw error;
    }
  },

  async getMissions(token) {
    return await fetch(`${url}/missions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
    async deleteMission(token, missionId) {
        return await fetch(`${url}/missions/${missionId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
    }
};

export default api;