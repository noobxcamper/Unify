import axios from "axios";

const backendAPI = (token: string) => axios.create({
    baseURL: "https://api.hazemspersonalsite.ca/api",
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

const sharepointApi = (token: string) => axios.create({
    baseURL: "https://experiorheadoffice.sharepoint.com",
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

const powerAutomateApi = (data: any) => axios.post(
    "https://prod-11.canadacentral.logic.azure.com:443/workflows/48766b54ca45421199515c548aa83d49/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pUcR_fQWCgKYv74eCGH2UsLpdSPdug9e1SrvrQmy9aA",
    data
);

/**
 * This will query the specified Graph API dataset, and handle any additional datasets received recursively.
 * @param token The Graph API token
 * @param queryUri The Graph API request URI
 * @returns Promise with the retrieved dataset
 */
const queryGraphAPI = async (token: string, queryUri: string): Promise<any[]> => {
    let allData: any[] = [];
    let nextLink: string | null = queryUri;

    try {
        while (nextLink) {
            const response = await graphAPI(token).get(nextLink);

            if (response.data?.value) {
                response.data?.value.forEach((data: any) => {
                    allData.push(data);
                });
            }

            nextLink = response.data['@odata.nextLink'] || null;
        }

        console.log("Received all data!");
        return allData;
    } catch (error) {
        console.error("Error querying Graph API:", error);
        throw error;
    }
};

export {
    backendAPI,
    graphAPI,
    queryGraphAPI,
    sharepointApi,
    powerAutomateApi
}