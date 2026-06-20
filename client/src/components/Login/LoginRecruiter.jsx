import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRecruiter } from "../../services/api";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

export const LoginRecruiter = () => {
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRecruiterLogin = async (user) => {
    try {
      setLoading(true);
      const res = await loginRecruiter(user);
      loginWithJWT(res.data);
      localStorage.setItem("authToken", res.data.token);

      setTimeout(() => navigate("/"), 1500);

      return { status: "success", message: "Login successful" };
    } catch (err) {
      return {
        status: "error",
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f1b29]">
      <LoginForm
        title="Recruiter Login"
        googleRole="recruiter"
        loading={loading}
        redirectToSignup={() => navigate("/signup/recruiter")}
        onSubmit={handleRecruiterLogin}
      />
    </div>
  );
};
