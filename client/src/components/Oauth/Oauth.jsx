import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";

export const GoogleAuth = ({ role }) => {
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  console.log("Client ID from ENV:", import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);
  console.log("Client ID from ENV:", clientId);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("googleUser"))
  );

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        `${PORT_CLIENT}/auth/google`,
        {
          token: response.credential, // Google ID token
          role: role,
        }
      );

      const {  user } = res.data;
      localStorage.setItem("googleUser", JSON.stringify(user));
      setUser(user);

      window.location.reload(); // Refresh to update UI
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("googleUser");
    setUser(null);
    window.location.reload();
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button
            onClick={handleLogout}
            type="button"
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.error("Login Failed")}
        />
      )}
    </GoogleOAuthProvider>
  );
};
