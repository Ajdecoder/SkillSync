import React, { useState } from "react";
import { useForm } from "../context/AddOpportunityFromContext";

const StepTwo = ({ nextStep, prevStep }) => {
  const { formData, updateForm } = useForm();
  const [error, setError] = useState(""); // State to store error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  // Validate that all required fields are filled
  const verifyAllFieldsAreFilled = () => {
    if (!formData.skills || !formData.ph_no || !formData.location) {
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
        Step 2: Contact Details
      </h2>
      <form className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email"
          />
        </div>
        {/* Phone Number */}
        <div className="relative ">
          <span className="absolute start-0 text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4 rtl:rotate-[270deg]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 19 18"
            >
              <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
            </svg>
          </span>
          <input
            type="tel"
            name="ph_no"
            value={formData.ph_no}
            onChange={handleChange}
            id="floating-phone-number"
            className="block py-2.5 ps-8 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder=" "
          />
          <label
            htmlFor="floating-phone-number"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Phone number
          </label>
        </div>
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location"
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
          {/* Error Message */}
          {error && (
            <p className="shake-animated text-red-500 text-sm">{error}</p>
          )}{" "}
          {/* Display error */}
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

export default StepTwo;
