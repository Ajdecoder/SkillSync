import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaUser } from "react-icons/fa";

export const ChooseLoginMode = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Select how you want to continue
            </p>
          </div>

          {/* Buttons */}
          <div className="px-6 sm:px-8 pb-8 space-y-4">
            {/* Recruiter */}
            <button
              onClick={() => navigate("/login/recruiter")}
              className="group w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FaBriefcase size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  I'm a Recruiter
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Post jobs & find talent
                </p>
              </div>
            </button>

            {/* Candidate */}
            <button
              onClick={() => navigate("/login/candidate")}
              className="group w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FaUser size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  I'm a Candidate
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Explore opportunities
                </p>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline underline-offset-2 transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Optional small note */}
        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Secure login • Choose your role to get started
        </p>
      </div>
    </div>
  );
};
