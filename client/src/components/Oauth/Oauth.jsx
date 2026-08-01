import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";
import { Navigate, useNavigate } from "react-router-dom";

export const GoogleAuth = ({ role }) => {
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  // console.log("Client ID from ENV:", import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);
  // console.log("Client ID from ENV:", clientId);
  const [user, setUser] = useState(
    JSON.parse(localStorage?.getItem("authToken"))
  );

  let navigate = useNavigate();


  const handleLoginSuccess = async (response) => {

    console.log(response, 'it give res')
    try {
      const res = await axios.post(
        `${PORT_CLIENT}/auth/google`,
        {
          token: response.credential, // Google ID token
          role: role,
        }, {
        withCredentials: true
      }
      );

      const { token } = res.data;
      console.log(token, 'it give tokenn')
      localStorage.setItem("authToken", JSON.stringify(token));
      setUser(user);

      navigate("/");
      window.location.reload(); // Refresh to update UI
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.reload();
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {
        (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.error("Login Failed")}
            text="continue_with"
          />
        )}
    </GoogleOAuthProvider>
  );
};
