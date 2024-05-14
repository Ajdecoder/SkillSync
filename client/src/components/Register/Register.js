import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const register = async () => {
    // Validate user input
    if (!user.name || !user.email || !user.password || !user.reEnterPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (user.password !== user.reEnterPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9002/register", user);
      toast.success(response.data.message);

      navigate("/login"); // Navigate to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data}`);
      } else if (error.request) {
        toast.error("Network Error: Please check your internet connection.");
      } else {
        toast.error("Error registering. Please try again later.");
      }
    }
  };

  return (
    <div className="registerContainer m-5">
      <h1>Register</h1>
      <form onSubmit={register}>
      <div className="registerForm">
        <input
          className="Reg_input"
          type="text"
          placeholder="Enter your name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          className="Reg_input"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          className="Reg_input"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          className="Reg_input"
          type="password"
          placeholder="Re-enter your password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          onChange={handleChange}
        />
      </div>
      <div className="reg-signup">
        <button className="m-5 w-25 login-btn" onClick={register}>
          Sign Up
        </button>
        <button className="w-25 sign-btn" onClick={() => navigate("/login")}>
          Already have an account? Login Now
        </button>
      </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;