// AdditionalRequirements.js
import React from "react";
import { useHireFormContext } from "../utils/HireFormContext";

const AdditionalRequirements = ({ nextStep, prevStep }) => {
  const { formData, handleFormDataChange } = useHireFormContext();
  const handleRequirementsChange = (e) => {
    handleFormDataChange({ requirements: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Additional Requirements</h2>
      <textarea
        value={formData.requirements}
        onChange={handleRequirementsChange}
        className=" border-gray-300 rounded-md mb-4 block w-full p-4 text-gray-900 border bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        rows="4"
        placeholder="Enter additional requirements"
      />

      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalRequirements;
