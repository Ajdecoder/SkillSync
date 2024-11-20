// CompensationBenefits.js
import React from 'react';
import { useHireFormContext } from '../context/HireFormContext';

const CompensationBenefits = ({  nextStep, prevStep }) => {

    const {formData, handleFormDataChange} = useHireFormContext()

  const handleCompensationChange = (e) => {
    handleFormDataChange({ compensation: e.target.value });
  };

  return (
    <div className='p-4'>
      <h2 className="text-xl font-semibold mb-4">Compensation & Benefits</h2>
      <textarea
        value={formData.compensation}
        onChange={handleCompensationChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
        rows="4"
        placeholder="Enter compensation and benefits details"
      />

      <div className="flex justify-between">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={prevStep}>
          Back
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CompensationBenefits;
