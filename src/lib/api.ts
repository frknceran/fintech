import axios from "axios";
import { authStorage } from "@/lib/authStorage";

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://case.nodelabs.dev/api/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const stored = authStorage.get();
  if (stored?.accessToken) {
    config.headers.Authorization = `Bearer ${stored.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      authStorage.clear();
      onUnauthorized?.();
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default api;
