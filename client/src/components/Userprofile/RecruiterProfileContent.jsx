import React, { useState } from "react";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";
import CompanyBenefits from "./Recruiter/CompanyBenefits";
import ManageJobs from "./Recruiter/ManageJobs";
import CompanyOverview from "./Recruiter/CompanyOverview";
import RecruitmentProcess from "./Recruiter/RecruitmentProcess";
import PastHires from "./Recruiter/PastHires";
import TeamMembers from "./Recruiter/TeamMembers";

const RecruiterProfileContent = ({ profileData, userRole, activeTab }) => {
  const [isEditing, setIsEditing] = useState({
    companyOverview: false,
    teamMembers: false,
    benefits: false,
    jobListings: false,
    recruitmentProcess: false,
    socialLinks: false,
  });
  const [updatedData, setUpdatedData] = useState(profileData);

  // Toggle Edit Mode
  const handleEditClick = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: true }));
  };

  // Handle input changes for nested fields

 // Handle input changes for nested fields
 const handleInputChange = (e, section) => {
  const { name, value } = e.target;
  const updatedSectionData = { ...updatedData };

  // Check for nested fields (like companyBenefits or jobListings)
  if (
    section === "companyBenefits" ||
    section === "jobListings" ||
    section === "teamMembers" ||
    section === "recruitmentProcess"
  ) {
    const nameParts = name.split("."); // Split the name by dots to handle nested properties
    const [fieldName, arrayIndex, subField] = nameParts;
    console.log(nameParts);

    if (arrayIndex !== undefined && updatedSectionData[section][arrayIndex]) {
      updatedSectionData[section][arrayIndex][subField] = value;
    } else {
      updatedSectionData[section][nameParts[1]] = value;
    }
  } else if (section === "companyOverview") {
    // For companyOverview, directly update the object's properties
    updatedSectionData[section][name] = value;
  } else {
    updatedSectionData[section][name] = value;
  }

  setUpdatedData(updatedSectionData);

};

  // Submit Edited Profile
  const handleSubmit = async (e, section) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${PORT_CLIENT}/api/users/profile/account/user/profile/update/${profileData.email}`,
        updatedData
      );

      if (response.status === 200) {
        setIsEditing((prev) => ({ ...prev, [section]: false }));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred while updating the ${section}.`);
    }
  };

  const handleAddItem = (section) => {
    const defaultItems = {
      teamMembers: { name: "", linkedIn: "", github: "" },
      jobListings: { title: "", description: "", requirements: "" },
      companyBenefits: { benefit: "" },
    };

    setUpdatedData((prevState) => ({
      ...prevState,
      [section]: [...(prevState[section] || []), defaultItems[section] || {}],
    }));
  };

  const handleRemoveItem = (section, index) => {
    const updatedSectionData = { ...updatedData };

    // Ensure the section exists and is an array before trying to modify it
    if (
      updatedSectionData[section] &&
      Array.isArray(updatedSectionData[section])
    ) {
      updatedSectionData[section].splice(index, 1); // Remove the item at the given index
    }

    setUpdatedData(updatedSectionData);
  };

  return (
    <>
      {activeTab === "companyOverview" && (
        <CompanyOverview
          profileData={profileData}
          userRole={userRole}
          updatedData={updatedData}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          activeTab={activeTab}
          handleEditClick={handleEditClick}
          setUpdatedData={setUpdatedData}
        />
      )}

      {activeTab === "companyBenefits" && (
        <CompanyBenefits
          profileData={profileData}
          userRole={userRole}
          updatedData={updatedData}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          activeTab={activeTab}
          handleEditClick={handleEditClick}
        />
      )}

      {activeTab === "manage-jobs" && (
        <ManageJobs
          profileData={profileData}
          userRole={userRole}
          updatedData={updatedData}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setUpdatedData={setUpdatedData}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          activeTab={activeTab}
          handleEditClick={handleEditClick}
        />
      )}

      {activeTab === "recruitmentProcess" && (
        <RecruitmentProcess
          profileData={profileData}
          userRole={userRole}
          updatedData={updatedData}
          isEditing={isEditing}
          handleSubmit={handleSubmit}
          activeTab={activeTab}
          handleEditClick={handleEditClick}
          setUpdatedData={setUpdatedData}
        />
      )}

      {activeTab === "pastHires" && <PastHires />}

      {activeTab === "teamMembers" && (
        <TeamMembers
          profileData={profileData}
          userRole={userRole}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          handleSubmit={handleSubmit}
          
        />
      )}
    </>
  );
};

export default RecruiterProfileContent;
