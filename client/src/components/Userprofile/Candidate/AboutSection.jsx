import { motion } from "framer-motion";
import React, { useState } from "react";

export const CandidateAboutSection = ({ profileData, userRole, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState(profileData || {});

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditedProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedProfileData); // Pass updated data to the parent
    setIsEditing(false);
  };

  return (
    <div>
      {userRole === "candidate" && (
        <>
          {/* Name */}
          <div className="mb-4">
            <p className="font-bold">Name:</p>
            {isEditing ? (
              <input
                type="text"
                style={{
                  border: "0.5px solid",
                }}
                className="w-[50%] p-3 rounded-md focus:ring focus:ring-blue-300"
                value={editedProfileData?.candidateInfo?.name || ""}
                onChange={(e) =>
                  handleInputChange("candidateInfo", {
                    ...editedProfileData.candidateInfo,
                    name: e.target.value,
                  })
                }
              />
            ) : (
              <p>{profileData?.candidateInfo?.name || "Name not provided"}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <p className="font-bold">Email:</p>
            {isEditing ? (
              <input
                type="email"
                style={{
                  border: "0.5px solid",
                }}
                className="w-[50%] p-3 rounded-md focus:ring focus:ring-blue-300"
                value={editedProfileData?.candidateInfo?.email || ""}
                onChange={(e) =>
                  handleInputChange("candidateInfo", {
                    ...editedProfileData.candidateInfo,
                    email: e.target.value,
                  })
                }
              />
            ) : (
              <p>{profileData?.candidateInfo?.email || "Email not provided"}</p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="font-bold">Bio:</p>
            {isEditing ? (
              <textarea
                style={{
                  border: "0.5px solid",
                }}
                className="w-[50%] p-3 rounded-md focus:ring focus:ring-blue-300"
                value={editedProfileData?.about || ""}
                onChange={(e) => handleInputChange("about", e.target.value)}
              />
            ) : (
              <p>{profileData?.about || "No bio available"}</p>
            )}
          </div>

          {/* Languages */}
          <div className="mb-4">
            <p className="font-bold">Languages:</p>
            {isEditing
              ? editedProfileData?.languages?.map((lang, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      style={{
                        border: "0.5px solid",
                      }}
                      className="w-[35%] p-3 rounded-md focus:ring focus:ring-blue-300"
                      value={lang.language || ""}
                      onChange={(e) => {
                        const updatedLanguages = [
                          ...editedProfileData.languages,
                        ];
                        updatedLanguages[idx].language = e.target.value;
                        handleInputChange("languages", updatedLanguages);
                      }}
                      placeholder="Language"
                    />
                    <input
                      type="text"
                      style={{
                        border: "0.5px solid",
                      }}
                      className="w-[35%] p-3 rounded-md focus:ring focus:ring-blue-300"
                      value={lang.proficiency || ""}
                      onChange={(e) => {
                        const updatedLanguages = [
                          ...editedProfileData.languages,
                        ];
                        updatedLanguages[idx].proficiency = e.target.value;
                        handleInputChange("languages", updatedLanguages);
                      }}
                      placeholder="Proficiency"
                    />
                  </div>
                ))
              : profileData?.languages?.map((lang, idx) => (
                  <div key={idx} className="flex">
                    <p>{lang.language || "No language"}</p>
                    <p>({lang.proficiency || "No proficiency"})</p>
                  </div>
                ))}
          </div>

          {/* Location */}
          <div className="mb-4">
            <p className="font-bold">Location:</p>
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  style={{
                    border: "0.5px solid",
                  }}
                  className="w-[35%] p-3 rounded-md focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="City"
                  value={editedProfileData?.location?.city || ""}
                  onChange={(e) =>
                    handleInputChange("location", {
                      ...editedProfileData.location,
                      city: e.target.value,
                    })
                  }
                />
                <input
                  style={{
                    border: "0.5px solid",
                  }}
                  className="w-[35%] p-3 rounded-md focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="State"
                  value={editedProfileData?.location?.state || ""}
                  onChange={(e) =>
                    handleInputChange("location", {
                      ...editedProfileData.location,
                      state: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <p>
                {`${profileData?.location?.city || "Unknown City"}, ${
                  profileData?.location?.state || "Unknown State"
                }`}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4">
            {isEditing ? (
              <>
                <motion.button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
                <motion.button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={handleEditToggle}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
