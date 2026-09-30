import React, {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = (authData) => {
        setCurrentUser(authData.user);
        setAccessToken(authData.accessToken);
    };

    const logout = () => {
        setCurrentUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                accessToken,
                isAuthenticated: Boolean(accessToken),
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
}