import axios from "axios";
import store from "./services/store"; // Ensure correct import

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.accessToken; // Get token from Redux
    console.log("Access Token in Interceptor:", token); // Debugging

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization);
    } else {
      console.warn("No access token found!");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
