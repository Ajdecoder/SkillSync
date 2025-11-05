import React from "react";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";

const RecentOpportunity = ({
  addedOpportunities = [],
  filterdOpportunities = [],
}) => {

  console.log(addedOpportunities,filterdOpportunities)
  // Use filtered data if available, else fallback to all added opportunities
    const opportunitiesToShow =
      filterdOpportunities.length > 0 ? filterdOpportunities : addedOpportunities;

  const renderOpportunityCard = (opportunity) => {
    return (
      <AddOpportunityCard
        key={opportunity._id}
        opportunity={opportunity}
      />
    );
  };

  return (
    <div className="space-y-8 opportunity-card-container">
      {opportunitiesToShow.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4">
          {opportunitiesToShow.map((opportunity) =>
            renderOpportunityCard(opportunity)
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No matching opportunities found.
        </div>
      )}
    </div>
  );
};

export default RecentOpportunity;
