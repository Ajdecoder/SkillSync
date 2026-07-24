import React, { useState } from "react";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";

const RecentOpportunity = ({
  addedOpportunities = [],
  filterdOpportunities = [],
  opportunitiesLoading
}) => {

  const [loadMore, setLoadMore] = useState(false)

  const handleLoadMore = () => {
    setLoadMore(true)
  }

   if (opportunitiesLoading) {
      return <Spinner />
    }

  const normalizedAdded = Array.isArray(addedOpportunities)
    ? addedOpportunities
    : [];
  const normalizedFiltered = Array.isArray(filterdOpportunities)
    ? filterdOpportunities
    : [];

  const opportunitiesToShow =
    normalizedFiltered.length > 0
      ? normalizedFiltered
      : normalizedAdded;

  return (
    <div className="space-y-8 opportunity-card-container">
      {opportunitiesToShow.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4">
          {opportunitiesToShow.map((opportunity) =>
            <AddOpportunityCard
              key={opportunity._id}
              opportunity={opportunity}
            />
          )}
          <div className="flex justify-center mt-6">
            {loadMore ? (
              <Spinner />
            ) : (
              <button
                onClick={handleLoadMore}
                className="gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white font-semibold"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No opportunities available.
        </div>
      )}
    </div>
  );
};

export default RecentOpportunity;
