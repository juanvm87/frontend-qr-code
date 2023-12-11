import axios from "axios";
import jwtDecode from "jwt-decode"; // Import jwt-decode

const instance = axios.create({
  //TODO change domain
  //  baseURL: `http://qrskan.com:8085`,
  baseURL: "http://localhost:8080",
  timeout: 5000,
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

export default instance;
