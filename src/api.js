import {url} from "./url";

const api = {
  async register(data) {
    try {
      const response = await fetch(`${url}/registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json(); // Получаем тело ответа

      if (!response.ok) {
        // Если HTTP статус код не в диапазоне 200-299, выбрасываем ошибку
        throw new Error(responseData.message || `Registration failed with status ${response.status}`);
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