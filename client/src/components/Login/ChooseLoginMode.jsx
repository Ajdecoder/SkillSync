import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const ChooseLoginMode = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h2 className="text-2xl font-bold mb-6 text-white">Choose Your Login Mode</h2>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login/recruiter")}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          I am Recruiter
        </button>
        <button
          onClick={() => navigate("/login/candidate")}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
          I am Candidate
        </button>
      </div>

      <div className="p-3 flex gap-3" >
       <h2 className="text-white" > Not A Member Yet?{" "}</h2>
        <Link className="hover:underline text-sky-600" to="/signup">
          Join Now
        </Link>
      </div>
    </div>
  );
};
