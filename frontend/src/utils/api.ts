import axios from "axios";

const backendAPI = (token: string) => axios.create({
    baseURL: "http://localhost:36594/api",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const graphAPI = (token: string) => axios.create({
    baseURL: "https://graph.microsoft.com/v1.0",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export {
    backendAPI,
    graphAPI,
}