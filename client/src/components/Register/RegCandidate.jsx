import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { PORT_CLIENT } from "../../commonClient";
import { useAuth } from "../context/AuthContext";
import { GoogleAuth } from "../Oauth/Oauth";

export const RegCandidate = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    role: "candidate",
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isreEnterPasswordVisible, setIsreEnterPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const toggleisreEnterPasswordVisible = () => {
    setIsreEnterPasswordVisible(!isreEnterPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevcandidate) => ({
      ...prevcandidate,
      [name]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    if (!candidate.name || !candidate.email || !candidate.password || !candidate.reEnterPassword) {
      toast.error("Please fill in all fields.", {
        autoClose: 1000,
      });
      return;
    }

    if (candidate.password !== candidate.reEnterPassword) {
      toast.error("Passwords do not match.", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${PORT_CLIENT}api/users/register/candidate`,
        candidate,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("jwttoken", response.data.token);
      login(response.data.candidate);

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
    <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Register As Candidate
        </h1>
        <form onSubmit={register} className="space-y-4">
          <div>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={candidate.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={candidate.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={candidate.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-4 top-3 text-blue-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </span>
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={isreEnterPasswordVisible ? "text" : "password"}
              placeholder="Re-enter your password"
              name="reEnterPassword"
              value={candidate.reEnterPassword}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-4 top-3 text-blue-500 cursor-pointer"
              onClick={toggleisreEnterPasswordVisible}
            >
              {isreEnterPasswordVisible ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
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
  );
};
