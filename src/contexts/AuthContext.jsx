import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    setAuthToken
} from "../services/apiClient";


const AuthContext =
    createContext(null);


export function AuthProvider({
    children
}) {

    const [currentUser, setCurrentUser] =
        useState(null);

    const [accessToken, setAccessToken] =
        useState(null);


    useEffect(() => {

        const storedUser =
            sessionStorage.getItem(
                "solarGuardUser"
            );

        const storedToken =
            sessionStorage.getItem(
                "solarGuardAccessToken"
            );


        if (
            storedUser &&
            storedToken
        ) {

            try {

                const user =
                    JSON.parse(
                        storedUser
                    );


                setCurrentUser(user);

                setAccessToken(
                    storedToken
                );

                setAuthToken(
                    storedToken
                );

            } catch (error) {

                console.error(
                    "Failed to restore authentication:",
                    error
                );

                sessionStorage.removeItem(
                    "solarGuardUser"
                );

                sessionStorage.removeItem(
                    "solarGuardAccessToken"
                );

            }

        }

    }, []);


    const login = (
        authData
    ) => {

        const user =
            authData.user;

        const token =
            authData.accessToken;


        setCurrentUser(user);

        setAccessToken(token);

        setAuthToken(token);


        sessionStorage.setItem(
            "solarGuardUser",
            JSON.stringify(user)
        );

        sessionStorage.setItem(
            "solarGuardAccessToken",
            token
        );

    };


    const logout = () => {

        setCurrentUser(null);

        setAccessToken(null);

        setAuthToken(null);


        sessionStorage.removeItem(
            "solarGuardUser"
        );

        sessionStorage.removeItem(
            "solarGuardAccessToken"
        );

    };


    const isAuthenticated =
        Boolean(
            currentUser &&
            accessToken
        );


    return (

        <AuthContext.Provider
            value={{
                currentUser,
                accessToken,
                isAuthenticated,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    return useContext(
        AuthContext
    );

}