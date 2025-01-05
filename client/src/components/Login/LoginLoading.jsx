import React from "react";
import "./LoginLoading.css";

export const LoginLoading = () => {
  return (
    <div className="loading-screen w-[100%]">
      <div className="logo-animation">
        {["S", "k", "i", "l", "l", "S", "y", "n", "c"].map((letter, index) => (
          <span key={index} className="logo-letter">
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
