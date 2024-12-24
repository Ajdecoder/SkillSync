import React, { useState } from "react";
import { Link } from "react-router-dom";
import { communication_privacy } from "./SettingsCat";

export const Settings = () => {
    

  const toggleCheckbox = (setter, value) => setter(!value);

  const [settings, setSettings] = useState(communication_privacy);


  const handleToggle = (index) => {
    const updatedSettings = [...settings];
    updatedSettings[index].checked = !updatedSettings[index].checked;
    setSettings(updatedSettings);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Account Settings
      </h1>

      {/* Communication and Privacy Settings */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Communication and Privacy
        </h2>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email and Notification Settings
          </label>

          {communication_privacy.map((setting, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={setting.checked}
                  onChange={() => handleToggle(index)}
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-700">{setting.label}</span>
              </div>
              <p className="text-gray-500 text-sm pl-8">
                {setting.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Account Settings */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Account</h2>
        <div className="space-y-4">
          <div>
            <Link
              to="/settings/manage-account"
              className="block text-xl font-semibold text-blue-500 hover:underline"
            >
              Manage Account
            </Link>
            <p className="text-gray-700">
              Update your account details and preferences.
            </p>
          </div>

          <div>
            <Link
              to="/profile/settings/change-password"
              className="block text-xl font-semibold text-blue-500 hover:underline"
            >
              Change Password
            </Link>
            <p className="text-gray-700">Change your account password.</p>
          </div>

          <div>
            <Link
              to="/settings/change-email"
              className="block text-xl font-semibold text-blue-500 hover:underline"
            >
              Change Email Address
            </Link>
            <p className="text-gray-700">Update your email address.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
