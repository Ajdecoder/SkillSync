import React, { useState, useEffect, useMemo } from "react";
import Heading from "../../common/Heading"; // Use the updated Heading I gave you earlier!
// import "./hero.css"; // Bhai isko hata dena, ab hum pure Tailwind use kar rahe hain
import { useAuth } from "../../context/AuthContext";
import Recent from "../recent/Recent";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CandidatesFilters } from "../../common/Filters/TalentsFilter";
import { OpportunitiesFilter } from "../../common/Filters/OpportunitiesFilter";
import { FaSearch, FaUserTie, FaBriefcase, FaArrowRight } from "react-icons/fa";
import useFetchData from "../../hooks/useGetDataFetch";
import { PORT_CLIENT } from "../../../commonClient";
import {
  getAllCandidateProfiles,
  getOpportunities,
} from "../../../services/api";

const Hero = () => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const [opportunities, setOpportunities] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const candidateFilters = {
    skills: [],
    minSalary: "",
    maxSalary: "",
    availability: "",
    availabilityStatus: "",
    workEnvironment: "",
  };

  const recruiterFilters = {
    skills: [],
    minSalary: "",
    maxSalary: "",
    location: [],
    experience: "",
    jobType: "",
    workEnvironment: "",
  };

  const initialFilters =
    currentUser?.role === "candidate" ? candidateFilters : recruiterFilters;

  const [filterCategory, setFilterCategory] = useState(initialFilters);

  const handleClearFilters = (e) => {
    e.preventDefault();
    setFilterCategory(initialFilters);
    if (role === "recruiter" && candidatesData?.candidates) {
      setCandidates(candidatesData.candidates);
    }
    if (role === "candidate" && opportunitiesData?.Addedopportunities) {
      setOpportunities(opportunitiesData.Addedopportunities);
    }
  };

  const [isSearching, setIsSearching] = useState(false);
  let role = currentUser?.role;

  const opportunitiesUrl =
    role === "candidate"
      ? `${PORT_CLIENT}/api/requirements/addedOpportunities`
      : null;

  const candidatesUrl =
    role === "recruiter"
      ? `${PORT_CLIENT}/api/user/profile/candidates`
      : null;

  const {
    data: opportunitiesData,
    loading: opportunitiesLoading,
    error: opportunitiesError,
  } = useFetchData(opportunitiesUrl);
  const {
    data: candidatesData,
    loading: candidatesLoading,
    error: candidatesError,
  } = useFetchData(candidatesUrl);

  useEffect(() => {
    if (role === "recruiter" && candidatesData?.candidates) {
      setCandidates(candidatesData.candidates);
    }
    if (role === "candidate" && opportunitiesData?.Addedopportunities) {
      setOpportunities(opportunitiesData.Addedopportunities);
    }
  }, [role, candidatesData, opportunitiesData]);

  const filteredOpportunities = useMemo(() => {
    const { selectedCity, selectedExpertType, selectedPriceRange } =
      filterCategory;
    return opportunities.filter((opportunity) => {
      return (
        (selectedCity === "" ||
          !selectedCity ||
          opportunity?.address === selectedCity) &&
        (selectedExpertType === "" ||
          !selectedExpertType ||
          opportunity?.expertType === selectedExpertType) &&
        (selectedPriceRange === "" ||
          !selectedPriceRange ||
          opportunity?.priceRange === selectedPriceRange)
      );
    });
  }, [opportunities, filterCategory]);

  const filteredCandidates = useMemo(() => {
    const { location, skills, availabilityStatus } = filterCategory;
    console.log("Filtering candidates with:", { location, skills, availabilityStatus });
    return candidates.filter((candidate) => {
      const cityMatch =
        !location?.length ||
        candidate?.location?.city
          ?.toLowerCase()
          .includes(location[0]?.toLowerCase() || "");
      const skillMatch =
        !skills?.length ||
        skills.some((skill) =>
          candidate?.skills?.some(
            (cSkill) => cSkill.toLowerCase() === skill.toLowerCase(),
          ),
        );
      const availabilityMatch =
        !availabilityStatus ||
        candidate?.availabilityStatus === availabilityStatus;
      return cityMatch && skillMatch && availabilityMatch;
    });
  }, [candidates, filterCategory]);

  const handleSearch = (role) => {
    setIsSearching(true);
    const queryParams = {};
    if (filterCategory.skills && filterCategory.skills.length > 0) {
      if (role === "recruiter") {
        queryParams.skill = filterCategory.skills.join(",");
      } else {
        queryParams.skill = filterCategory.skills;
      }
    }
    console.log(filterCategory, "flksjdflk");
    if (filterCategory.location) queryParams.location = filterCategory.location;
    if (filterCategory.minSalary)
      queryParams.minSalary = filterCategory.minSalary;
    if (filterCategory.maxSalary)
      queryParams.maxSalary = filterCategory.maxSalary;
    if (filterCategory.requirement_type)
      queryParams.requirement_type = filterCategory.requirement_type;
    if (filterCategory.availability)
      queryParams.availabilityStatus = filterCategory.availability;
    if (filterCategory.workEnvironment)
      queryParams.requirement_type = filterCategory.workEnvironment;

    if (role === "candidate") {
      getOpportunities(queryParams)
        .then((res) => {
          setOpportunities(res.data.Addedopportunities || []);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error(err);
          setIsSearching(false);
        });
    } else if (role === "recruiter") {
      getAllCandidateProfiles(queryParams)
        .then((res) => {
          setCandidates(res.data.candidates || []);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error(err);
          setIsSearching(false);
        });
    }
  };

  // --- UI SECTION START ---
  return (
    <>
      {currentUser ? (
        // 1. LOGGED IN VIEW (Glassmorphism Style)
        <section className="relative flex justify-center items-center bg-gray-50 dark:bg-gray-900 py-20 w-full min-h-[600px] overflow-hidden">

          <div className="z-0 absolute inset-0">
            <img
              src="/images/banner.jpg" // Ensure this image is high quality
              alt="Background"
              className="opacity-20 dark:opacity-10 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
          </div>

          <div className="z-10 relative space-y-8 mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              {currentUser?.role === "recruiter" ? (
                <Heading
                  title="Discover Top Talent"
                  subtitle="Find the perfect candidates in your region with our advanced AI-driven search."
                  align="center"
                />
              ) : (
                <Heading
                  title="Find Your Dream Job"
                  subtitle="Explore new opportunities tailored to your skills and preferences."
                  align="center"
                />
              )}
            </motion.div>


            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 shadow-2xl backdrop-blur-lg mx-auto p-4 border border-white/20 dark:border-gray-700 rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <form className="space-y-6">
                {currentUser?.role === "recruiter" ? (
                  <CandidatesFilters
                    candidates={candidates || []}
                    data={filterCategory}
                    setData={setFilterCategory}
                    onClear={handleClearFilters}
                  />
                ) : (
                  <OpportunitiesFilter
                    opportunities={opportunities || []}
                    data={filterCategory}
                    setData={setFilterCategory}
                    onClear={handleClearFilters}
                  />
                )}

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mx-auto flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all ${isSearching ? "opacity-70 cursor-wait" : ""
                      }`}
                    type="button"
                    onClick={() => handleSearch(currentUser?.role)}
                    disabled={isSearching}>
                    {isSearching ? (
                      "Searching..."
                    ) : (
                      <>
                        <FaSearch /> Search Now
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      ) : (
        // 2. GUEST VIEW (Modern Landing Page Style)

        <>
          {/* Guest Hero */}
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-950">
            {/* Background */}
            <img
              src="/images/banner.jpg"
              alt="Search Your Way"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Light/Dark Mode Overlays */}

            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/90 dark:from-black/85 dark:via-black/60 dark:to-black/85" />

            {/* Decorative Blobs */}
            <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-green-400/20 blur-[120px] dark:bg-green-500/20" />

            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-[140px] dark:bg-indigo-500/20" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container relative z-10 mx-auto px-6"
            >
              <div className="mx-auto max-w-4xl text-center text-gray-900 dark:text-white">
                <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
                  Find Your Next

                  <span className="block text-green-600 dark:text-green-400">
                    Opportunity Faster
                  </span>
                </h1>

                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-700 dark:text-gray-200 md:text-xl">
                  Search thousands of verified jobs, discover exceptional talent, and
                  build meaningful professional connections through one modern platform.
                </p>

                <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center gap-3 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    <FaUserTie />

                    Start Searching
                  </Link>

                  <Link
                    to="/requirements/add-opportunity"
                    className="group inline-flex items-center justify-center gap-3 rounded-xl border border-gray-900/20 bg-white/50 px-8 py-4 font-semibold text-gray-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  >
                    <FaBriefcase />

                    Post a Job

                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
                  <div>
                    <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
                      10K+
                    </h3>

                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Professionals
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
                      2K+
                    </h3>

                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Active Jobs
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
                      500+
                    </h3>

                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Companies
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
                      95%
                    </h3>

                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Success Rate
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-900 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </section>
        </>

      )}


      <div className="bg-gray-50 dark:bg-gray-950">
        <Recent
          loading={opportunitiesLoading || candidatesLoading}
          opportunity={opportunities}
          filteredopportunity={filteredOpportunities}
          filterCategory={filterCategory}
          candidates={candidates}
          filteredcandidates={filteredCandidates}
          opportunitiesError={opportunitiesError}
          candidatesError={candidatesError}
        />
      </div>
    </>
  );
};

export default Hero;
