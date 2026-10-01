import axios from "axios";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const backendUrl = (configuredApiUrl || "http://localhost:8080").replace(/\/+$/, "");

export const API_BASE_URL = /\/api\/v1$/i.test(backendUrl)
  ? backendUrl
  : `${backendUrl}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("tastelanka.token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function apiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError(error)) return fallback;
  const data = error.response?.data;
  if (data && typeof data === "object" && "detail" in data && typeof data.detail === "string") {
    return data.detail;
  }
  return fallback;
}
