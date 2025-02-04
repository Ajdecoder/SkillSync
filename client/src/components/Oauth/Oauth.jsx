import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../tailwind.css";
import axios from "axios";

export const GoogleAuth = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout: auth0Logout } = useAuth0();

  const handleOauthLogin = async (response) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, {
        token: response.tokenId,
      });

      const { token, user } = res.data;

      localStorage.setItem("jwttoken", token); // Store JWT

      window.location.reload();
    } catch (error) {
      console.error("OAuth Login Failed:", error);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated && user) {
      
      localStorage.setItem("Auth0User", JSON.stringify(user));
    } else {
      
      localStorage.removeItem("Auth0User");
    }
  }, [isAuthenticated, user]);

  
  const handleLogout = () => {
    auth0Logout({ returnTo: window.location.origin });
    localStorage.removeItem("Auth0User");
  };

 

  return (
    <>
      {isAuthenticated && user ? (
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
        <button
          onClick={() => loginWithRedirect()}
          type="button"
          aria-label="Continue with Google"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" 
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Continue with Google</p>
        </button>
      )}
    </>
  );
};
