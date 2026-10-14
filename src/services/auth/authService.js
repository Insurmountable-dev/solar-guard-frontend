import authApi from "../../api/authApi"

export const registerUser = async (userData) => {

    const response = await authApi.post("/register", userData);
    
    return response.data;
};

export const loginUser = async (credentials) => {

    const response = await authApi.post("/login",credentials);

    return response.data;
};