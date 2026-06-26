import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { registerRecruiter } from "../../services/api";
import RegisterForm from "./RegisterForm";

export const RegRecruiter = () => {
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    role: "recruiter",
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

    if (user.password !== user.reEnterPassword) {
      toast.error("Passwords do not match", {
          autoClose: 1000,
        });
      return;
    }

    try {
      setLoading(true);
      const res = await registerRecruiter(user);

      loginWithJWT(res.data);
      localStorage.setItem("authToken", res.data.token);

      toast.success("Recruiter registered successfully", {
          autoClose: 1000,
        });

      navigate("/");
    } catch (err) {
      console.log('err here', err.response.data.errors[0].message)
      toast.error(err.response.data.errors[0].message || "Registration failed", {
          autoClose: 1000,
        });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#1f1b29] min-h-screen">

      <RegisterForm
        title="Register as Recruiter"
        user={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        showPass={showPass}
        togglePasswordVisibility={togglePasswordVisibility}
        redirectToLogin={() => navigate("/login/recruiter")}
        googleRole="recruiter"
      />

    </div>
  );
};
