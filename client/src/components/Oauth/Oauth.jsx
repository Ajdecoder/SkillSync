import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PORT_CLIENT } from "../../commonClient";
import { useState } from "react";

export const GoogleAuth = ({ role }) => {
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  // console.log("Client ID from ENV:", import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);
  // console.log("Client ID from ENV:", clientId);

  let navigate = useNavigate();


  const handleLoginSuccess = async (response) => {
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

      localStorage.setItem("authToken", JSON.stringify(token));

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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