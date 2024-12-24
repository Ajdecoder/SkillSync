import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwttokenDecode } from "../utils/decode";

// Create the authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user: auth0User, isAuthenticated, isLoading: isAuth0Loading, logout: auth0Logout } = useAuth0();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle user from JWT token
  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      try {
        const decodedUser = jwttokenDecode(token);
        setLoggedInUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false); // Stop loading once the token check is done
  }, []);

  // Handle Auth0 user
  useEffect(() => {
    if (isAuthenticated && auth0User) {
      // Set Auth0 user in the context if authenticated
      const auth0UserData = {
        name: auth0User.name,
        email: auth0User.email,
        role: auth0User.role, // assuming Auth0 provides this or you can add a custom claim for role
      };

      // Store the Auth0 user in localStorage
      localStorage.setItem("Auth0User", JSON.stringify(auth0UserData));
      localStorage.setItem("Auth0User", auth0User)

      setLoggedInUser(auth0UserData);
    } else if (!isAuthenticated && !isAuth0Loading) {
      // Remove Auth0User from localStorage when not authenticated
      localStorage.removeItem("Auth0User");
      setLoggedInUser(null);
    }
  }, [isAuthenticated, auth0User, isAuth0Loading]);

  const loginWithJWT = (userDetails) => {
    localStorage.setItem("jwttoken", userDetails.token);

    const decodedUser = jwttokenDecode(userDetails.token);
    setLoggedInUser(decodedUser); // Set loggedInUser after decoding the token
  };

  const loginWithAuth0 = () => {
    // You can trigger Auth0 login here
    window.location.href = "/login"; // This can be a redirection to your Auth0 login page or handled via Auth0's SDK
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("Auth0User"); // Remove Auth0User from localStorage when logging out

    if (isAuthenticated) {
      auth0Logout({ returnTo: window.location.origin });
    }
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, loginWithJWT, loginWithAuth0, logout, loading: isAuth0Loading || loading }}>
      {!loading ? children : <div>Loading...</div>} {/* Show loading while the user data is being fetched */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
