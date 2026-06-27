import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { registerCandidate } from "../../services/api";
import RegisterForm from "./RegisterForm";

export const RegCandidate = () => {
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    role: "candidate",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPass((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.reEnterPassword
    ) {
      toast.info("Please fill in all fields", {
          autoClose: 1000,
        });
      return;
    }

    if (user.password !== user.reEnterPassword) {
      toast.error("Passwords do not match", {
          autoClose: 1000,
        });
      return;
    }

    try {
      setLoading(true);
      const res = await registerCandidate(user);

      loginWithJWT(res.data);
      localStorage.setItem("authToken", res.data.token);

      toast.success("Candidate registered successfully", {
          autoClose: 1000,
        });
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Registration failed";

      toast.error(msg, {
          autoClose: 1000,
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f1b29]">
      <RegisterForm
        title="Register as Candidate"
        user={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        showPass={showPass}
        togglePasswordVisibility={togglePasswordVisibility}
        redirectToLogin={() => navigate("/login/candidate")}
        googleRole="candidate"
      />
    </div>
  );
};
