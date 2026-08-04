import React, { createContext, useContext, useState, useEffect } from "react";
import { jwttokenDecode } from "../utils/decode";
import { LoginLoading } from "../Login/LoginLoading";
import { getUserProfileByEmail, logoutUser } from "../../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

useEffect(() => {
    if (!loggedInUser?.email) return;

    getUserProfileByEmail(loggedInUser?.email)
      .then(res => setProfile(res.data.candidateProfile));
}, [loggedInUser?.email]);

  const logout = () => {
    setLoggedInUser(null);
    setGoogleUser(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("authToken");

    logoutUser();
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("authToken");
    const googleToken = localStorage.getItem("authToken");

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

      localStorage.removeItem("authToken");
      localStorage.removeItem("authToken");

      setLoggedInUser(null);
      setGoogleUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithJWT = (userDetails) => {
    const token = userDetails.token;

    localStorage.setItem("authToken", token);

    const decodedUser = jwttokenDecode(token);
    setLoggedInUser(decodedUser);
  };

  const loginWithGoogle = (googleUser) => {
    const token = googleUser.token;

    localStorage.setItem("authToken", token);

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
        profile
      }}
    >
      {!loading ? children : <LoginLoading />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);