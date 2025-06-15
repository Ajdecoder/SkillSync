import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

export const Certification = ({
  profileData,
  isEditing,
  setIsEditing,
  handleSubmit,
  setUpdatedData,
  updatedData,
}) => {
  const [editedCertifications, setEditedCertifications] = useState(
    profileData?.certifications || []
  );

  // Handle changes to certification details
  const handleInputChange = (index, field, value) => {
    const updatedCertifications = [...editedCertifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setEditedCertifications(updatedCertifications);
    setUpdatedData({
      ...updatedData,
      certifications: updatedCertifications,
    });
  };

  // Add a new certification
  const handleAddCertification = () => {
    const newCertification = {
      name: "",
      issuingOrganization: "",
      dateIssued: "",
    };
    const updatedCertifications = [...editedCertifications, newCertification];
    setEditedCertifications(updatedCertifications);
    setUpdatedData({
      ...updatedData,
      certifications: updatedCertifications,
    });
  };

  // Remove a certification
  const handleRemoveCertification = (index) => {
    const updatedCertifications = editedCertifications.filter(
      (_, idx) => idx !== index
    );
    setEditedCertifications(updatedCertifications);
    setUpdatedData({
      ...updatedData,
      certifications: updatedCertifications,
    });
  };

  // Save changes to profile data
  const saveChanges = () => {
    handleSubmit("certifications"); // Submit the changes
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div>
      <section className="profile-content mt-6 bg-white p-6 rounded-lg shadow-md dark:text-black">
        <h2 className="text-xl font-semibold ">Certifications</h2>
        <div className="mt-4 space-y-4">
          {isEditing ? (
            <div>
              {/* Editable Mode */}
              {editedCertifications.map((cert, idx) => (
                <div key={idx} className="mb-4">
                  <label className="font-bold block">Certification Name:</label>
                  <input
                    style={{
                      border: "0.5px solid",
                    }}
                    type="text"
                    className="w-full p-4 border rounded mb-2"
                    value={cert.name}
                    onChange={(e) =>
                      handleInputChange(idx, "name", e.target.value)
                    }
                    placeholder="Enter certification name"
                  />
                  <label className="font-bold block">
                    Issuing Organization:
                  </label>
                  <input
                    style={{
                      border: "0.5px solid",
                    }}
                    type="text"
                    className="w-full p-4 rounded mb-2"
                    value={cert.issuingOrganization}
                    onChange={(e) =>
                      handleInputChange(
                        idx,
                        "issuingOrganization",
                        e.target.value
                      )
                    }
                    placeholder="Enter issuing organization"
                  />
                  <label className="font-bold block">Date Issued:</label>
                  <input
                    style={{
                      border: "0.5px solid",
                    }}
                    type="date"
                    className="w-full p-4 border rounded"
                    value={cert.dateIssued}
                    onChange={(e) =>
                      handleInputChange(idx, "dateIssued", e.target.value)
                    }
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveCertification(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleAddCertification}
              >
                Add New Certification
              </button>
            </div>
          ) : (
            <ul className="pl-4">
              {/* Read-only Mode */}
              {updatedData?.certifications?.length > 0 ? (
                updatedData.certifications.map((cert, idx) => (
                  <li className="p-1 list-disc" key={idx}>
                    {cert.name} from {cert.issuingOrganization} (
                    {new Date(cert.dateIssued).toLocaleDateString()})
                  </li>
                ))
              ) : (
                <p>No certifications listed</p>
              )}
            </ul>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={saveChanges}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
