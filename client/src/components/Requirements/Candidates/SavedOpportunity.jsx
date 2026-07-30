import React, { useEffect, useState } from "react";
import { PORT_CLIENT } from "../../../commonClient";
import useFetchData from "../../hooks/useGetDataFetch";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard";
import { Spinner } from "../../common/loadingSpinner/spinner";

export const SavedOpportunity = ({ filterdOpportunities = [] }) => {
  const INITIAL_LIMIT = 6;
  const LOAD_MORE_COUNT = 3;

  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [loadingMore, setLoadingMore] = useState(false);
  const [opportunities, setOpportunities] = useState([]);

  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/addedOpportunities?limit=${limit}`
  );

  useEffect(() => {
    if (!data?.Addedopportunities) return;

    setOpportunities(data.Addedopportunities);
    setLoadingMore(false);
  }, [data]);

  const opportunitiesToShow =
    filterdOpportunities.length > 0
      ? filterdOpportunities
      : opportunities;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setLimit((prev) => prev + LOAD_MORE_COUNT);
  };

  if (loading && opportunities.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading opportunities.
      </div>
    );
  }

  return (
    <div className="space-y-10 m-6 opportunity-card-container">
      {opportunitiesToShow.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {opportunitiesToShow.map((opportunity) => (
              <AddOpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
              />
            ))}
          </div>

          {opportunitiesToShow.length < data?.totalCount && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            No Opportunities Found
          </h2>
          <p className="text-gray-500 mt-2">
            Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};