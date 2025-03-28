import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode";
import { LoginLoading } from "../Login/LoginLoading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle googleUser from JWT token

  //   console.log("Google User from localStorage:", googleUser);

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    const googleUserToken = localStorage.getItem("googleUser");

    if (token) {
      try {
        setLoggedInUser(jwttokenDecode(token));
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        localStorage.removeItem("jwttoken");
      }
    }

    if (googleUserToken) {
      try {
        setGoogleUser(jwttokenDecode(googleUserToken));
      } catch (error) {
        console.error("Error decoding Google token:", error);
        localStorage.removeItem("googleUser");
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
    localStorage.setItem("googleUser", googleUser.token);
    setGoogleUser(jwttokenDecode(googleUser));
    console.log(googleUser);
  };

  // Logout function
  const logout = () => {
    setLoggedInUser(null);
    setGoogleUser(null);
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("googleUser");
  };

  return (
    <AuthContext.Provider
      value={{
        googleUser,
        loggedInUser,
        loginWithJWT,
        loginWithGoogle,
        logout,
        loading,
      }}
    >
      {!loading ? children : <LoginLoading />}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
