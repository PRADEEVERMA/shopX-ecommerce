import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isPublicProductRead =
    config.method?.toLowerCase() === "get" && config.url?.startsWith("/products");

  if (token && !isPublicProductRead) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
