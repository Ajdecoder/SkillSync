import React, { useEffect, useState } from "react";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import TalentsCard from "./TalentsCards.jsx";
import { API } from "../../../services/api";

const RecentTalentCard = ({
  addedTalents = [],
  filterdTalents = [],
  TalentsLoading,
  isFilteringActive = false,
}) => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    setLimit(3);
    setPage(1);
  }, [page, limit])

  const [totalPages, setTotalPages] = useState(1);

  const fetchTalents = async (pageNo = 1) => {
    try {
      pageNo === 1 ? setLoading(true) : setLoadingMore(true);

      const { data } = await API.get(
        `/api/user/profile/candidates/?page=${pageNo}&limit=${limit}`
      );

      if (pageNo === 1) {
        setTalents(data.candidates);
      } else {
        setTalents((prev) => [...prev, ...data.candidates]);
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
    fetchTalents(1);
  }, []);

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchTalents(page + 1);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const isFiltered = isFilteringActive;

  const showTalents = isFiltered
    ? filterdTalents
    : talents;

  return (
    <div className="space-y-8 talent-card-container">
      {showTalents?.length > 0 ? (
        <div className="mx-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {showTalents.map((talent) => (
              <TalentsCard
                key={talent._id}
                talent={talent}
              />
            ))}
          </div>

          {!isFiltered && page < totalPages && (
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
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No matching talents found.
        </div>
      )}
    </div>
  );
};

export default RecentTalentCard;