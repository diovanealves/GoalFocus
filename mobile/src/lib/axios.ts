import axios from "axios";

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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = storage.getString("refresh_token");
      if (refreshToken) {
        try {
          const response = await api.post("/auth/refresh", {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
          const { access_token, refresh_token } = extractTokensFromResponse(
            response.headers["set-cookie"],
          );

          if (access_token && refresh_token) {
            storage.set("access_token", access_token);
            storage.set("refresh_token", refresh_token);

            api.defaults.headers.common["Authorization"] =
              `Bearer ${access_token}`;
          }

          return api(originalRequest);
        } catch (error) {
          useAuthStore.getState().clearTokens();
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
