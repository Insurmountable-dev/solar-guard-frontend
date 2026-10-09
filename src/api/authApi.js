import axios from "axios";

const authApi = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL + "/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export default authApi;