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

  async login(email, password) {
    return await fetch(`${url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
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