import axios from "axios";
const BASE = import.meta.env.VITE_API_URL;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: new URL("/api", BASE).toString(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";
    const isAuth = /\/auth\/(login|register|verify)$/i.test(url);
    if (status === 401 && !isAuth) {
      localStorage.removeItem("token");
      // optionally route to /login (client-side)
    }
    return Promise.reject(error); // keep rejections for RTK to handle
  }
);

export default api;
