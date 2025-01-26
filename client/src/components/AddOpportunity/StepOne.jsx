import React, { useState } from "react";
import { useForm } from "../context/AddOpportunityFromContext";
import "./AddOpportunity.css"


const StepOne = ({ nextStep }) => {
  const { formData, updateForm } = useForm();
  const [error, setError] = useState(""); // State to store error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  // Validate that all required fields are filled
  const verifyAllFieldsAreFilled = () => {
    if (
      !formData.requirement_type ||
      !formData.title ||
      !formData.company_name ||
      !formData.company_website
    ) {
      setError("Please fill all required fields."); // Set error message
      return false;
    }
    setError(""); // Clear error message if validation passes
    return true;
  };

  const handleNextClick = () => {
    if (verifyAllFieldsAreFilled()) {
      nextStep(); // Proceed to next step if validation passes
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Step 1: Basic Details
      </h2>
      <form className="space-y-4">
        {/* Requirement Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requirement Type <span className="text-red-500">*</span>
          </label>
          <select
            name="requirement_type"
            value={formData.requirement_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select requirement type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter job title"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter company name"
          />
        </div>

        {/* Company Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Website
          </label>
          <input
            type="url"
            name="company_website"
            value={formData.company_website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter company website (optional)"
          />
        </div>

        {/* Error Message */}
        {error && <p className="shake-animated text-red-500 text-sm">{error}</p>} {/* Display error */}

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNextClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
