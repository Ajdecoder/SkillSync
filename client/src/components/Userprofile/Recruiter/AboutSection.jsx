import React, { useState } from "react";
import { updateUserProfileByEmail } from "../../../services/api";

export const RecruiterAboutSection = ({ userRole, profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(profileData);

  const handleSave = () => {
    handleSubmit("companyOverview");
  };

  const handleSubmit = async (section) => {
    try {
      const response = await updateUserProfileByEmail(profileData.email, updatedData);
      console.log(response);
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
      {userRole === "recruiter" && (
        <>
          <div>
            <p className="font-bold">Company Description:</p>
            {isEditing ? (
              <textarea
                style={{
                  border: "1px solid",
                }}
                value={updatedData.companyOverview?.description || ""}
                onChange={(e) =>
                  setUpdatedData((prev) => ({
                    ...prev,
                    companyOverview: {
                      ...prev.companyOverview,
                      description: e.target.value,
                    },
                  }))
                }
                className="border rounded p-2 w-full"
              />
            ) : (
              <p>
                {updatedData.companyOverview?.description ||
                  "Add a description"}
              </p>
            )}
          </div>
          <div>
            <p className="font-bold">Company Website:</p>
            {isEditing ? (
              <input
                style={{
                  border: "0.71px solid",
                }}
                type="url"
                value={updatedData.companyOverview?.website || ""}
                onChange={(e) =>
                  setUpdatedData((prev) => ({
                    ...prev,
                    companyOverview: {
                      ...prev.companyOverview,
                      website: e.target.value,
                    },
                  }))
                }
                className="border rounded p-2 w-full"
              />
            ) : (
              <a
                href={updatedData.companyOverview?.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {updatedData.companyOverview?.website || "Add your website"}
              </a>
            )}
          </div>
          <div>
            <p className="font-bold">Company Name:</p>
            {isEditing ? (
              <input
                style={{
                  border: "0.71px solid",
                }}
                type="text"
                value={updatedData.companyOverview?.name || ""}
                onChange={(e) =>
                  setUpdatedData((prev) => ({
                    ...prev,
                    companyOverview: {
                      ...prev.companyOverview,
                      name: e.target.value,
                    },
                  }))
                }
                className="border rounded p-2 w-full"
              />
            ) : (
                <p>
                {updatedData.companyOverview?.name ||
                  "Add Company Name"}
              </p>
            )}
          </div>
          <div className="mt-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
