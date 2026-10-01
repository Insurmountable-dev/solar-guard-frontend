import axios from "axios";

const API_BASE_URL =
    "http://192.168.100.186:3000/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

let authToken = null;

export const setAuthToken = (
    token
) => {
    authToken = token || null;
};

apiClient.interceptors.request.use(
    config => {

        if (authToken) {
            config.headers.Authorization =
                `Bearer ${authToken}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        if (
            error.response?.status === 401
        ) {

            console.error(
                "Authentication error:",
                error.response?.data
            );
        }

        return Promise.reject(error);
    }
);

export default apiClient;