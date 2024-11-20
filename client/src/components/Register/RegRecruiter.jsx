import {React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { PORT_CLIENT } from "../../commonClient";
import { useAuth } from "../context/AuthContext";
import { GoogleAuth } from "../Oauth/Oauth";


export const RegRecruiter = () => {


    const navigate = useNavigate();
    const { login } = useAuth();
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      cpassword: "",
      role: "recruiter"
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const register = async (e) => {
      e.preventDefault();
      if (!user.name || !user.email || !user.password || !user.cpassword) {
        toast.error("Please fill in all fields.", {
          autoClose: 1000,
        });
        return;
      }
  
      if (user.password !== user.cpassword) {
        toast.error("Passwords do not match.", {
          autoClose: 1000,
        });
        return;
      }
  
      try {
        const response = await axios.post(
          `${PORT_CLIENT}/api/users/register`,
          user,
          {
            withCredentials: true,
          }
        );
        console.log(response)
  
        localStorage.setItem("jwttoken", response.data.token);
        login(response.data.user);
        toast.success(response.data.message, {
          autoClose: 1000,
        });
  
        navigate("/");
      } catch (error) {
        if (error.response) {
          toast.error(`${error.response.data.message}`, {
            autoClose: 1000,
          });
        } else if (error.request) {
          toast.error("Network Error: Please check your internet connection.", {
            autoClose: 1000,
          });
        } else {
          toast.error("Error registering. Please try again later.", {
            autoClose: 1000,
          });
        }
      }
    };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-14">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Register
            </h1>
            <form onSubmit={register}>
              <div className="space-y-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="Re-enter your password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-4 text-center text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  Login Now
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
      </div>
    </div>
  );
};
