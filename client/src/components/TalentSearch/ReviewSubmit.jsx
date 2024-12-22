import React, { useState } from 'react';
import { useHireFormContext } from '../context/HireFormContext';
import axios from 'axios';
import { PORT_CLIENT } from '../../commonClient';
import { toast, ToastContainer } from 'react-toastify';

const ReviewSubmit = ({ prevStep }) => {
  
  const { formData, handleFormDataChange } = useHireFormContext();
  const [editMode, setEditMode] = useState(false); 
  const [localFormData, setLocalFormData] = useState(formData); 

  const handleInputChange = (field, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      handleFormDataChange(localFormData);
      console.log('Form submitted:', localFormData);
      axios.post(`${PORT_CLIENT}/api/requirements/hireTalent`,localFormData)  
      toast.success("Form Submitted SuccessFully", {autoClose:1200})
    } catch (error){
      toast.error("Error Submitting Form")
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-5 mb-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {editMode ? 'Edit Your Job Listing' : 'Review Your Job Listing'}
      </h2>

      <div className="space-y-6">

        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.skills.join(', ')}
              onChange={(e) =>
                handleInputChange('skills', e.target.value.split(',').map((skill) => skill.trim()))
              }
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.skills.join(', ')}</p>
          )}
        </div>


        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Job Type</h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.jobType}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.availability}</p>
          )}
        </div>


        <div className="border-b p-4">
          <h3 className="text-xl font-semibold text-gray-700">Candidate Availability
          </h3>
          {editMode ? (
            <input
              type="text"
              value={localFormData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full border rounded p-2 text-gray-600"
            />
          ) : (
            <p className="text-gray-600">{localFormData.availability}</p>
          )}
        </div>


        <div className="border-b p-4">
            <h3 className="text-xl font-semibold text-gray-700">Requirements</h3>
            {editMode ? (
              <input
                type="text"
                value={localFormData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                className="w-full border rounded p-2 text-gray-600"
              />
            ) : (
              <p className="text-gray-600">{localFormData.requirements}</p>
            )}
      </div>  

      <div className="border-b p-4">
            <h3 className="text-xl font-semibold text-gray-700">Job Description</h3>
            {editMode ? (
              <input
                type="text"
                value={localFormData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                className="w-full border rounded p-2 text-gray-600"
              />
            ) : (
              <p className="text-gray-600">{localFormData.availability}</p>
            )}
      </div>  

      <div className="border-b p-4">
            <h3 className="text-xl font-semibold text-gray-700">compensation_benifits & Benefits
            </h3>
            {editMode ? (
              <input
                type="text"
                value={localFormData.compensation}
                onChange={(e) => handleInputChange('compensation', e.target.value)}
                className="w-full border rounded p-2 text-gray-600"
              />
            ) : (
              <p className="text-gray-600">{localFormData.availability}</p>
            )}
      </div>  

        <div className="flex justify-between mt-8">
          <button
            className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition duration-300"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            className={`${
              editMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
            } text-white px-6 py-3 rounded-md shadow-md transition duration-300`}
            onClick={editMode ? () => setEditMode(false) : handleSubmit}
          >
            {editMode ? 'Save Changes' : 'Submit'}
          </button>
          {!editMode && (
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
              onClick={toggleEditMode}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <ToastContainer position='bottom-left' />
    </div>
  );
};

export default ReviewSubmit;
