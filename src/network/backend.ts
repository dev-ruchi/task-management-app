import axios, { AxiosInstance } from "axios";

const backend: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default backend;