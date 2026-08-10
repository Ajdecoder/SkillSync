import React, { useState } from "react";
import { Link } from "react-router-dom";
import { communication_privacy } from "./SettingsCat";
import { useAuth } from "../../context/AuthContext";
import { FaSave, FaLock, FaEnvelope, FaUserTimes, FaShieldAlt, FaUserCog } from "react-icons/fa";

export const Settings = () => {
  const [settings, setSettings] = useState(communication_privacy);
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const handleToggle = (index) => {
    const updatedSettings = [...settings];
    updatedSettings[index].checked = !updatedSettings[index].checked;
    setSettings(updatedSettings);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10 min-h-screen">
      <div className="flex flex-col space-y-2 mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Personalize your experience, {currentUser?.name || "User"}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Communication and Privacy Settings */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <FaShieldAlt className="text-xl text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Communication & Privacy
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base">
              Manage how we communicate with you and control your privacy preferences.
            </p>

            <div className="space-y-4">
              {settings.map((setting, index) => (
                <div key={index} className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                  <div className="flex items-center h-6 mt-0.5">
                    <input
                      id={`setting-${index}`}
                      type="checkbox"
                      checked={setting.checked}
                      onChange={() => handleToggle(index)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                  </div>
                  <div className="ml-4 flex flex-col">
                    <label htmlFor={`setting-${index}`} className="text-base font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                      {setting.label}
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {setting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center justify-center space-x-2 w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow">
                <FaSave />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </section>

        {/* Account Management */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FaUserCog className="text-xl text-gray-700 dark:text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Account Management</h2>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/profile/settings/change-password"
                className="group flex flex-col p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all"
              >
                <div className="flex items-center space-x-3 mb-1">
                  <FaLock className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Change Password</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-7">Update your security credentials.</p>
              </Link>

              <Link
                to="/profile/settings/change-email"
                className="group flex flex-col p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all"
              >
                <div className="flex items-center space-x-3 mb-1">
                  <FaEnvelope className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Change Email Address</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-7">Manage your primary contact email.</p>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-semibold tracking-wider text-red-600 dark:text-red-500 uppercase mb-4">Danger Zone</h3>
              <Link
                to="/settings/delete-account"
                className="group flex flex-col p-4 border border-red-100 dark:border-red-900/30 rounded-xl bg-red-50/30 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-all"
              >
                <div className="flex items-center space-x-3 mb-1">
                  <FaUserTimes className="text-red-400 group-hover:text-red-500 transition-colors" />
                  <span className="text-lg font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">Delete My Account</span>
                </div>
                <p className="text-sm text-red-500/80 dark:text-red-400/80 ml-7">
                  Permanently remove your {currentUser?.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1).toLowerCase() : ''} account and data.
                </p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
