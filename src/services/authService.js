import axios from "axios";

const API_BASE_URL = "http://192.168.100.186:3000/api";

const authApi = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: {
        "Content-Type": "application/json"
    }
});

export const registerUser = async (userData) => {
    const response = await authApi.post(
        "/register",
        userData
    );

    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await authApi.post(
        "/login",
        credentials
    );

    return response.data;
};