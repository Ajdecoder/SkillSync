import { motion } from "framer-motion";
import React, { useState } from "react";
import { updateUserProfileByEmail } from "../../../services/api";

export const CandidateAboutSection = ({ profileData, userRole, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(profileData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  const handleSubmit = async (section) => {
    try {
      const response = await updateUserProfileByEmail(
        profileData.email,
        updatedData
      );

      if (response.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred while updating the ${section}.`);
    }
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
                value={updatedData?.candidateInfo?.name || ""}
                onChange={(e) =>
                  handleInputChange("candidateInfo", {
                    ...updatedData.candidateInfo,
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
                value={updatedData?.candidateInfo?.email || ""}
                onChange={(e) =>
                  handleInputChange("candidateInfo", {
                    ...updatedData.candidateInfo,
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
                value={updatedData?.about || ""}
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
              ? updatedData?.languages?.map((lang, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      style={{
                        border: "0.5px solid",
                      }}
                      className="w-[35%] p-3 rounded-md focus:ring focus:ring-blue-300"
                      value={lang.language || ""}
                      onChange={(e) => {
                        const updatedLanguages = [...updatedData.languages];
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
                        const updatedLanguages = [...updatedData.languages];
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
                  value={updatedData?.location?.city || ""}
                  onChange={(e) =>
                    handleInputChange("location", {
                      ...updatedData.location,
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
                  value={updatedData?.location?.state || ""}
                  onChange={(e) =>
                    handleInputChange("location", {
                      ...updatedData.location,
                      state: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <p>
                {`${updatedData?.location?.city || "Unknown City"}, ${
                  updatedData?.location?.state || "Unknown State"
                }`}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4">
            {isEditing ? (
              <>
                <motion.button
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleSubmit(updatedData, "candidate about")
                  }
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
