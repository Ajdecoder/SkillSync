import React, { useState } from "react";

const OTPInput = ({ nextStep, prevStep }) => {
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleOtpChange = (e, index) => {
    const newOtpInput = [...otpInput];
    newOtpInput[index] = e.target.value;
    setOtpInput(newOtpInput);
    if (error) setError(""); // Clear error on input change
  };

  const handleOtpSubmit = () => {
    if (otpInput.join("").length === 6) {
      nextStep(); // Proceed to the password change step
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="otp-input-container m-5">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Enter the OTP Sent to Your Email
      </h2>
      <div className="flex justify-center space-x-2 mb-4">
        {otpInput.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            maxLength={1}
            className="w-12 h-12 text-xl text-center border-2 border-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}
      </div>
      <div className="otp-buttons flex justify-between mt-4">
        <button
          onClick={handleOtpSubmit}
          className="m-auto otp-next-button px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400"
          disabled={otpInput.join("").length !== 6}
        >
          Verify OTP
        </button>
      </div>
      {error && <p className="otp-error text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default OTPInput;
