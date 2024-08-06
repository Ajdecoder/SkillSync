import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Login/Login.css";
import { useAuth } from "../utils/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:9002/api/users/login",
        user,
        {
          withCredentials: true,
        }
      );

      const authResponse = await axios.get(
        "http://localhost:9002/api/users/showToken",
        {
          withCredentials: true,
        }
      );

      // Store the JWT token in localStorage
      localStorage.setItem("jwttoken", authResponse.data.jwttoken);

      // Call the login function from context
      login(res.data.user); // Update the context with user details

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not registered");
        } else {
          toast.error(`Error: ${error.response.data.message}`);
        }
      }
    }
  };

  return (
    <div className="loginContainer m-5">
      <h1 className="log-head">Login</h1>
      <form onSubmit={loginUser}>
        <div className="loginForm">
          <input
            className="loginfd"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            className="loginfd"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="log-signing">
          <Button variant="primary" type="submit" className="login-btn">
            Login
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/signup")}
            className="sign-btn"
          >
            No Account? Signup Now
          </Button>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
