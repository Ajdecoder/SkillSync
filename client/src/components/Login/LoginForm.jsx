import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NotificationToasts from "../common/Toast/Toast";
import { GoogleAuth } from "../Oauth/Oauth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginForm = ({
  title,
  onSubmit,
  googleRole,
  redirectToSignup,
  loading,
}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => setShowPass(!showPass);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(user);

    if (result?.status === "success") {

      toast.success(result.message);
    } else {

      toast.error(result?.message || "Login failed");
    }
  };

  return (
    <div className="bg-[#1f1b29] shadow-xl backdrop-blur-xl my-3 p-10 border border-[#2b2638] rounded-2xl w-full max-w-md">

      {/* Title */}
      <h1 className="mb-8 font-semibold text-white text-3xl text-center">
        {title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#1f1b29]">

        {/* Email */}
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={user.email}
          placeholder="Enter your email"
          className="bg-[#2b2638] px-4 py-3 border border-[#3a334a] rounded-lg outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition placeholder-gray-400"
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={user.password}
            placeholder="Enter your password"
            className="bg-[#2b2638] px-4 py-3 border border-[#3a334a] rounded-lg outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition placeholder-gray-400"
            required
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="top-5 right-4 absolute text-gray-400 hover:text-white text-xl transition"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <Link to={'/forgot-password'} className="flex justify-end hover:underline text-sm text-gray-400" >Forgot Password ?</Link>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-medium ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-gray-400 text-sm text-center">
          Don’t have an account?
          <button
            onClick={redirectToSignup}
            type="button"
            className="ml-1 text-purple-400 hover:underline"
          >
            Sign up now
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 text-gray-500 text-sm">
          <div className="flex-1 bg-gray-700 h-px" />
          or
          <div className="flex-1 bg-gray-700 h-px" />
        </div>

        {/* Google Auth */}
        <GoogleAuth role={googleRole} />
      </form>
    </div>
  );
};

export default LoginForm;
