import React from "react";
import { useForm } from "../context/AddOpportunityFromContext";

const StepThree = ({ prevStep, nextStep }) => {
  const { formData, updateForm } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submitted Data:", formData);
    // You can call the submit function here to trigger API calls, etc.
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Job Details</h2>
      <form className="space-y-4">
        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Full-Time">Full-time</option>
            <option value="Part-Time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary Range
          </label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter salary range"
          />
        </div>
        {/* Description and Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description and Requirements
          </label>
          <textarea
            name="desc_requirement"
            value={formData.desc_requirement}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description and requirements"
          />
        </div>
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter job location"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
