import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Login/Login.css";
import { useAuth } from "../context/AuthContext";
import { PORT_CLIENT } from "../../commonClient";
import { GoogleAuth } from "../Oauth/Oauth";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

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
      console.log("loging",res.data)

      login(res.data);

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("jwttoken", token);

        toast.success("Login successful", { autoClose: 1200 });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h1>
        <form onSubmit={loginUser}>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <span
                className="absolute right-4 top-2.5 text-blue-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPass ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center text-gray-500">
            No account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Signup Now
            </button>
          </div>
          <div className="flex items-center mt-6">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center mt-4">
            <GoogleAuth />
          </div>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};
