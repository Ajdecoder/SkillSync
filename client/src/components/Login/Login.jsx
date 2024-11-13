import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Login/Login.css";
import { useAuth } from "../utils/AuthContext";
import { PORT_CLIENT } from "../../commonClient";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const res = await axios.post(`${PORT_CLIENT}/api/users/login`, user, {
        withCredentials: true,
      });
  
      login(res.data.user);
  
      setUser({
        email: "",
        password: "",
      });
  
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("jwttoken", token);
  
        
        toast.success(`${res.data.message}`, {
          autoClose: 2000,  
        });
  
        
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      }
  
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Internal Server Error", {
        autoClose: 1000,
      });
  
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not registered", {
            autoClose: 1000,
          });
        } else {
          toast.error(`${error.response.data.message}`, {
            autoClose: 1000,
          });
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div className="line" style={{ width: "100%" }}></div>
          <div className="auto">or</div>
          <button style={{ width: "50%" }}>Continue with Google</button>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
