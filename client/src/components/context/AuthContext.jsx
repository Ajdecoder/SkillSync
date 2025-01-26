import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwttokenDecode } from "../utils/decode";
import { LoginLoading } from "../Login/LoginLoading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user: auth0User, isAuthenticated, isLoading: isAuth0Loading, logout: auth0Logout } = useAuth0();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Handle user from JWT token
    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        if (token) {
            try {
                const decodedUser = jwttokenDecode(token);
                setLoggedInUser(decodedUser);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
        setLoading(false); // Stop loading once the token check is done
    }, []);

    // Handle Auth0 user
    useEffect(() => {
        if (isAuthenticated && auth0User) {
            const auth0UserData = {
                name: auth0User.name,
                email: auth0User.email,
                role: auth0User?.role || "user", // Default role if not provided
            };

            localStorage.setItem("Auth0User", JSON.stringify(auth0UserData));
            setLoggedInUser(auth0UserData);
        } else if (!isAuthenticated && !isAuth0Loading) {
            localStorage.removeItem("Auth0User");
            setLoggedInUser(null);
        }
    }, [isAuthenticated, auth0User, isAuth0Loading]);

    const loginWithJWT = (userDetails) => {
        localStorage.setItem("jwttoken", userDetails.token);
        const decodedUser = jwttokenDecode(userDetails.token);
        setLoggedInUser(decodedUser); 
    };

    const loginWithAuth0 = () => {
        window.location.href = "/login"; 
    };

    const logout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("jwttoken");
        localStorage.removeItem("Auth0User");
        
        if (isAuthenticated) {
            auth0Logout({ returnTo: window.location.origin });
        }
    };

    return (
        <AuthContext.Provider value={{ loggedInUser, loginWithJWT, loginWithAuth0, logout, loading: isAuth0Loading || loading }}>
            {!loading ? children : <LoginLoading/>}
        </AuthContext.Provider>
    );
};

// Custom hook to access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};
