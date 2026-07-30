import React, { useEffect, useState } from "react";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import { API } from "../../../services/api";

const RecentOpportunity = ({
  addedOpportunities = [],
  filterdOpportunities = [],
  opportunitiesLoading
}) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLimit(3);
    setPage(1);
  }, [page, limit])

  const fetchOpportunities = async (pageNo = 1) => {
    try {
      pageNo === 1 ? setLoading(true) : setLoadingMore(true);

      const { data } = await API.get(
        `/api/requirements/addedOpportunities?page=${pageNo}&limit=${limit}`
      );

      if (pageNo === 1) {
        setOpportunities(data.Addedopportunities);
      } else {
        setOpportunities((prev) => [
          ...prev,
          ...data.Addedopportunities,
        ]);
      }

      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchOpportunities(1);
  }, []);

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchOpportunities(page + 1);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-8 opportunity-card-container">
      {opportunities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4">
            {opportunities.map((opportunity) => (
              <AddOpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
              />
            ))}
          </div>

          {page < totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">
          No matching opportunities found.
        </div>
      )}
    </div>
  );
};

export default RecentOpportunity;