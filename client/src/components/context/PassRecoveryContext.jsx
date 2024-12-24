import React, { createContext, useState, useContext } from "react";

// Create context
const PassRecoveryContext = createContext();

// Custom hook to use the context
export const usePassRecovery = () => useContext(PassRecoveryContext);

export const PassRecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState(""); // Ensure setEmail is here
  const [otp, setOTP] = useState("");

  return (
    <PassRecoveryContext.Provider value={{ email, setEmail, otp, setOTP, }}>
      {children}
    </PassRecoveryContext.Provider>
  );
};
