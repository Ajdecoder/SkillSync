import React, { useState } from 'react';

const AddDetails = ({ nextStep, prevStep, setOpportunityData }) => {
  const [formData, setFormData] = useState({
    description: '',
    requirements: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpportunityData(formData);
    nextStep();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Opportunity - Details</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Job Requirements"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
