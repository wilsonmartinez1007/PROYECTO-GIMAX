// src/services/api.js
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Este interceptor añade automáticamente la cabecera Authorization
api.interceptors.request.use((config) => {
  // Ajusta según cómo guardes tu token: localStorage, sessionStorage, contexto...
  const token = localStorage.getItem('token'); // o 'access_token'
  if (token) {
    // Si tu backend espera Token <token>:
    config.headers.Authorization = `Token ${token}`;
    // Si espera Bearer <token>:
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
