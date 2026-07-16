import axios from "axios";

const API = axios.create({
  baseURL: "https://finly-backend-nybo.onrender.com/api",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default API;