import React, { useState, useEffect, useMemo } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useAuth } from "../../context/AuthContext";
import Recent from "../recent/Recent";
import { filterData } from "../../common/constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CandidatesFilters } from "../../common/Filters/TalentsFilter";
import { OpportunitiesFilter } from "../../common/Filters/OpportunitiesFilter";
import { FaSearch, FaUserTie, FaBriefcase } from "react-icons/fa";
import useFetchData from "../../hooks/useGetDataFetch";
import { PORT_CLIENT } from "../../../commonClient";
import { Spinner } from "../../common/loadingSpinner/spinner";

const Hero = () => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const [opportunities, setOpportunities] = useState([]);
  const [filterCategory, setFilterCategory] = useState({
    selectedCity: "",
    selectedExpertType: "",
    selectedPriceRange: "",
  });
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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

  const filteredOpportunities = useMemo(() => {
    const { selectedCity, selectedExpertType, selectedPriceRange } =
      filterCategory;
    return opportunities.filter((opportunity) => {
      return (
        (selectedCity === "" || opportunity?.address === selectedCity) &&
        (selectedExpertType === "" ||
          opportunity?.expertType === selectedExpertType) &&
        (selectedPriceRange === "" ||
          opportunity?.priceRange === selectedPriceRange)
      );
    });
  }, [opportunities, filterCategory]);

  const handleClick = () => {
    setIsSearching(true);
    setTimeout(() => {
      console.log("filterCategory", filterCategory);
      setIsSearching(false);
    }, 1000);
  };

  if (currentUser && opportunitiesLoading) return <Spinner />;

  return (
    <>
      {currentUser ? (
        <section className="hero dark:bg-gray-900">
          <div className="hero-image">
            <img
              className="opacity-[0.0] dark:opacity-0"
              src="/images/banner.jpg"
              alt="Hero"
            />
          </div>
          <div className="hero-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Heading
                title="Search Your Way"
                subtitle="Find new & featured opportunity located in your local city."
              />
            </motion.div>

            <motion.form
              className="hero-form m-auto mt-6 mb-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-lg shadow-lg max-w-3xl border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {currentUser?.role === "recruiter" ? (
                <CandidatesFilters
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterData={filterData}
                  setError={setError}
                  opportunity={opportunities}
                  setopportunity={setOpportunities}
                />
              ) : (
                <OpportunitiesFilter
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterData={filterData}
                  showClearButton={false}
                />
              )}

              <motion.button
                className={`flex items-center justify-center gap-2 w-2/4 m-auto py-3 px-4 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white font-medium rounded-lg shadow-md transition-colors duration-300 ${
                  isSearching ? "opacity-70 cursor-not-allowed" : ""
                }`}
                type="button"
                onClick={handleClick}
                disabled={isSearching}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {isSearching ? (
                  "Searching..."
                ) : (
                  <>
                    <FaSearch className="inline " /> Search
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </section>
      ) : (
        <section className="hero-LoginPromoPage bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-800 text-white py-16">
          <motion.div
            className="hero-container mx-auto max-w-4xl text-center space-y-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Heading
              title="Search Your Way"
              subtitle="Whether you're looking to hire top talent or find your next job, we have the right tools to connect you with opportunities."
            />
            <p className="text-lg md:text-xl font-light text-white/90 dark:text-white/80">
              Discover skilled professionals or explore job opportunities that
              align with your expertise. Start your journey today!
            </p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <Link
                to="/requirements/search"
                className="flex items-center justify-center gap-2 bg-white text-indigo-600 hover:text-purple-600 dark:hover:text-purple-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaUserTie /> Start Your Search
              </Link>
              <Link
                to="/requirements/add-opportunity"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 dark:hover:text-indigo-700 transition-all duration-300"
              >
                <FaBriefcase /> Post a Job
              </Link>
            </motion.div>
          </motion.div>
        </section>
      )}
      <Recent
        opportunity={opportunities}
        filteredopportunity={filteredOpportunities}
        filterCategory={filterCategory}
      />
    </>
  );
};

export default Hero;