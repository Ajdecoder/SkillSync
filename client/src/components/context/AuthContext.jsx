import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode";
import { LoginLoading } from "../Login/LoginLoading";
import { logoutUser } from "../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setLoggedInUser(null);
    setGoogleUser(null);

    localStorage.removeItem("jwttoken");
    localStorage.removeItem("googleUser");

    logoutUser();
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwttoken");
    const googleToken = localStorage.getItem("googleUser");

    const token = jwtToken || googleToken;

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decodedUser = jwttokenDecode(token);

      setLoggedInUser(decodedUser);

      if (googleToken) {
        setGoogleUser(decodedUser);
      }
    } catch (error) {
      console.error("Error decoding token:", error);

      localStorage.removeItem("jwttoken");
      localStorage.removeItem("googleUser");

      setLoggedInUser(null);
      setGoogleUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithJWT = (userDetails) => {
    const token = userDetails.token;

    localStorage.setItem("jwttoken", token);

    const decodedUser = jwttokenDecode(token);
    setLoggedInUser(decodedUser);
  };

  const loginWithGoogle = (googleUser) => {
    const token = googleUser.token;

    localStorage.setItem("googleUser", token);

    const decodedUser = jwttokenDecode(token);

    setGoogleUser(decodedUser);
    setLoggedInUser(decodedUser); // important
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

export const useAuth = () => useContext(AuthContext);