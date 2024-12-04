import { React, useState } from "react";
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

  const {login} = useAuth()

  const [recruiter, setRecruiter] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    role: "recruiter",
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
    setRecruiter((prevrecruiter) => ({
      ...prevrecruiter,
      [name]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();
    if (
      !recruiter.name ||
      !recruiter.email ||
      !recruiter.password ||
      !recruiter.reEnterPassword
    ) {
      toast.error("Please fill in all fields.", {
        autoClose: 1000,
      });
      return;
    }

    if (recruiter.password !== recruiter.reEnterPassword) {
      toast.error("Passwords do not match.", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${PORT_CLIENT}/api/users/register/recruiter`,
        recruiter,
        {
          withCredentials: true,
        }
      );
      
      login(response.data)

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("jwttoken", token);

        toast.success("Candidate successfully Register", { autoClose: 1200 });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }


      localStorage.setItem("jwttoken", response.data.token);
      
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
        console.log(error)
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
        <div className="p-5 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Register As Recruiter
            </h1>
            <form onSubmit={register}>
              <div className="space-y-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={recruiter.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={recruiter.email}
                  onChange={handleChange}
                  required
                />

                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={recruiter.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute right-4 top-2.5 text-blue-500 cursor-pointer"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type={isreEnterPasswordVisible ? "text" : "password"}
                    placeholder="Re-enter your password"
                    name="reEnterPassword"
                    value={recruiter.reEnterPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute right-4 top-2.5 text-blue-500 cursor-pointer"
                    onClick={toggleisreEnterPasswordVisible}
                  >
                    {isreEnterPasswordVisible ? (
                      <i className="fa-regular fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-l text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
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
