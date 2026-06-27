import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCandidate } from "../../services/api";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

export const LoginCandidate = () => {
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCandidateLogin = async (user) => {
    try {
      setLoading(true);
      const res = await loginCandidate(user);
      loginWithJWT(res.data);
      localStorage.setItem("authToken", res.data.token);

      setTimeout(() => navigate("/"), 1500);

      return { status: "success", message: "Login successful" };
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Login failed";

      return { status: "error", message: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f1b29]">
      <LoginForm
        title="Candidate Login"
        googleRole="candidate"
        loading={loading}
        redirectToSignup={() => navigate("/signup/candidate")}
        onSubmit={handleCandidateLogin}
      />
    </div>
  );
};
