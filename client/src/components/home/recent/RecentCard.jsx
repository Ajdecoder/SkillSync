import React from "react";
import { useAuth } from "../../context/AuthContext";
import { PORT_CLIENT } from "../../../commonClient";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useGetDataFetch.jsx";
import TalentSearchCard from "../../TalentSearch/TalentSearchCards.jsx";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";

const RecentCard = () => {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  // Use the custom hook to fetch data
  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/allRequirements`
  );

  // Destructure talents and addedOpportunities from fetched data
  const talents = data?.talents || [];
  const addedOpportunities = data?.Addedopportunities || [];

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleConnectClick = (item, index, type) => {
    const post_id =
      type === "talent" ? talents[index]._id : addedOpportunities[index]._id;

    // Navigate to the connect page with item details
    navigate(`${type}/connect/${post_id}`, { state: { item } });
  };

  const renderTalentCard = (talent, index) => {
    return (
      loggedInUser && (
        <TalentSearchCard
          key={index}
          talent={talent}
          onConnectClick={() =>
            handleConnectClick(talent, index, "opportunity")
          }
        />
      )
    );
  };

  const renderOpportunityCard = (opportunity, index) => {
    return (
      <>
        <AddOpportunityCard
          key={index}
          opportunity={opportunity}
          onConnectClick={() =>
            handleConnectClick(opportunity, index, "opportunity")
          }
        />
      </>
    );
  };

  return (
    <div className="space-y-8">
      {/* Talents Section */}
      {talents.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent, index) =>
              renderTalentCard(talent, index, "talent")
            )}
          </div>
        </div>
      )}

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
      {talents.length === 0 && addedOpportunities.length === 0 && (
        <div className="text-center text-gray-500">
          No recent posts or opportunities available.
        </div>
      )}
    </div>
  );
};

export default RecentCard;
