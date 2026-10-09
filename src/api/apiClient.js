import axios from "axios";
import authApi from "./authApi";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


let authToken = null;
let isRefreshing = false;
let refreshSubscribers = [];

// Used To Set Authentication Token (authToken)  || Accestoken
export const setAuthToken = (token) => { authToken = token || null; };

// Adds A List of callback functions to an array awaiting an acces token
const subscribeToTokenRefresh = (callback) => { refreshSubscribers.push(callback);};

// Goes Through The Callback Functions (refreshSubscribers) When A New Acces Token Is Created
const notifyTokenRefresh = (newToken) => {
    refreshSubscribers.forEach(
        callback => callback(newToken)
    );

    // Cleare The Previous Queue

    refreshSubscribers = [];
};

// Logs The User Or Frontend Out 
const clearAuthentication = () => {
    authToken = null;
    sessionStorage.removeItem("solarGuardUser");
    sessionStorage.removeItem("solarGuardAccessToken");
    sessionStorage.removeItem("solarGuardRefreshToken");

};


// Use The Available Refresh Token To Create A New Acces Token
const refreshAccessToken = async () => {

    const refreshToken = sessionStorage.getItem("solarGuardRefreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token is missing.");
    };

    // Sends An Api Request To Get A New Access Token
    const response = await authApi.post("/refresh", {refreshToken});

    const newAccessToken = response.data.accessToken;

    if (!newAccessToken) {
        throw new Error("New access token was not returned.");
    };

    sessionStorage.setItem("solarGuardAccessToken",newAccessToken);

    setAuthToken(newAccessToken);

    return newAccessToken;
};

// A request interceptor runs before an API request is sent. Intercepts to set the authorization bearer
apiClient.interceptors.request.use(config => {

        if (authToken) {
            config.headers.Authorization =`Bearer ${authToken}`;
        };

        return config;

},(error) => {
        // "This request failed. Let the caller handle the error."
        return Promise.reject(error);
    }
);


// A response interceptor runs when the backend responds.
apiClient.interceptors.response.use((response )=> {

    return response;

}, async (error) => {

        const originalRequest = error.config;

        // console.log(error);
        // console.log(originalRequest);
        // console.log(originalRequest?._retry);
        // console.log("error.response:",error.response);
        // console.log("Url",originalRequest.url);


        // If Its a 401 Erro the code continues running
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        };

        // If we have set the originalRequest._retry and its true we stp running the code
        if (originalRequest?._retry) {
            return Promise.reject(error);
        };

        // If the url sent contains a refresh token we stop the code and log out the user
        if (originalRequest?.url?.includes("auth/refresh")) {
            // Log Out The Current User
            clearAuthentication();
            return Promise.reject(error);
        };

        // Create an Retry key and assign value true in the original request object
        originalRequest._retry = true;

        // Initially false later set to true after the first request fails
        if (isRefreshing) {

            return new Promise((resolve,reject) => {

                // Create a callback function and pass it via the subscribe refresh token function to be added in the queue

                function callback (newToken){

                     if (!newToken) {
                        reject(error);
                        return;
                    };

                    // Modify The header.authorization to get the correct token
                     originalRequest.headers.Authorization = `Bearer ${newToken}`;

                     // "Axios, take this modified original request and send it again."
                     resolve(apiClient(originalRequest));

                };
                 

                subscribeToTokenRefresh(callback);


        });
        };

        // Set Refreshing To True for the preceeding requests to wait in a queue
        isRefreshing = true;

        try {

            // Try Getting A New Token
            const newToken = await refreshAccessToken();

            // Call The Waiting Functions queue
            notifyTokenRefresh(newToken);

            // Modify The header.authorization to get the correct token
            originalRequest.headers.Authorization =  `Bearer ${newToken}`;

            // "Axios, take this modified original request and send it again."
            return apiClient(originalRequest );

        } catch (refreshError) {

            clearAuthentication();

            refreshSubscribers = [];

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }
    }
);

export default apiClient;