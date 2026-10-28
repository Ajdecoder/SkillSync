import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PORT_CLIENT } from "../../commonClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const GoogleAuth = ({ role }) => {
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  // console.log("Client ID from ENV:", import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);
  // console.log("Client ID from ENV:", clientId);

  let navigate = useNavigate();


  const handleLoginSuccess = async (response) => {
    console.log("Google OAuth success callback triggered");
    try {
      console.log("Sending Google credential to backend");
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
      toast.error(error.response?.data?.message || "Google login failed", {
        autoClose: 1000,
      });
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.error("Login Failed")}
          text="continue_with"
        />
      </div>
    </GoogleOAuthProvider>
  );
};