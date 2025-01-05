import React from "react";

const ProfileTabs = ({ activeTab, onTabChange, userRole }) => {
  return (
    <nav className="profile-tabs mt-6 flex gap-4 text-gray-600 p-[3rem]">
      <button
        onClick={() => onTabChange("about")}
        className={`px-4 py-2 ${activeTab === "about" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
        aria-label="About Section"
      >
        About
      </button>

      {userRole === "candidate" && (
        <>
          <button
            onClick={() => onTabChange("skillsAndExperience")}
            className={`px-4 py-2 ${activeTab === "skillsAndExperience" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Skills and Experience Section"
          >
            Skills & Experience
          </button>

          <button
            onClick={() => onTabChange("jobOpportunities")}
            className={`px-4 py-2 ${activeTab === "jobOpportunities" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Opportunities and Jobs Section"
          >
            Opportunities/Jobs
          </button>

          <button
            onClick={() => onTabChange("portfolio")}
            className={`px-4 py-2 ${activeTab === "portfolio" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Portfolio Section"
          >
            Portfolio
          </button>

          <button
            onClick={() => onTabChange("certifications")}
            className={`px-4 py-2 ${activeTab === "certifications" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Certifications Section"
          >
            Certifications
          </button>
        </>
      )}

      {userRole === "recruiter" && (
        <>
          <button
            onClick={() => onTabChange("manage-jobs")}
            className={`px-4 py-2 ${activeTab === "manage-jobs" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Manage Jobs Section"
          >
            Manage Jobs
          </button>

          <button
            onClick={() => onTabChange("company-overview")}
            className={`px-4 py-2 ${activeTab === "companyOverview" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Company Overview Section"
          >
            Company Overview
          </button>

          <button
            onClick={() => onTabChange("recruitment-process")}
            className={`px-4 py-2 ${activeTab === "recruitment-process" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
            aria-label="Recruitment Process Section"
          >
            Recruitment Process
          </button>
        </>
      )}

      <button
        onClick={() => onTabChange("settings")}
        className={`px-4 py-2 ${activeTab === "settings" ? "bg-green-600 text-white" : "bg-white"} shadow rounded hover:bg-green-500 hover:text-white transition-all`}
        aria-label="Settings Section"
      >
        Settings
      </button>
    </nav>
  );
};

export default ProfileTabs;
