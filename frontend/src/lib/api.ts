import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("tastelanka.token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
