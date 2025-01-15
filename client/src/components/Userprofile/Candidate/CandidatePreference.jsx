import React, { useState, useEffect } from "react";
import UserPreferenceForm from "../UserPreferenceForm";
import { motion } from "framer-motion";

export const Candidatepreferences = ({
  profileData,
  isEditing,
  setIsEditing,
  handleSubmit,
  setUpdatedData,
  updatedData,
}) => {
  const [editedPreferences, setEditedPreferences] = useState(
    profileData?.preferences || {}
  );

  // Update local state whenever profileData changes
  useEffect(() => {
    setEditedPreferences(profileData?.preferences || {});
  }, [profileData]);

  const handleInputChange = (field, value) => {
    const updatedPreferences = {
      ...editedPreferences,
      [field]: value,
    };
    setEditedPreferences(updatedPreferences);
    setUpdatedData({
      ...updatedData,
      preferences: updatedPreferences,
    });
  };

  const handleSalaryChange = (field, value) => {
    const updatedPreferences = {
      ...editedPreferences,
      salaryRange: {
        ...editedPreferences.salaryRange,
        [field]: value,
      },
    };
    setEditedPreferences(updatedPreferences);
    setUpdatedData({
      ...updatedData,
      preferences: updatedPreferences,
    });
  };

  return (
    <div>
      <UserPreferenceForm />
      {!isEditing ? (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Job Preferences</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-bold">Looking For:</p>
              <p>{profileData?.preferences?.jobType || "Not specified"}</p>
            </div>
            <div>
              <p className="font-bold">Salary Range:</p>
              <p>
                {profileData?.preferences?.salaryRange
                  ? `${profileData.preferences.salaryRange.min} - ${profileData.preferences.salaryRange.max}`
                  : "Not specified"}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </motion.button>
        </section>
      ) : (
        <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Edit Job Opportunities</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="font-bold block">Looking For:</label>
              <input
                style={{
                  border: "0.5px solid",
                }}
                type="text"
                className="w-full p-2 border rounded"
                value={editedPreferences.jobType || ""}
                onChange={(e) => handleInputChange("jobType", e.target.value)}
                placeholder="Enter job type"
              />
            </div>
            <div>
              <label className="font-bold block">Salary Range:</label>
              <div className="flex gap-4">
                <input
                  style={{
                    border: "0.5px solid",
                  }}
                  type="number"
                  className="w-full p-2 border rounded"
                  value={editedPreferences.salaryRange?.min || ""}
                  onChange={(e) => handleSalaryChange("min", e.target.value)}
                  placeholder="Min Salary"
                />
                <input
                  style={{
                    border: "0.5px solid",
                  }}
                  type="number"
                  className="w-full p-2 border rounded"
                  value={editedPreferences.salaryRange?.max || ""}
                  onChange={(e) => handleSalaryChange("max", e.target.value)}
                  placeholder="Max Salary"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => handleSubmit("jobOpportunities")}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
