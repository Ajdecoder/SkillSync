import React from "react";
import { FaRegUser, FaCog, FaHistory, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDropdown = ({ showAboutUser, currentUser, setConfirmLogout, confirmlogout, handleLogout }) => {
  if (!showAboutUser) return null;

  return (
    <div className="top-full right-0 z-[999] absolute bg-white dark:bg-gray-800 slide-in-from-top-2 shadow-xl mt-2 p-2 border border-gray-100 dark:border-gray-700/70 rounded-xl w-64 origin-top-right transition-all animate-in duration-300 ease-in-out transform fade-in">
      
      {/* 1. USER INFO HEADER SECTION */}
      <div className="flex items-center gap-3 mb-2 p-3 border-gray-100 dark:border-gray-700/50 border-b">
        <div className="flex justify-center items-center bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-sm rounded-full w-10 h-10 text-white">
          <FaRegUser className="text-base" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">
            {currentUser?.name || "Guest User"}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-xs truncate">
            {currentUser?.email || "guest@example.com"}
          </span>
        </div>
      </div>

      {/* 2. CORE NAVIGATION SECTION */}
      <div className="space-y-0.5">
        <span className="block px-3 pt-2 pb-1 font-bold text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Account
        </span>
        
        <Link
          to="/profile/userProfile"
          className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 text-sm transition-colors"
        >
          <FaRegUser className="text-gray-400 dark:text-gray-500" />
          <span>My Profile</span>
        </Link>

        <Link
          to="/profile/settings"
          className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 text-sm transition-colors"
        >
          <FaCog className="text-gray-400 dark:text-gray-500" />
          <span>Settings</span>
        </Link>
      </div>

      {/* 3. ADDITIONAL SECTION */}
      <div className="space-y-0.5 mt-2 pt-2 border-gray-100 dark:border-gray-700/50 border-t">
        <span className="block px-3 pt-1 pb-1 font-bold text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Activity & Support
        </span>

        <Link
          to="/profile/activity"
          className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 text-sm transition-colors"
        >
          <FaHistory className="text-gray-400 dark:text-gray-500" />
          <span>Activity Log</span>
        </Link>

        <Link
          to="/support"
          className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 text-sm transition-colors"
        >
          <FaQuestionCircle className="text-gray-400 dark:text-gray-500" />
          <span>Help & Support</span>
        </Link>
      </div>

      {/* 4. LOGOUT & CONFIRMATION SECTION */}
      <div className="mt-2 pt-2 border-gray-100 dark:border-gray-700/50 border-t">
        {!confirmlogout ? (
          <button
            onClick={() => setConfirmLogout(true)}
            className="flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-950/30 m-auto px-3 py-2 rounded-lg w-full font-medium text-red-600 dark:text-red-400 text-sm transition-colors"
          >
            <div className="flex items-center gap-3 m-auto" >
                <FaSignOutAlt />
            <span>Sign Out</span>
            </div>
          </button>
        ) : (
          <div className="bg-red-50 dark:bg-red-950/20 p-3 border border-red-100 dark:border-red-900/30 rounded-lg transition-all">
            <p className="mb-2.5 font-medium text-red-800 dark:text-red-300 text-xs text-center">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmLogout(false)}
                className="flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 px-2 py-1 border border-gray-200 dark:border-gray-600 rounded-md font-medium text-gray-600 dark:text-gray-300 text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 shadow-sm px-2 py-1 rounded-md font-medium text-white text-xs transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default UserDropdown;