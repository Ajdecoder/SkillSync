import React, { useEffect, useState } from "react";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";
import { API } from "../../../services/api";

const OpportunitySkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="h-40 w-full rounded-lg bg-gray-200 mb-5" />

      <div className="h-5 w-3/4 rounded bg-gray-200 mb-3" />

      <div className="h-4 w-full rounded bg-gray-200 mb-2" />
      <div className="h-4 w-5/6 rounded bg-gray-200 mb-4" />

      <div className="flex gap-3 mb-4">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>

      <div className="h-10 w-full rounded-lg bg-gray-200" />
    </div>
  );
};

const RecentOpportunity = ({
  addedOpportunities = [],
  filterdOpportunities = [],
  opportunitiesLoading,
  isFilteringActive = false,
}) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOpportunities = async (pageNo = 1) => {
    try {
      if (pageNo === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const { data } = await API.get(
        `/api/requirements/addedOpportunities?page=${pageNo}&limit=${limit}`
      );

      const newOpportunities = data?.Addedopportunities || [];

      if (pageNo === 1) {
        setOpportunities(newOpportunities);
      } else {
        setOpportunities((prev) => [
          ...prev,
          ...newOpportunities,
        ]);
      }

      setPage(data?.page || pageNo);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchOpportunities(1);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || page >= totalPages) {
      return;
    }

    fetchOpportunities(page + 1);
  };

  // Initial loading skeleton only
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 mx-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <OpportunitySkeleton key={index} />
        ))}
      </div>
    );
  }

  /*
   * If filterdOpportunities has data,
   * display the filtered results.
   * Otherwise display normal paginated results.
   */
  const isFiltered = isFilteringActive;

  const showOpportunities = isFiltered
    ? filterdOpportunities
    : opportunities;

  return (
    <div className="space-y-8 opportunity-card-container">
      {showOpportunities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 mx-4">
            {showOpportunities.map((opportunity) => (
              <AddOpportunityCard
                key={opportunity?._id}
                opportunity={opportunity}
              />
            ))}
          </div>

          {/* Load More only when no filter is active */}
          {!isFiltered && page < totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-3 mb-4 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No opportunities available.
        </div>
      )}
    </div>
  );
};

export default RecentOpportunity;