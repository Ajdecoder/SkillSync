import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTie, FaUserGraduate, FaArrowRight } from "react-icons/fa";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Join Our Community
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Select your role to get started
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/signup/recruiter")}
              className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <FaUserTie className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    I'm a Recruiter
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hiring talent for my organization
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </button>

            <button
              onClick={() => navigate("/signup/candidate")}
              className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <FaUserGraduate className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    I'm a Candidate
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Looking for career opportunities
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;