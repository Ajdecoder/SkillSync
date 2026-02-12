import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiGlobe,
  FiMail,
  FiPhone,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddOpportunityCard = ({ opportunity }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const handleConnectClick = () => {
    navigate(`/opportunity/connect/${opportunity._id}`, {
      state: { opportunity },
    });
  };

  const {
    title,
    desc_requirement,
    skills,
    company_website,
    email,
    ph_no,
    salaryRange,
    candidatesApplied,
    createdAt,
  } = opportunity;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      className="group relative flex flex-col h-full rounded-2xl p-6 
        bg-gradient-to-br from-gray-50 to-gray-100 
        dark:from-gray-900 dark:to-black 
        shadow-lg hover:shadow-xl border border-gray-200 dark:border-transparent overflow-hidden"
    >
      {/* Gradient Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative flex flex-col flex-1 space-y-4">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {title}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <FiGlobe className="text-cyan-600" />
            <a
              href={`http://${company_website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline"
            >
              {company_website}
            </a>
          </div>
        </motion.div>

        {/* Meta */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <FiUsers className="mx-auto text-emerald-600" />
            <p className="text-sm">{candidatesApplied?.length || 0}</p>
          </div>

          <div>
            <FaRupeeSign className="mx-auto text-emerald-600" />
            <p className="text-sm">
              {salaryRange?.minSalary
                ? `${(salaryRange.minSalary / 1000).toFixed(1)}k`
                : "-"}
              {salaryRange?.maxSalary &&
                ` - ${(salaryRange.maxSalary / 1000).toFixed(1)}k`}
            </p>
          </div>

          <div>
            <FiCalendar className="mx-auto text-emerald-600" />
            <p className="text-sm">
              {console.log(console.log(createdAt))}
              {new Date(createdAt).toDateString()}
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-400"
        >
          {desc_requirement
            ? `${desc_requirement.substring(0, 200)}...`
            : "No description provided"}
        </motion.p>

        {/* Skills */}
        {skills?.length > 0 && (
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full 
                  bg-emerald-500/20 text-emerald-700"
              >
                {skill.skillName}
              </span>
            ))}
          </motion.div>
        )}

        {/* Contact */}
        <motion.div
          variants={itemVariants}
          className="pt-4 border-t border-gray-300 space-y-2"
        >
          <div className="flex items-center gap-2">
            <FiMail className="text-cyan-600" />
            <a href={`mailto:${email}`} className="text-cyan-600">
              {email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FiPhone className="text-cyan-600" />
            <span>{ph_no}</span>
          </div>
        </motion.div>
      </div>

      {/* Button – always at bottom */}
      <motion.div variants={itemVariants} className="pt-6 mt-auto relative">
        <motion.button
          onClick={handleConnectClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3
            bg-gradient-to-r from-emerald-500 to-cyan-500 
            rounded-lg text-white font-semibold"
        >
          Connect Now <FiArrowRight />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AddOpportunityCard;
