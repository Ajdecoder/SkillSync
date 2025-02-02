import React, { useEffect, useState } from "react";
import { getAllCandidateProfiles } from "../../../services/api";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { useNavigate } from "react-router-dom";
import { experiences, locations, skills } from "../../data/Data";
import { motion } from "framer-motion";
import { FiArrowRight, FiBriefcase, FiMapPin, FiStar } from "react-icons/fi";

const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
const industries = ["Technology", "Finance", "Healthcare", "Education"];
const languages = ["English", "Spanish", "French", "German"];
const workEnvironments = ["Remote", "On-Site", "Hybrid"];


const TalentsCard = ({ bgColor = "#000000d6" }) => {
  const [talents, setTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    skills: "",
    experience: "",
    salary: { min: "", max: "" },
    jobType: "",
    industry: "",
    language: "",
    workEnvironment: "",
  });
  const [loading, setLoading] = useState(true); // Loading state to show spinner
  const navigate = useNavigate();

   useEffect(() => {
     const fetchCandidates = async () => {
       try {
         const { data } = await getAllCandidateProfiles();
         setTalents(data.candidates || []);
          setLoading(false);
       } catch (error) {
         console.error("Error fetching candidates:", error);
       }
     };
     fetchCandidates();
   }, []);
 
   // Experience formatting helper
   const formatExperience = (experience) => {
     if (!Array.isArray(experience) || experience.length === 0) return 'Fresher';
     const latestExperience = experience[0];
     return `${latestExperience.jobRole} (${latestExperience.duration})`;
   };
 
   // Skill display helper
   const renderSkill = (skill) => {
     if (typeof skill === 'object') return skill.skillName || skill.name || 'Unknown Skill';
     return skill;
   };
 
   // Click handler with validation
   const handleViewProfile = (id) => {
     if (!id) {
       console.error("Invalid candidate ID");
       return;
     }
     console.log("Navigating to candidate ID:", id);
     navigate(`/candidateinfo/${id}`);
   };
 
   // Animation variants
   const cardVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: { 
       opacity: 1, 
       y: 0,
       transition: { duration: 0.4, ease: "easeOut" }
     }
   };
 
   const staggerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.1 }
     }
   };
  useEffect(() => {
    setFilteredTalents(talents); // Update filtered talents when talents data is fetched
  }, [talents]);

  useEffect(() => {
    filterCandidates();
  }, [filters]);

  const filterCandidates = () => {
    let filtered = [...talents];

    // Apply filters to the talents array
    if (filters.location) {
      filtered = filtered.filter((candidate) => {
        const { city, state, country } = candidate.location;
        return (
          city.toLowerCase().includes(filters.location.toLowerCase()) ||
          state.toLowerCase().includes(filters.location.toLowerCase()) ||
          country.toLowerCase().includes(filters.location.toLowerCase())
        );
      });
    }

    if (filters.skills) {
      filtered = filtered.filter((candidate) =>
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    if (filters.experience) {
      filtered = filtered.filter((candidate) =>
        candidate.experience.some(
          (exp) =>
            exp.JobRole.toLowerCase().includes(
              filters.experience.toLowerCase()
            ) ||
            exp.company.toLowerCase().includes(filters.experience.toLowerCase())
        )
      );
    }

    if (filters.salary.min || filters.salary.max) {
      filtered = filtered.filter((candidate) => {
        const { min, max } = candidate.preferences.salaryRange;
        return (
          (!filters.salary.min || min >= parseInt(filters.salary.min)) &&
          (!filters.salary.max || max <= parseInt(filters.salary.max))
        );
      });
    }

    if (filters.jobType) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.preferences.jobType.toLowerCase() ===
          filters.jobType.toLowerCase()
      );
    }

    if (filters.industry) {
      filtered = filtered.filter((candidate) =>
        candidate.preferences.industry
          .toLowerCase()
          .includes(filters.industry.toLowerCase())
      );
    }

    if (filters.language) {
      filtered = filtered.filter((candidate) =>
        candidate.languages.some((lang) =>
          lang.language.toLowerCase().includes(filters.language.toLowerCase())
        )
      );
    }

    if (filters.workEnvironment) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.workEnvironment.toLowerCase() ===
          filters.workEnvironment.toLowerCase()
      );
    }

    setFilteredTalents(filtered);
  };

  if (loading) return <Spinner />; // Show loading spinner if data is still loading

  if (filteredTalents.length === 0)
    return <h1 className="text-center text-xl">No Talents Found</h1>;

  return (
    <div className="mx-auto p-4 max-w-7xl">
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
    >
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
                  e.target.src = '/default-profile.png';
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
                {candidate?.name || 'Anonymous Candidate'}
              </h3>
              
              {/* Experience & Location */}
              <div className="flex flex-wrap justify-center gap-2">
                <motion.div 
                  className="px-3 py-1 bg-emerald-400/10 rounded-full text-emerald-400 text-sm flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiBriefcase className="text-sm" />
                  <span>{formatExperience(candidate?.experience)}</span>
                </motion.div>
                <motion.div 
                  className="px-3 py-1 bg-cyan-400/10 rounded-full text-cyan-400 text-sm flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FiMapPin className="text-sm" />
                  <span>{candidate?.location?.city || 'Location not specified'}</span>
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
                {candidate?.about || 'No description available'}
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
