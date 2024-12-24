import React, { useState } from "react";
import { usePassRecovery } from "../../context/PassRecoveryContext";
import "../settings/settingCss/VerifyEmail.css";

const VerifyEmail = ({ nextStep, step }) => {
  console.log("Step in VerifyEmail (Received):", step); // Ensure step is received correctly

  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const { setEmail } = usePassRecovery();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    if (error) setError(""); // Clear error when user types
  };

  const handleEmailSubmit = () => {
    console.log("Current Step in handleEmailSubmit:", step); // Check step before calling nextStep

    if (typeof nextStep === "function") {
      nextStep();
    }
  };

  return (
    <div className="verify-email-container">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Enter Your Email to Receive an OTP
      </h2>
      <input
        type="email"
        value={emailInput}
        onChange={handleEmailChange}
        placeholder="Email"
        className="verify-email-input"
        aria-label="Email address"
        required
      />
      <button
        onClick={handleEmailSubmit}
        className="verify-email-button transition duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400"
        disabled={!emailInput.trim()}
      >
        Send OTP
      </button>
      {error && <p className="verify-email-error">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
