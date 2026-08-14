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
    <section className="mt-6 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Certifications</h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700"
          >
            <FaEdit />
          </button>
        )}
      </div>

      <div className="mt-6">
        {isEditing ? (
          <>
            <div className="space-y-6">
              {editedCertifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-semibold">
                        Certification Name
                      </label>

                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) =>
                          handleInputChange(idx, "name", e.target.value)
                        }
                        placeholder="AWS Certified Developer"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-semibold">
                        Issuing Organization
                      </label>

                      <input
                        type="text"
                        value={cert.issuingOrganization}
                        onChange={(e) =>
                          handleInputChange(
                            idx,
                            "issuingOrganization",
                            e.target.value
                          )
                        }
                        placeholder="Coursera, Microsoft, Google..."
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block font-semibold">
                      Date Issued
                    </label>

                    <input
                      type="date"
                      value={cert.dateIssued}
                      onChange={(e) =>
                        handleInputChange(idx, "dateIssued", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={() => handleRemoveCertification(idx)}
                    className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddCertification}
              className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
            >
              + Add Certification
            </button>

            <div className="mt-8 flex gap-4">
              <button
                onClick={saveChanges}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg bg-gray-500 px-6 py-3 font-medium text-white transition hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {updatedData?.certifications?.length ? (
              <div className="space-y-4">
                {updatedData.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                  >
                    <h3 className="text-lg font-semibold">{cert.name}</h3>

                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      {cert.issuingOrganization}
                    </p>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Issued on{" "}
                      {cert.dateIssued
                        ? new Date(cert.dateIssued).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400">
                  No certifications added yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
