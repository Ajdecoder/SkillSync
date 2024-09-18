import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    setLoading(false)
  }, []);

  const login = (userDetails) => {
    setLoggedInUser(userDetails);
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("jwttoken");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout ,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
