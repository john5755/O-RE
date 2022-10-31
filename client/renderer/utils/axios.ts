import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_ENV_HOST;
const PORT = process.env.NEXT_PUBLIC_ENV_PORT;
const BASE_URL = `${HOST}:${PORT}`;

const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
});

axiosApiInstance.interceptors.request.use(async (config) => {
  return config;
});

export default axiosApiInstance;
