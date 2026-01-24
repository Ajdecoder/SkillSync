import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleAuth } from "../Oauth/Oauth";

const RegisterForm = ({
  title,
  user,
  handleChange,
  handleSubmit,
  loading,
  showPass,
  togglePasswordVisibility,
  redirectToLogin,
  googleRole,
}) => {
  return (
    <div className="w-full max-w-md p-10 rounded-2xl bg-[#1f1b29] shadow-xl border border-[#2b2638] backdrop-blur-xl my-3">
      <h1 className="text-3xl font-semibold text-center text-white mb-8">
        {title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-4 py-3 bg-[#2b2638] border border-[#3a334a] rounded-lg text-white"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-3 bg-[#2b2638] border border-[#3a334a] rounded-lg text-white"
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 bg-[#2b2638] border border-[#3a334a] rounded-lg text-white"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-5 text-gray-400"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Re-enter Password */}
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
          className="w-full px-4 py-3 bg-[#2b2638] border border-[#3a334a] rounded-lg text-white"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {/* Login redirect */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?
          <button
            type="button"
            onClick={redirectToLogin}
            className="text-purple-400 ml-1 hover:underline"
          >
            Login
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <div className="flex-1 h-px bg-gray-700" />
          or
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Google Auth */}
        <GoogleAuth role={googleRole} />
      </form>
    </div>
  );
};

export default RegisterForm;
