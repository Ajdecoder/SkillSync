import React, { useState, useEffect } from "react";
import {
  getUserProfileByEmail,
  removeBookmarkedOpportunity,
} from "../../../services/api";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaBookmark, FaBriefcase, FaLink, FaUser } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiBeaker1 } from "react-icons/ci";
import NotificationToasts from "../../chatbot/Toast/Toast";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useGetDataFetch";
import { PORT_CLIENT } from "../../../commonClient";

export const CandidatesBookmark = () => {
  const [bookmarkedTalents, setBookmarkedTalents] = useState([]);
  const [toastState, setToastState] = useState({
    message: null,
    type: "success",
  });
  const { loggedInUser } = useAuth();
  const [opportunities, setOpportunities] = useState([]);

  console.log(opportunities);

  const navigate = useNavigate();

  const {
    data: opportunitiesData,
    error: opportunitiesError,
    loading: opportunitiesLoading,
  } = useFetchData(`${PORT_CLIENT}/api/requirements/addedOpportunities`);

  useEffect(() => {
    if (opportunitiesData?.Addedopportunities) {
      setOpportunities(opportunitiesData.Addedopportunities);
    }
  }, [opportunitiesData]);
  

  useEffect(() => {
      if (opportunitiesData?.Addedopportunities) {
        setOpportunities(opportunitiesData.Addedopportunities);
      }
    }, [opportunitiesData]);

  useEffect(() => {
    if (opportunitiesData?.Addedopportunities) {
      setOpportunities(opportunitiesData.Addedopportunities);
    }
  }, [opportunitiesData]);

  useEffect(() => {
    if (!loggedInUser?.email) return;

    const fetchBookmarkedTalents = async () => {
      try {
        const response = await getUserProfileByEmail(loggedInUser.email);
        const bookmarks =
          response?.data?.candidateProfile?.OpportunityBookmarks || [];
        setBookmarkedTalents(bookmarks);
      } catch (error) {
        console.error("Error fetching bookmarked talents:", error);
      }
    };

    fetchBookmarkedTalents();
  }, [loggedInUser?.email]);

  const showToast = (message, type) => {
    setToastState({ message, type });
  };

  const handleBookmarkClick = async (userId, post_id) => {
    try {
      await removeBookmarkedOpportunity(userId, post_id);
      setBookmarkedTalents((prev) =>
        prev.filter((talent) => talent.post_id !== post_id)
      );
      showToast("Opportunity removed from bookmarks.", "success");
    } catch (error) {
      showToast("Failed to remove bookmark.", "error");
    }
  };

  const handleViewOpportunity = (opportunities,  index) => {
    console.log("found index", index);
    const post_id = opportunities[index]?._id;
    const foundOpportunity = opportunities.find((o) => o._id === post_id);
  
    if (!foundOpportunity) {
      showToast("Error: Opportunity not found!", "error");
      return;
    }
  
    navigate(`/opportunity/connect/${foundOpportunity._id}`, {
      state: { item: foundOpportunity },
    });
  };
  


  return (
    <div className="bookmark-talent p-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Saved Opportunities
      </motion.h2>

      {bookmarkedTalents.length === 0 ? (
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
          {bookmarkedTalents.map((talent) => (
            <motion.li
              key={talent._id}
              className="group relative p-6 border border-gray-200 rounded-xl bg-white hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
            
            {
              opportunities.map((oppotunity ) => {
                
              })
            }

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FaBriefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {talent.title || "Unknown Title"}
                    </h3>
                    <p className="text-gray-500 font-medium">
                      {talent.company_name || "Unknown Company"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaIndianRupeeSign className="h-5 w-5 text-purple-600" />
                    <span>
                      ₹{talent.salaryRange?.min ?? "N/A"} - ₹
                      {talent.salaryRange?.max ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUser className="h-5 w-5 text-green-600" />
                    <div className="flex flex-wrap gap-2">
                      {talent.skills?.length > 0 ? (
                        talent.skills.map((skill, index) => (
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
                  onClick={() =>
                    handleBookmarkClick(loggedInUser._id, talent.post_id)
                  }
                >
                  <FaBookmark className="h-5 w-5" />
                  Unbookmark
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
