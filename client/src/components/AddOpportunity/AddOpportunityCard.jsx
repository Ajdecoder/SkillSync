import React from 'react';

const AddOpportunityCard = ({ title, description, onCreateOpportunity }) => {
  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-md text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={onCreateOpportunity}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
          >
            Create Opportunity
          </button>
          <button
            onClick={() => console.log('View Opportunities')}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all"
          >
            View Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOpportunityCard;
