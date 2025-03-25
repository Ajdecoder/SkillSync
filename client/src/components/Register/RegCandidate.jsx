import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { PORT_CLIENT } from "../../commonClient";
import { useAuth } from "../context/AuthContext";
import { GoogleAuth } from "../Oauth/Oauth";
import { registerCandidate } from "../../services/api";
import NotificationToasts  from "../common/Toast/Toast";

export const RegCandidate = () => {
  const navigate = useNavigate();

  const { loginWithJWT } = useAuth();

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
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

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
    if (
      !candidate.name ||
      !candidate.email ||
      !candidate.password ||
      !candidate.reEnterPassword
    ) {
      setToastMessage("Please fill in all fields.");
      setToastType("info");
      return;
    }

    if (candidate.password !== candidate.reEnterPassword) {
      setToastMessage("Passwords do not match.");
      setToastType("error");
      return;
    }

    try {
      const response = await registerCandidate(candidate);

      loginWithJWT(response.data);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("jwttoken", token);

        toastMessage("Candidate successfully Register");
        setToastType("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

      console.log("printing token from regcandi", response.data); // Log the response here
      localStorage.setItem("jwttoken", response.data.token);
      toastMessage(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error[0].message;
          setToastMessage(errorMessage);
          setToastType("error");
        } else {
          setToastMessage(
            `${error.response.data.message || "Something went wrong"}`
          );
          setToastType("error");
        }
      } else {
        toastMessage("Network error. Please try again later.");
        setToastType("error");
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
              onClick={() => navigate("/login/candidate")}
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
                    <GoogleAuth role={'candidate'} />
        
          </div>
        </form>
        {toastMessage && (
          <NotificationToasts 
            message={toastMessage}
            type={toastType}
            autoClose={1500}
            position="top-right"
            theme="dark"
          />
        )}
      </div>
    </div>
  );
};
