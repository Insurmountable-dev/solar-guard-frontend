import { useContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/apiClient";
import { AuthContext } from "./CreateContext";


export function AuthProvider({ children}) {

    const [currentUser,setCurrentUser]   = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading,  setIsLoading]   = useState(true);


    useEffect(() => {

        const restoreAuthentication = () => {

                try {

                    const storedUser = sessionStorage.getItem("solarGuardUser");

                    const storedAccessToken = sessionStorage.getItem("solarGuardAccessToken");

                    const storedRefreshToken = sessionStorage.getItem("solarGuardRefreshToken");


                    if (storedUser && storedAccessToken && storedRefreshToken ) {

                        const user = JSON.parse(storedUser);

                        setCurrentUser(user);
                        setAccessToken(storedAccessToken);
                        setAuthToken(storedAccessToken);

                    } else {

                        setCurrentUser(null);

                        setAccessToken(null);

                        setAuthToken(null);

                    }

                } catch (error) {

                    console.error("Failed to restore authentication:",error);

                    sessionStorage.removeItem("solarGuardUser");

                    sessionStorage.removeItem("solarGuardAccessToken");

                    sessionStorage.removeItem("solarGuardRefreshToken");


                    setCurrentUser(null);

                    setAccessToken(null);

                    setAuthToken(null);

                } finally {

                    setIsLoading(false);

                }

            };

        restoreAuthentication();

    }, []);

    const login = (authData) => {

        if (!authData) {
            throw new Error("No authentication data was returned.");
        };

        const user = authData.user;
        const newAccessToken = authData.accessToken;
        const newRefreshToken = authData.refreshToken;


        if (!user) {
            throw new Error( "Login response does not contain user data.");
        }


        if (!newAccessToken) {
            throw new Error("Login response does not contain an access token.");
        }


        if (!newRefreshToken) {
            throw new Error("Login response does not contain a refresh token.");
        };

        setCurrentUser(user);
        setAccessToken(newAccessToken);
        setAuthToken(newAccessToken);


        sessionStorage.setItem("solarGuardUser",JSON.stringify(user));
        sessionStorage.setItem("solarGuardAccessToken",newAccessToken);
        sessionStorage.setItem("solarGuardRefreshToken",newRefreshToken);

        // console.log(authData);

    };


    const logout = () => {

        setCurrentUser(null);
        setAccessToken(null);
        setAuthToken(null);


        sessionStorage.removeItem("solarGuardUser");
        sessionStorage.removeItem("solarGuardAccessToken");
        sessionStorage.removeItem("solarGuardRefreshToken");

    };

    const isAuthenticated = Boolean(currentUser && accessToken);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                accessToken,
                isAuthenticated,
                isLoading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );

};


export function useAuth() {
    return useContext(AuthContext);
};


