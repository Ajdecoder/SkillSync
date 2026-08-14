import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import AddOpportunityForm from "../../AddOpportunity/AddOpportunityForm";
import { LoginPromoPage } from "../../Login/NotLoggedIn";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import { API } from "../../../services/api";

const AddOpportunity = () => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  // ── Recent opportunities state ──
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // fixed limit (change to 3 if you prefer)

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

      if (pageNo === 1) {
        setOpportunities(data.Addedopportunities || []);
      } else {
        setOpportunities((prev) => [
          ...prev,
          ...(data.Addedopportunities || []),
        ]);
      }

      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch opportunities:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "recruiter") {
      fetchOpportunities(1);
    }
  }, [currentUser?.role]);

  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) {
      fetchOpportunities(page + 1);
    }
  };

  // ── Auth gate ──
  if (!currentUser || currentUser.role !== "recruiter") {
    return <LoginPromoPage />;
  }

  return (
    <div className="space-y-10">
      {/* Form to add new opportunity */}
      <AddOpportunityForm
        onSuccess={() => {
          // Optional: refresh list after successful submit
          fetchOpportunities(1);
        }}
      />

      {/* Recently added opportunities */}
      <section className="opportunity-card-container">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mx-4">
          Your Recent Opportunities
        </h2>

        {loading ? (
          <Spinner />
        ) : opportunities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 mx-4">
              {opportunities.map((opportunity) => (
                <AddOpportunityCard
                  key={opportunity?._id}
                  opportunity={opportunity}
                />
              ))}
            </div>

            {page < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-50 mb-4"
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
      </section>
    </div>
  );
};

export default AddOpportunity;