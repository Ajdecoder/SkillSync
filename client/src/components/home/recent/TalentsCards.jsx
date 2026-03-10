import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TalentCard = ({ talent }) => {
  const navigate = useNavigate();

  if (!talent) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">Candidate data not available.</p>
      </div>
    );
  }

  const {
    _id,
    name = "Anonymous",
    profilePicture,
    isVerified = false,
    skills = [],
    about = "No description available",
    location,
    experience = 0,
  } = talent;

  // console.log('skills array here:',skills)

  const city = location?.city || "Not specified";
  const state = location?.state || "Not specified";
  const country = location?.country || "Not specified";

  console.log('i got city',city)
  console.log('i got state',state)
  console.log('i got country',country)

  const handleViewProfile = () => {
    if (!_id) return;
    navigate(`/candidateinfo/${_id}`);
  };

  const renderSkill = (skill) => {
    // console.log('got skills in renderskills',skill)
    if (typeof skill === "object" && skill !== null) {
      return skill.skillName || skill.name || "Unknown Skill";
    }
    return skill || "N/A";
  };

  const formatExperience = (exp) => {
    console.log('here is exp',exp)
    if (!exp || exp === 0) return "Fresher";
    if (exp <= 3) return `Mid Level${exp > 1 ? "s" : ""}`;
    return `Senior`;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="border border-gray-200/20 rounded-xl shadow-2xl overflow-hidden flex flex-col p-6 bg-gradient-to-br from-gray-900 to-gray-800 h-full"
    >
      {/* Profile Image */}
      <motion.div
        className="relative mx-auto mb-4"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="rounded-full w-28 h-28 object-cover border-4 border-emerald-400/20"
          onError={(e) => {
            e.target.src =
              "https://cdn.vectorstock.com/i/500p/41/90/avatar-default-user-profile-icon-simple-flat-vector-57234190.jpg";
          }}
        />

        {isVerified && (
          <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1">
            <FiStar className="text-white text-sm" />
          </div>
        )}
      </motion.div>

      {/* Info */}
      <div className="text-center space-y-4 flex-grow">
        <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          {name}
        </h3>

        <div className="flex flex-col items-center gap-2">
          <div className="px-3 py-1 bg-emerald-400/10 rounded-full text-emerald-400 text-sm flex items-center gap-1">
            <FiBriefcase />
            {formatExperience(experience)}
          </div>

          <div className="px-3 py-1 bg-cyan-400/10 rounded-full text-cyan-400 text-sm flex items-center gap-1">
            <FiMapPin />
            {city}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2">
          {skills.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-700 rounded-md text-sm text-cyan-400"
            >
              {renderSkill(skill)}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm line-clamp-3">
          {about}
        </p>
      </div>

      {/* Button */}
      <motion.button
        onClick={handleViewProfile}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 py-3 rounded-lg font-semibold"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        View Profile
        <FiArrowRight />
      </motion.button>
    </motion.div>
  );
};

export default TalentCard;
