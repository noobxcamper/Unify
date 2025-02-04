import axios from "axios";

const backendAPI = axios.create({
    baseURL: "http://localhost:36594/api",
});

const graphAPI = axios.create({
    baseURL: "https://graph.microsoft.com/v1.0",
});

export {
    backendAPI,
    graphAPI,
}