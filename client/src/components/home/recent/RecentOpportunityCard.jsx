import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { PORT_CLIENT } from "../../../commonClient.js";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useGetDataFetch.jsx";
import TalentsCard from "./TalentsCards.jsx";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";

const RecentOpportunity = ({ handleConnectClick, addedOpportunities }) => {
  const { loggedInUser } = useAuth();

  const renderOpportunityCard = (opportunity) => {
    return (
      <AddOpportunityCard
        key={opportunity._id} // Use unique identifier instead of index
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
    <div className="space-y-8">
      {/* Added Opportunities Section */}
      {addedOpportunities.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addedOpportunities.map((opportunity, index) =>
              renderOpportunityCard(opportunity, index)
            )}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {addedOpportunities.length === 0 && (
        <div className="text-center text-gray-500">
          No recent posts or opportunities available.
        </div>
      )}
    </div>
  );
};

export default RecentOpportunity;
