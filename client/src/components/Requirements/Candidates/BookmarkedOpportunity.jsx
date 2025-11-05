import React, { useState, useEffect } from "react";
import {
  getUserProfileByEmail,
  removeBookmarkedOpportunity,
} from "../../../services/api";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  FaBookmark,
  FaBriefcase,
  FaForward,
  FaLink,
  FaUser,
} from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiBeaker1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useGetDataFetch";
import { PORT_CLIENT } from "../../../commonClient";
import NotificationToasts from "../../common/Toast/Toast";
import { IoReturnUpForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Link as LucidLink } from "lucide-react";

export const BookmarkedOpportunity = () => {
  const [bookmarkedOpportunities, setBookmarkedOpportunities] = useState([]);
  const [toastState, setToastState] = useState({
    message: null,
    type: "success",
  });
  const { loggedInUser, googleUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const { data: opportunitiesData } = useFetchData(
    `${PORT_CLIENT}/api/requirements/addedOpportunities`
  );

  const currentUser = loggedInUser || googleUser;

  useEffect(() => {
    if (!currentUser?.email) return;

    const fetchBookmarkedOpportunities = async () => {
      try {
        const response = await getUserProfileByEmail(currentUser?.email);
        console.log(response);
        const bookmarks =
          response?.data?.candidateProfile?.OpportunityBookmarks || [];
        setBookmarkedOpportunities(bookmarks);

        const fetchedUserId = response?.data?.candidateProfile?._id;
        if (fetchedUserId) {
          setUserId(fetchedUserId);
        } else {
          console.error("User ID not found in the profile.");
        }
      } catch (error) {
        console.error("Error fetching bookmarked opportunities:", error);
        showToast("Failed to fetch bookmarked opportunities.", "error");
      }
    };

    fetchBookmarkedOpportunities();
  }, []);

  const showToast = (message, type) => setToastState({ message, type });

  const handleBookmarkClick = async (postId) => {
    if (!userId) {
      showToast("User ID is missing. Please try again.", "error");
      return;
    }

    // Optimistic update: Remove the opportunity from the UI immediately
    setBookmarkedOpportunities((prev) =>
      prev.filter((opportunity) => opportunity._id !== postId)
    );

    try {
      await removeBookmarkedOpportunity(userId, postId);
      showToast("Opportunity removed from bookmarks.", "success");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      showToast("Failed to remove bookmark.", "error");

      // Revert the UI update if the API call fails
      const response = await getUserProfileByEmail(currentUser?.email);
      const bookmarks =
        response?.data?.candidateProfile?.OpportunityBookmarks || [];
      setBookmarkedOpportunities(bookmarks);
    }
  };

  return (
    <div className="bookmark-opportunity p-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Saved Opportunities
      </motion.h2>

      {bookmarkedOpportunities.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-block p-6 bg-blue-50 rounded-full mb-4">
            <CiBeaker1 className="h-12 w-12 text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg">
            No bookmarked opportunities yet. Start exploring and save your
            favorites!
          </p>
          <Link
            className="bg-gray-700 p-4 mt-4 block w-60 m-auto rounded-lg hover:opacity-80"
            to="/requirements/browse-opportunities"
          >
            Explore Jobs
          </Link>
        </motion.div>
      ) : (
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {bookmarkedOpportunities.map((opportunity) => (
            <motion.li
              key={opportunity._id}
              className="group relative p-6 border border-gray-200 rounded-xl bg-white hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FaBriefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {opportunity.title || "Unknown Title"}
                    </h3>
                    {console.log(opportunity)}
                    <p className="text-gray-500 font-medium">
                      {opportunity.company_name || "Unknown Company"}
                    </p>
                  </div>

                  <Link
                    to={`/opportunity/connect/${opportunity._id}`}
                    className="absolute right-4 cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    <FaLink className="h-5 w-5" />
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaIndianRupeeSign className="h-5 w-5 text-purple-600" />
                    <span>
                      ₹{opportunity.salaryRange?.minSalary ?? "N/A"} - ₹
                      {opportunity.salaryRange?.maxSalary ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUser className="h-5 w-5 text-green-600" />
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills?.length > 0 ? (
                        opportunity.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {skill.skillName}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          No skills listed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <motion.button
                  className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookmarkClick(opportunity._id)}
                >
                  <FaBookmark className="h-5 w-5" /> Unbookmark
                </motion.button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {toastState.message && (
        <NotificationToasts
          message={toastState.message}
          type={toastState.type}
          autoClose={1500}
          position="top-left"
          theme="dark"
        />
      )}
    </div>
  );
};
