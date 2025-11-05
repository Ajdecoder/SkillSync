import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiBriefcase, FiMapPin, FiStar } from "react-icons/fi";
import { getAllCandidateProfiles } from "../../../services/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { filterData } from "../..//common/constants";
import { CandidatesFilters } from "../../common/Filters/TalentsFilter";

const TalentsCard = ({ bgColor }) => {
  const [talents, setTalents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredCandidates,setFilteredCandidates] = useState([]);

  const [programmers, setProgrammers] = useState([]);

  const [filterCategory, setFilterCategory] = useState({
    selectedCity: "",
    selectedExpertType: "",
    selectedPriceRange: "",
  });

  const applyFilters = () => {
    let filtered = talents;
  
    // Filter by City
    if (filterCategory.selectedCity) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.location?.city?.toLowerCase() ===
          filterCategory.selectedCity.toLowerCase()
      );
    }
  
    // Filter by Skills
    if (filterCategory.selectedExpertType) {
      filtered = filtered.filter((candidate) =>
        candidate.skills.includes(filterCategory.selectedExpertType)
      );
    }
  
    // Filter by Experience
    if (filterCategory.selectedPriceRange) {
      filtered = filtered.filter((candidate) => {
        if (filterCategory.selectedPriceRange === "fresher") {
          return candidate.experience === 0;
        } else if (filterCategory.selectedPriceRange === "mid") {
          return candidate.experience >= 1 && candidate.experience <= 3;
        } else {
          return candidate.experience > 3;
        }
      });
    }
  
    // Filter by Salary
    if (filterCategory.minSalary || filterCategory.maxSalary) {
      filtered = filtered.filter((candidate) => {
        const min = filterCategory.minSalary ? parseInt(filterCategory.minSalary) : 0;
        const max = filterCategory.maxSalary ? parseInt(filterCategory.maxSalary) : Infinity;
        
        const candidateMin = candidate.preferences?.salaryRange?.min || 0;
        const candidateMax = candidate.preferences?.salaryRange?.max || Infinity;
  
        return candidateMax >= min && candidateMin <= max;
      });
    }
  
    setFilteredCandidates(filtered);
  };
  
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await getAllCandidateProfiles();
        setTalents(data.candidates || []);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
  
    fetchCandidates();
  }, []);
  
  useEffect(() => {
    applyFilters(); // Run filtering only after talents are fetched
  }, [talents, filterCategory]); // Runs whenever talents or filters change
  

  // Experience formatting helper
  const formatExperience = (experience) => {
    if (!Array.isArray(experience) || experience.length === 0) return "Fresher";
    const latestExperience = experience[0];
    return `${latestExperience.jobRole} (${latestExperience.duration})`;
  };

  // Skill display helper
  const renderSkill = (skill) => {
    if (typeof skill === "object")
      return skill.skillName || skill.name || "Unknown Skill";
    return skill;
  };

  // Click handler with validation
  const handleViewProfile = (id) => {
    if (!id) {
      console.error("Invalid candidate ID");
      return;
    }
    navigate(`/candidateinfo/${id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="mx-auto p-4 max-w-7xl">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        {location.pathname !== "/" && (
          <CandidatesFilters
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterData={filterData}
            programmers={programmers}
            setProgrammers={setProgrammers}
          />
        )}
        {talents.map((candidate) => (
          <motion.div
            key={candidate?._id}
            variants={cardVariants}
            className="relative group"
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />

            {/* Card Content */}
            <div className="border border-gray-200/20 rounded-xl shadow-2xl overflow-hidden flex flex-col p-6 bg-gradient-to-br from-gray-900 to-gray-800 h-full">
              {/* Profile Image Section */}
              <motion.div
                className="relative mx-auto mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={candidate?.profilePicture}
                  alt={`${candidate?.name}'s profile`}
                  className="rounded-full w-28 h-28 object-cover border-4 border-emerald-400/20 hover:border-emerald-400/40 transition-all"
                  onError={(e) => {
                    e.target.src = "https://imgs.search.brave.com/pkPyTQFTOVFQw7Hki6hg6cgY5FPZ3UzkpUMsnfiuznQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/MS85MC9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zaW1wbGUtZmxh/dC12ZWN0b3ItNTcy/MzQxOTAuanBn"
                  }}
                />
                {candidate?.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1">
                    <FiStar className="text-white text-sm" />
                  </div>
                )}
              </motion.div>

              {/* Candidate Info */}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {candidate?.name || "Anonymous Candidate"}
                </h3>

                {/* Experience & Location */}
                <div className="flex flex-wrap self-center items-center flex-col gap-2">
                  <motion.div
                    className="px-3 py-1 bg-emerald-400/10 rounded-full text-emerald-400 text-sm flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiBriefcase className="text-sm" />
                    <span>{formatExperience(filteredCandidates?.experience)}</span>
                  </motion.div>
                  <motion.div
                    className="px-3 py-1 bg-cyan-400/10 rounded-full text-cyan-400 text-sm flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiMapPin className="text-sm" />
                    <span>{filteredCandidates?.location?.city || "NA"}</span>
                  </motion.div>
                </div>

                {/* Skills */}
                {candidate?.skills && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-2 py-1 bg-gray-700 rounded-md text-sm text-cyan-400"
                        whileHover={{ scale: 1.05 }}
                      >
                        {renderSkill(skill)}
                      </motion.span>
                    ))}
                  </div>
                )}

                <p className="text-gray-400 text-sm line-clamp-3">
                  {candidate?.about || "No description available"}
                </p>
              </div>

              {/* Fixed View Profile Button */}
              <motion.button
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 py-3 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition-all relative z-10"
                onClick={() => handleViewProfile(candidate?._id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-semibold">View Profile</span>
                <motion.span animate={{ x: 0 }} whileHover={{ x: 5 }}>
                  <FiArrowRight />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TalentsCard;
