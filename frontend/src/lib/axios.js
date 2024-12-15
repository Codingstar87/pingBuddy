import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://ping-buddy.vercel.app" : "/v1/api",
  withCredentials: true,
});
