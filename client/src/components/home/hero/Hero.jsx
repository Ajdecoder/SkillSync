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
import { getAllCandidateProfiles, getOpportunities } from "../../../services/api";

const Hero = () => {
  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const [opportunities, setOpportunities] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const initialFilters = {
    skills: [],
    minSalary: "",
    maxSalary: "",
    availability: "",
    workEnvironment: "",
    city: ""
  };

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
      ? `${PORT_CLIENT}/api/user/profile/account/users/user/candidates`
      : null;

  const { data: opportunitiesData, loading: opportunitiesLoading, error: opportunitiesError } = useFetchData(opportunitiesUrl);
  const { data: candidatesData, loading: candidatesLoading, error: candidatesError } = useFetchData(candidatesUrl);

  useEffect(() => {
    if (role === "recruiter" && candidatesData?.candidates) {
      setCandidates(candidatesData.candidates);
    }
    if (role === "candidate" && opportunitiesData?.Addedopportunities) {
      setOpportunities(opportunitiesData.Addedopportunities);
    }
  }, [role, candidatesData, opportunitiesData]);

  const filteredOpportunities = useMemo(() => {
    const { selectedCity, selectedExpertType, selectedPriceRange } = filterCategory;
    return opportunities.filter((opportunity) => {
      return (
        (selectedCity === "" || !selectedCity || opportunity?.address === selectedCity) &&
        (selectedExpertType === "" || !selectedExpertType || opportunity?.expertType === selectedExpertType) &&
        (selectedPriceRange === "" || !selectedPriceRange || opportunity?.priceRange === selectedPriceRange)
      );
    });
  }, [opportunities, filterCategory]);

  const filteredCandidates = useMemo(() => {
    const { location, skills, availabilityStatus } = filterCategory;
    return candidates.filter((candidate) => {
      const cityMatch = !location || candidate?.location?.city?.toLowerCase().includes(location.toLowerCase());
      const skillMatch = !skills?.length || skills.some((skill) => candidate?.skills?.some((cSkill) => cSkill.toLowerCase() === skill.toLowerCase()));
      const availabilityMatch = !availabilityStatus || candidate?.availabilityStatus === availabilityStatus;
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
    console.log(filterCategory, 'flksjdflk')
    if (filterCategory.location) queryParams.location = filterCategory.location;
    if (filterCategory.minSalary) queryParams.minSalary = filterCategory.minSalary;
    if (filterCategory.maxSalary) queryParams.maxSalary = filterCategory.maxSalary;
    if (filterCategory.requirement_type) queryParams.requirement_type = filterCategory.requirement_type;

    if (role === "candidate") {
      getOpportunities(queryParams,)
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
        <section className="relative w-full min-h-[600px] flex items-center justify-center py-20 overflow-hidden bg-gray-50 dark:bg-gray-900">

          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/banner.jpg" // Ensure this image is high quality
              alt="Background"
              className="w-full h-full object-cover opacity-20 dark:opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900"></div>
          </div>

          <div className="relative z-10 max-w-5xl px-4 mx-auto text-center space-y-8 w-[70%]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {currentUser.role === "recruiter" ? (
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

            {/* Glassmorphism Filter Container */}
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700 p-8 rounded-2xl shadow-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
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
                    disabled={isSearching}
                  >
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
        <section className="relative w-full py-24 lg:py-32 bg-gray-900 overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[100px]"></div>
            <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-600/20 blur-[120px]"></div>
          </div>

          <motion.div
            className="relative z-10 container mx-auto px-4 text-center space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 tracking-tight">
                Search Your Way
              </h1>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Whether you're looking to hire top talent or find your next job, we connect you with the right opportunities using smart technology.
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Link
                to="/login"
                className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaUserTie className="text-purple-600" /> Start Searching
                </span>
                <div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>

              <Link
                to="/requirements/add-opportunity"
                className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-600 text-white font-medium rounded-full hover:border-purple-500 hover:text-purple-400 transition-all"
              >
                <FaBriefcase /> Post a Job
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Recent Section - Just ensuring props pass correctly */}
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