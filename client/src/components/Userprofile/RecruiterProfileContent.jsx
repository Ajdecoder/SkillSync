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

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;

    setUpdatedData((prevState) => {
      const updatedSection = { ...prevState[section] };

      if (index !== null) {
        // Update specific array element
        const updatedArray = [...prevState[section]];
        updatedArray[index] = {
          ...updatedArray[index],
          [name]: value,
        };
        return { ...prevState, [section]: updatedArray };
      } else {
        // Update top-level or flat section properties
        updatedSection[name] = value;
        return { ...prevState, [section]: updatedSection };
      }
    });
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
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          activeTab={activeTab}
          handleEditClick={handleEditClick}
        />
      )}

      {activeTab === "pastHires" && <PastHires />}

      {activeTab === "teamMembers" && (
        <TeamMembers
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
    </>
  );
};

export default RecruiterProfileContent;
