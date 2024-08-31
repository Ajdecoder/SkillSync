import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(false);

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
  }, []);

  const login = (userDetails) => {
    setLoggedInUser(userDetails);
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("jwttoken");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
