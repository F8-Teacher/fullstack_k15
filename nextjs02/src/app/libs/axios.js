import axios from "axios";
import { CONFIG } from "../constants/config.constant";
import { getAccessToken, makeRefreshToken } from "../actions/auth.action";

import { redirect } from "next/navigation";
export const axiosInstance = axios.create({
  baseURL: CONFIG.BASE_API,
});
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
let requestTokenPromise = null;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.status === 401) {
      if (!requestTokenPromise) {
        requestTokenPromise = makeRefreshToken();
      }
      const isRefresh = await requestTokenPromise;
      requestTokenPromise = null;
      if (isRefresh) {
        return axiosInstance(error.config);
      } else {
        if (
          window.location.pathname !== "/auth/login" &&
          error.config.url !== "/profile/me"
        ) {
          window.location.href = "/auth/login";
        }

        return;
      }
    }
    return Promise.reject(error);
  },
);
