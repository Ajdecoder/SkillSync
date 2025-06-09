import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const ChooseLoginMode = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Please select your login mode to continue
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/login/recruiter")}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            I'm a Recruiter
          </button>

          <button
            onClick={() => navigate("/login/candidate")}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            I'm a Candidate
          </button>
        </div>

        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Not a member yet?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition duration-150"
            >
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};