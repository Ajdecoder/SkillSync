import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const encoded_uInfo = localStorage.getItem("encoded_uInfo");
    const token = localStorage.getItem("jwttoken");

    if (token) {
      try {
        const userInfo = jwttokenDecode(token);
        if (userInfo) {
          setLoggedInUser(userInfo);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false);
  }, []);

  // Update the user state whenever login or logout occurs
  const login = (userDetails) => {
    setLoggedInUser(userDetails);
    localStorage.setItem("jwttoken", userDetails.token); // Assuming userDetails contains token
    localStorage.setItem("encoded_uInfo", JSON.stringify(userDetails));
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("encoded_uInfo");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
