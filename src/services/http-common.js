import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
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
