import React, { useState, useEffect } from "react";
import { useForm } from "../context/AddOpportunityFromContext";
import axios from "axios";
import { PORT_CLIENT } from "../../commonClient";
import { toast, ToastContainer } from "react-toastify";

const ReviewJobOpportunity = ({ prevStep, handleFinalSubmit }) => {
  const { formData, updateForm } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [localFormData, setLocalFormData] = useState(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if the form is complete or needs more data
  useEffect(() => {
    const isValid =
      localFormData.title &&
      localFormData.company_name &&
      localFormData.company_website &&
      localFormData.ph_no &&
      localFormData.location &&
      localFormData.type &&
      localFormData.salaryRange &&
      localFormData.desc_requirement &&
      localFormData.address;
    setIsFormValid(isValid);
  }, [localFormData]);

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission reload
    updateForm(localFormData); // Update global form context
  
    try {
      setIsSubmitting(true);
      console.log("Submitting Form Data:", localFormData); // Log current form data
  
      await axios.post(
        `${PORT_CLIENT}/api/requirements/addOpportunity`,
        localFormData
      );
  
      toast.success("Form Submitted Successfully", { autoClose: 1200 });
    } catch (error) {
      console.error("Error Submitting Form:", error);
      toast.error("Error Submitting Form");
    } finally {
      setIsSubmitting(false); // Ensure the submit state resets
    }
  };
  

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = (e) => {
    setEditMode(false); // Proceed with saving the changes
    handleSubmit(); // Call the submit function to handle form data
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-5 mb-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {editMode ? "Edit Your Job Listing" : "Review Your Job Listing"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {" "}
        {/* Wrapping with form */}
        {/* Job Title */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Title</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.title || "N/A"}</p>
          )}
        </div>
        {/* Company Name */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Company Name</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.company_name}
              onChange={(e) =>
                handleInputChange("company_name", e.target.value)
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.company_name || "N/A"}
            </p>
          )}
        </div>
        {/* Company Website */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Company Website
          </h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.company_website}
              onChange={(e) =>
                handleInputChange("company_website", e.target.value)
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.company_website || "N/A"}
            </p>
          )}
        </div>
        {/* Phone Number */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Phone Number</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.ph_no}
              onChange={(e) => handleInputChange("ph_no", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.ph_no || "N/A"}</p>
          )}
        </div>
        {/* Location */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Location</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.location || "N/A"}</p>
          )}
        </div>
        {/* Job Type */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Type</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.type || "N/A"}</p>
          )}
        </div>
        {/* Salary Range */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Salary Range</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.salaryRange}
              onChange={(e) => handleInputChange("salaryRange", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.salaryRange || "N/A"}
            </p>
          )}
        </div>
        {/* Job Description */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Job Description
          </h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.desc_requirement}
              onChange={(e) =>
                handleInputChange("desc_requirement", e.target.value)
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">
              {localFormData.desc_requirement || "N/A"}
            </p>
          )}
        </div>
        {/* Address */}
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Address</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.address || "N/A"}</p>
          )}
        </div>
        {/* Action Buttons */}

        <div className="flex justify-between mt-8">
  {/* Back Button */}
  <button
    type="button" // Prevent form submission
    className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition duration-300"
    onClick={(e) => {
      prevStep(); // Call the previous step functionx`
    }}
  >
    Back
  </button>

  {/* Submit/Save Changes Button */}
  <button
    type="button" // Prevent form submission
    className={`${
      editMode
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-green-500 hover:bg-green-600"
    } text-white px-6 py-3 rounded-md shadow-md transition duration-300`}
    onClick={editMode ? handleSaveChanges : handleSubmit} // Call respective functions
  >
    {editMode ? "Save Changes" : "Submit"}
  </button>

  {/* Edit Button */}
  {!editMode && (
    <button
      type="button" // Prevent form submission
      className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
      onClick={(e) => {
        toggleEditMode(); // Toggle edit mode
      }}
    >
      Edit
    </button>
  )}
</div>

      </form>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default ReviewJobOpportunity;
