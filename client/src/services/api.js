import axios from "axios";

// Configure Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT || "http://localhost:6010", // Update with your backend URL
});

// Add Authorization token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("Hfmtoken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});