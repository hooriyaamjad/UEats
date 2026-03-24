import axios from 'axios';

const baseURL = 'http://localhost:8000/api'

const api = axios.create({
    baseURL: baseURL,
});

// adds the access token to every api request
api.interceptors.request.use((cfg) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original_req = error.config;

    if (error.response?.status === 401 && !original_req._retry) {
      original_req._retry = true;

      // try to get the new access token
      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) return Promise.reject(error);
      try {
        const { data } = await axios.post(
          `${baseURL}/profiles/token/refresh/`,
          { refresh: refresh_token }
        );
        localStorage.setItem("access_token", data.access);
        original_req.headers.Authorization = `Bearer ${data.access}`;
        return api(original_req);
      } catch {
        // if the retry fails then remove both tokens to sign out the user
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }

    return Promise.reject(error);
  }
);

export default api;