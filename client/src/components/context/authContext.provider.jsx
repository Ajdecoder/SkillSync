import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const tokenInLocalStorage = (serverToken) => {
    return localStorage.setItem(serverToken, "jwttoken");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    console.log("token from frontend", token);
    if (token) {
      // Verify token if necessary (optional)
      setAuthState({
        isAuthenticated: true,
        token: token,
        user: null, // You can set the user info if needed
      });
    }
  }, []);

  const login = (token) => {
    // Set the token in localStorage
    localStorage.setItem("jwttoken", token);
    setAuthState({
      isAuthenticated: true,
      token: token,
      user: null, // Set user info if needed
    });
  };

  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("jwttoken");
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return;
};

export default AuthProvider;
