// JobTypeCategory.js
import React from 'react';
import { useHireFormContext } from '../context/HireFormContext';

const JobTypeCategory = ({ nextStep }) => {
  const { formData, handleFormDataChange } = useHireFormContext();

  const handleJobTypeChange = (e) => {
    handleFormDataChange({ jobType: e.target.value });
  };

  return (
    <div className='p-3'>
      <h2 className="text-xl font-semibold mb-4">Job Type</h2>
      <select
        value={formData.jobType || ''}
        onChange={handleJobTypeChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
        required
      >
        <option value="">Select Job Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>

      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={nextStep}
          disabled={!formData.jobType}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobTypeCategory;
