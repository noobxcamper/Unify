import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:36594/api"
});

export const msApi = axios.create({
    baseURL: "https://graph.microsoft.com/v1/"
});

function msiApiGet(uri: string, token: any) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`https://graph.microsoft.com/v1.0/${uri}`, config).then((response) => {
        console.log(response);
        return response;
    });
}

export {
    msiApiGet
}