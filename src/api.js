import { url } from './url';

const handleResponse = async (response) => {
  try {

    if (response.status === 204) {
      return null;
    } 

    let responseData;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      throw new Error(`Unexpected response from server: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorCode = null;
      let errors = null;

      if (response.status === 401 && responseData?.message && responseData?.code) {
        errorMessage = responseData.message;
        errorCode = responseData.code;
      } else if (responseData?.error) {
        errorMessage = responseData.error.message || errorMessage;
        errorCode = responseData.error.code || null;
        errors = responseData.error.errors || null;
      }

      const error = new Error(errorMessage);
      error.error = {
        code: errorCode,
        message: errorMessage,
        errors: errors,
      };
      throw error;
    }
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const makeRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    const error = new Error('Токен не найден. Пользователь не авторизован.');
    error.error = {
      code: 401,
      message: 'Токен не предоставлен',
    };
    throw error;
  }
  return token;
};

const api = {
  async register(data) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await makeRequest(`${url}/registration`, options);
  },

  async login(data) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await makeRequest(`${url}/authorization`, options);
  },

  async getGagarin() {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await makeRequest(`${url}/gagarin-flight`, options);
  },

  async getMissions() {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await makeRequest(`${url}/lunar-missions`, options);
  },

  async addMission(mission) {
    const token = getToken();
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mission),
    };
    return await makeRequest(`${url}/lunar-missions`, options);
  },

  async getMission(id) {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await makeRequest(`${url}/lunar-missions/${id}`, options);
  },

  async updateMission(mission) {
    const token = getToken();
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(mission),
    };
    return await makeRequest(`${url}/lunar-missions/${mission.mission.id}`, options);
  },

  async deleteMission(id) {
    const token = getToken();
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await makeRequest(`${url}/lunar-missions/${id}`, options);
  },

  async getSpaceFlights() {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await makeRequest(`${url}/space-flights`, options);
  },

  async addFlight(flight) {
    const token = getToken();
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flight),
    };
    return await makeRequest(`${url}/space-flights`, options);
  },

  async addMoonOrder(data) {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        const error = new Error('Токен не найден. Пользователь не авторизован.');
        error.error = {
          code: 401,
          message: 'Токен не предоставлен',
        };
        throw error;
      }

      const response = await fetch(`${url}/lunar-watermark`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorMessage = `Request failed with status ${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        error.error = {
          code: response.status,
          message: errorMessage,
        };
        console.log(error);
        throw error;
      }

      const imageBlob = await response.blob();
      return imageBlob;
    } catch (error) {
      console.error('Error fetching MoonOrder data:', error);
      throw error;
    }
  },

  async search(query) {
    const token = getToken();
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await makeRequest(`${url}/search?query=${query}`, options);
    return response.data
  },
};

export default api;
