import React, { useState } from "react";
import { useForm } from "../context/AddOpportunityFromContext";

const StepThree = ({ prevStep, nextStep }) => {
  const { formData, updateForm } = useForm();
  const [error, setError] = useState(""); // State to store error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  // Validate the form before moving to the next step
  const verifyAllFieldsAreFilled = () => {
    if (!formData.minSalary || !formData.maxSalary || !formData.desc_requirement.trim()) {
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Step 3: Job Details</h2>
      <form className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary Range
          </label>
          <div className="flex justify-between">
            <input
              type="range"
              name="minSalary"
              value={formData.minSalary}
              min={0}
              max={1000000}  // Set your max value here
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="range"
              name="maxSalary"
              value={formData.maxSalary}
              min={formData.minSalary}  // Ensure maxSalary is at least equal to minSalary
              max={1000000}  // Set your max value here
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span>{`Min: ₹${formData.minSalary}`}</span>
            <span>{`Max: ₹${formData.maxSalary}`}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description and Requirements
          </label>
          <textarea
            name="desc_requirement"
            value={formData.desc_requirement}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter description and requirements"
          />
        </div>

        {error && (
          <p className="shake-animated text-red-500 text-sm">{error}</p>
        )}

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
            onClick={handleNextClick}
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
