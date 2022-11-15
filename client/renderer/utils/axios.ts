import axios from "axios";
import { AxiosError } from "axios";

axios.interceptors.request.use(
  async function (config) {
    const HOST = localStorage.getItem("domain");
    const PORT = "8080";
    const BASE_URL = `${HOST}:${PORT}`;
    config.baseURL = BASE_URL;
    if (config.headers !== undefined) {
      if (!config.headers.Authorization) {
        return config;
      }
    }

    const accessExpiredAt = localStorage.getItem("accessExpiredAt");
    if (accessExpiredAt === null) {
      return config;
    }
    const now = new Date();
    const needReissueDate = new Date(accessExpiredAt);
    const isAccessExpired = needReissueDate.getTime() - now.getTime() < 300000;
    if (isAccessExpired === true) {
      try {
        const response = await axios.post(BASE_URL + "/api/users/reissue", {
          accessToken: localStorage.getItem("accessToken")?.substring(7),
          refreshToken: localStorage.getItem("refreshToken"),
        });
        localStorage.setItem(
          "accessToken",
          `Bearer ` + response.data.data.accessToken
        );
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem(
          "accessExpiredAt",
          response.data.data.accessTokenExpiration
        );
        localStorage.setItem(
          "refreshExpiredAt",
          response.data.data.refreshTokenExpiration
        );
      } catch (e: unknown) {
        if (isAxiosError<{ code: number }>(e)) {
          if (e.response?.data.code === 40102 || 40103) {
            localStorage.clear();
            window.location.replace("/");
          }
        }
      }
      return config;
    }
    return config;
  },
  function (error) {
    if (error.response?.status === 401) {
      const domain = localStorage.getItem("domain");
      localStorage.clear();
      if (domain !== null) localStorage.setItem("domain", domain);
      window.location.replace("/login");
    }
  }
);

export default axios;

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}
