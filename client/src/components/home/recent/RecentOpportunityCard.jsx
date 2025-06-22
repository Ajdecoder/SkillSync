import React from "react";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";

const RecentOpportunity = ({
  addedOpportunities = [],
  filterdOpportunities = [],
}) => {
  // Use filtered data if available, else fallback to all added opportunities
  const opportunitiesToShow =
    filterdOpportunities.length > 0 ? filterdOpportunities : addedOpportunities;

  const handleConnectClick = (opportunity, index, type) => {
    console.log("Connect clicked:", opportunity, index, type);
    // Implement navigation or connect logic here if needed
  };

  const renderOpportunityCard = (opportunity) => {
    return (
      <AddOpportunityCard
        key={opportunity._id}
        opportunity={opportunity}
        onConnectClick={() =>
          handleConnectClick(
            opportunity,
            addedOpportunities.findIndex((o) => o._id === opportunity._id),
            "opportunity"
          )
        }
      />
    );
  };

  return (
    <div className="space-y-8 opportunity-card-container">
      {opportunitiesToShow.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
