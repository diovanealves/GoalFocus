import axios from "axios";

import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../stores/useAuthStore";
import { extractTokensFromResponse } from "../utils/extractTokensFromResponse";
import { storage } from "./storage";

const api = axios.create({
  baseURL: "http://10.0.2.2:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const access_token = storage.getString("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getString("refresh_token");

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const decodedToken = jwtDecode(refreshToken);
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          useAuthStore.getState().clearTokens();
          throw new Error("Refresh token expired");
        }

        const response = await api.post(
          "/auth/refresh",
          {},
          {
            headers: {
              refresh_token: refreshToken,
              "Content-Type": "application/json",
            },
          },
        );

        const { access_token, refresh_token } = extractTokensFromResponse(
          response.headers["set-cookie"],
        );

        if (access_token && refresh_token) {
          useAuthStore.getState().setTokens(access_token, refresh_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().clearTokens();
        throw error;
      }
    }
  },
);

export default api;
