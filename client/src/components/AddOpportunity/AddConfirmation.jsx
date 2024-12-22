import axios from "axios";
import React from "react";
import { PORT_CLIENT } from "../../commonClient";

const AddConfirmation = ({ opportunityData }) => {
  const handleAddOpportunityFormSubmit = () => {
    axios.post(
      `${PORT_CLIENT}/api/requirements/addOpportunity`,
      opportunityData
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Confirm Opportunity Details
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4">
        <p>
          <strong>Title:</strong> {opportunityData.title}
        </p>
        <p>
          <strong>Location:</strong> {opportunityData.location}
        </p>
        <p>
          <strong>Job Type:</strong> {opportunityData.jobType}
        </p>
        <p>
          <strong>Description:</strong> {opportunityData.description}
        </p>
        <p>
          <strong>Requirements:</strong> {opportunityData.requirements}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAddOpportunityFormSubmit}
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddConfirmation;
