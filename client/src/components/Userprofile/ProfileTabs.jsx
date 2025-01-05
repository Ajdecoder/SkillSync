import React from "react";

const ProfileTabs = ({ tab, handleTabClick, profileRole }) => {
  return (
    <nav className="profile-tabs mt-6 flex gap-4 text-gray-600 p-[3rem]">
      <button
        onClick={() => handleTabClick("about")}
        className={`px-4 py-2 ${tab === "about" ? "bg-green-600 hover:bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-blue-500 hover:text-white`}
      >
        About
      </button>

      {profileRole === "candidate" && (
        <>
          <button
            onClick={() => handleTabClick("skills&exp")}
            className={`px-4 py-2 ${tab === "skills&exp" ? "bg-green-600 hover:bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-blue-500 hover:text-white`}
          >
            Skills & Experience
          </button>

          <button
            onClick={() => handleTabClick("opportunity/jobs")}
            className={`px-4 py-2 ${tab === "opportunity/jobs" ? "bg-green-600 hover:bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-blue-500 hover:text-white`}
          >
            Opportunities/Jobs
          </button>
        </>
      )}

      {profileRole === "recruiter" && (
        <button
          onClick={() => handleTabClick("manage/jobs")}
          className={`px-4 py-2 ${tab === "manage/jobs" ? "bg-green-600 hover:bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-blue-500 hover:text-white`}
        >
          Manage Jobs
        </button>
      )}

      <button
        onClick={() => handleTabClick("settings")}
        className={`px-4 py-2 ${tab === "settings" ? "bg-green-600 hover:bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-blue-500 hover:text-white`}
      >
        Settings
      </button>
    </nav>
  );
};

export default ProfileTabs;
