import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://chat-app-mern-m8b3.onrender.com/api",
  withCredentials: true,
});