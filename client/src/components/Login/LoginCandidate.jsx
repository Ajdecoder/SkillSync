import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { PORT_CLIENT } from "../../commonClient";
import { GoogleAuth } from "../Oauth/Oauth";
import bgImage from '/images/logingPage/bg.png'
import { loginCandidate } from "../../services/api";
import NotificationToasts from "../chatbot/Toast/Toast";


export const LoginCandidate = () => {
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

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
      const res = await loginCandidate(user)
      console.log("Logging in", res.data);

      loginWithJWT(res.data);

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("jwttoken", token);

        setToastMessage("Login successful");
        setToastType("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setToastMessage("User not registered")
          setToastType("error");
          
        } else {
          setToastMessage(`${error.response.data.message}`)
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Login Form */}
      <div className="w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Candidate Login
        </h1>
        <form onSubmit={loginUser}>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <span
                className="absolute right-4 top-2.5 text-blue-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPass ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
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
              onClick={() => navigate("/signup/candidate")}
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

      {/* Right Side - Image */}
      <div className="hidden md:block w-full md:w-1/2 bg-cover bg-center" 
           style={{
             backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/011/432/528/small/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg')`
           }}>
      </div>
    </div>
  );
};
