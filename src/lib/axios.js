import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 'http://172.16.4.16:8001'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
