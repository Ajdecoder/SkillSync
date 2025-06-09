import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleAuth } from "../Oauth/Oauth";
import { loginCandidate } from "../../services/api";
import NotificationToasts from "../common/Toast/Toast";
import { FaEye, FaEyeSlash, FaUserTie, FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const LoginCandidate = () => {
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      const res = await loginCandidate(user);
      loginWithJWT(res.data);

      if (res.status === 200) {
        localStorage.setItem("jwttoken", res.data.token);
        setToastMessage("Login successful");
        setToastType("success");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setToastMessage("User not registered");
        } else {
          setToastMessage(error.response.data.errors[0]?.message || "Login failed");
        }
        setToastType("error");
      } else {
        setToastMessage("Network error. Please try again.");
        setToastType("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 m-4">
      {/* Left Side - Login Form */}
      <div className="w-full max-w-md p-8 m-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50">
        <div className="text-center mb-8">
          <FaUserTie className="mx-auto text-4xl text-blue-600 dark:text-blue-400 mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Candidate Login
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={loginUser} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-4 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              "Logging in..."
            ) : (
              <>
                <FaSignInAlt /> Login
              </>
            )}
          </button>

          <div className="text-center text-gray-600 dark:text-gray-400">
            No account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup/candidate")}
              className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
            >
              Sign up Now
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          <div className="flex justify-center">
            <GoogleAuth 
              role="candidate" 
              className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </GoogleAuth>
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
      <div className="hidden md:block w-full md:w-1/2 bg-cover bg-center rounded-xl"
           style={{
             backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/011/432/528/small/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg')`
           }}>
      </div>
    </div>
  );
};