import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_SERVER_PORT || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
