// ReviewSubmit.js
import React from 'react';
import { useHireFormContext } from '../context/HireFormContext';

const ReviewSubmit = ({ prevStep }) => {

    const {formData} = useHireFormContext()


  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className='p-4' >
      <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Job Type</h3>
        <p>{formData.jobType}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Skills</h3>
        <p>{formData.skills.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Availability</h3>
        <p>{formData.availability}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Additional Requirements</h3>
        <p>{formData.requirements}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Job Description</h3>
        <p>{formData.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Compensation & Benefits</h3>
        <p>{formData.compensation}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Contact Information</h3>
        <p>Email: {formData.contactInfo.email}</p>
        <p>Phone: {formData.contactInfo.phone}</p>
      </div>

      <div className="flex justify-between">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={prevStep}>
          Back
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
