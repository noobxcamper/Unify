import axios, { InternalAxiosRequestConfig } from "axios";

export const ACCESS_TOKEN = "access"
export const REFRESH_TOKEN = "refresh"
export const AUTHORIZED = "authorized"

const api = axios.create({
    baseURL: "http://localhost:36594/api"
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => { return Promise.reject(error); });

export default api;