import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillsAndExperience } from "./Candidate/SkillsAndExperience";
import { Candidatepreferences } from "./Candidate/CandidatePreference";
import { Portfolio } from "./Candidate/Portfolio";
import { Certification } from "./Candidate/Certification";
import { updateUserProfile } from "../../services/api";

const CandidateProfileContent = ({ profileData, activeTab, userRole }) => {
  const [updatedData, setUpdatedData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (section) => {
    try {
      const response = await updateUserProfile(profileData.email, updatedData);

      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred while updating the ${section}.`);
    }
  };

  return (
    <>
      {activeTab === "skillsAndExperience" && (
        <SkillsAndExperience
          profileData={profileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
        />
      )}

      {userRole === "candidate" && activeTab === "preferences" && (
        <Candidatepreferences
          profileData={profileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
        />
      )}
      {/* Portfolio Tab */}
      {userRole === "candidate" && activeTab === "portfolio" && (
        <Portfolio
          profileData={profileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
        />
      )}

      {/* Certifications Tab */}
      {userRole === "candidate" && activeTab === "certifications" && (
        <Certification
          profileData={profileData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
        />
      )}
      
    </>
  );
};

export default CandidateProfileContent;
