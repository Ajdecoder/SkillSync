import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem("jwttoken");
    if (token) {
      try {
        const decodedUser = jwttokenDecode(token);
        console.log("Decoded user in useEffect:", decodedUser);
        setLoggedInUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (userDetails) => {
    // console.log("JWT details from auth context:", userDetails);
    
    localStorage.setItem("jwttoken", userDetails.token);

    
    const decodedUser = jwttokenDecode(userDetails.token);
    console.log("Decoded user after login:", decodedUser);

    setLoggedInUser(decodedUser);
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("jwttoken");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
