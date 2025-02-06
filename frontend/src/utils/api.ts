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

const powerAutomateApi = (data: any) => axios.post(
    "https://prod-11.canadacentral.logic.azure.com:443/workflows/48766b54ca45421199515c548aa83d49/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pUcR_fQWCgKYv74eCGH2UsLpdSPdug9e1SrvrQmy9aA",
    data
)

export {
    backendAPI,
    graphAPI,
    powerAutomateApi
}