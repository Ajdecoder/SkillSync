import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode";
import { LoginLoading } from "../Login/LoginLoading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [google_user, setGoogleUser] = useState(() => JSON.parse(localStorage.getItem("googleUser")) || null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);
   

    // Handle google_user from JWT token
    useEffect(() => {
        const token = localStorage.getItem("jwttoken");
        if (token) {
            try {
                setLoggedInUser(jwttokenDecode(token));
            } catch (error) {
                console.error("Error decoding JWT token:", error);
            }
        }
        setLoading(false); 
    }, []);

    // Function to handle login with JWT
    const loginWithJWT = (userDetails) => {
        localStorage.setItem("jwttoken", userDetails.token);
        setLoggedInUser(jwttokenDecode(userDetails.token));
    };

    // Function to handle login with Google
    const loginWithGoogle = (googleUser) => {
        localStorage.setItem("googleUser", JSON.stringify(googleUser));
        setGoogleUser(googleUser);
    };

    // Logout function
    const logout = () => {
        setLoggedInUser(null);
        setGoogleUser(null);
        localStorage.removeItem("jwttoken");
        localStorage.removeItem("googleUser");
    };

    return (
        <AuthContext.Provider value={{ google_user, loggedInUser, loginWithJWT, loginWithGoogle, logout, loading }}>
            {!loading ? children : <LoginLoading />}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
