import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
export const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-1/2 ">
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <div className="flex gap-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/signup/recruiter")}
          >
            I am a Recruiter
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => navigate("/signup/candidate")}
          >
            I am a Candidate
          </button>
        </div>
        <div className="p-3 flex gap-3">
          <h2 className="text-white" >Already A Member?</h2>
          <Link className="hover:underline text-sky-600" to="/login">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
