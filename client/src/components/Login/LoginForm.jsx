import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NotificationToasts from "../common/Toast/Toast";
import { GoogleAuth } from "../Oauth/Oauth";

const LoginForm = ({
  title,
  onSubmit,
  googleRole,
  redirectToSignup,
  loading,
}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

  const togglePasswordVisibility = () => setShowPass(!showPass);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(user);

    if (result?.status === "success") {
      setToastType("success");
      setToastMessage(result.message);
    } else {
      setToastType("error");
      setToastMessage(result?.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md p-10 rounded-2xl bg-[#1f1b29] shadow-xl border border-[#2b2638] backdrop-blur-xl my-3">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center text-white mb-8">
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
          className="w-full px-4 py-3 bg-[#2b2638] border border-[#3a334a] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
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
            className="w-full px-4 py-3 bg-[#2b2638] border border-[#3a334a] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
            required
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-5 text-gray-400 text-xl hover:text-white transition"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-medium ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?
          <button
            onClick={redirectToSignup}
            type="button"
            className="text-purple-400 ml-1 hover:underline"
          >
            Sign up now
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 text-gray-500 text-sm">
          <div className="flex-1 h-px bg-gray-700" />
          or
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Google Auth */}
        <GoogleAuth role={googleRole} />
      </form>

      {/* Toast */}
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
  );
};

export default LoginForm;
