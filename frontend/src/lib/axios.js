import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? `${import.meta.env.VITE_BASE_URL}/v1/api` : "/v1/api",
  withCredentials: true,
});
