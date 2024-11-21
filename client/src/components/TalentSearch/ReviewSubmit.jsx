// ReviewSubmit.js
import React from 'react';
import { useHireFormContext } from '../context/HireFormContext';

const ReviewSubmit = ({ prevStep }) => {
  const { formData } = useHireFormContext();

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Review Your Job Listing</h2>

      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Type</h3>
          <p className="text-gray-600">{formData.jobType}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
          <p className="text-gray-600">{formData.skills.join(', ')}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Availability</h3>
          <p className="text-gray-600">{formData.availability}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Additional Requirements</h3>
          <p className="text-gray-600">{formData.requirements}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Description</h3>
          <p className="text-gray-600">{formData.description}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Compensation & Benefits</h3>
          <p className="text-gray-600">{formData.compensation}</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-700">Contact Information</h3>
          <p className="text-gray-600">Email: {formData.contactInfo.email}</p>
          <p className="text-gray-600">Phone: {formData.contactInfo.phone}</p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition duration-300"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
