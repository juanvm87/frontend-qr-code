import axios from "axios";
import jwtDecode from "jwt-decode"; // Import jwt-decode

const instance = axios.create({
  //baseURL: "http://localhost:8080",
  baseURL: "http://10.5.48.104:8080",
  timeout: 3000,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentDate = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentDate) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Example of error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Request failed with status code:", error.response.status);
      console.error("Error response data:", error.response.data);
    } else {
      console.error("Request failed:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
