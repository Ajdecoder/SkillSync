import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiGlobe, FiMail, FiPhone, FiDollarSign, FiUsers, FiCalendar } from "react-icons/fi";

const AddOpportunityCard = ({ opportunity, onConnectClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const {
    title,
    desc_requirement,
    skills,
    company_name,
    company_website,
    email,
    ph_no,
    requirement_type: jobType,
    location,
    salaryRange,
    candidatesApplied,
    createdAt,
  } = opportunity;

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative space-y-4">
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <FiGlobe className="text-cyan-400" />
            <a
              href={`http://${company_website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {company_website}
            </a>
          </div>
        </motion.div>

        {/* Metadata Grid */}
        <motion.div
  className="grid grid-cols-2 md:grid-cols-3 gap-4"
  variants={itemVariants}
  transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}
>
  <div className="flex flex-col items-center gap-2">
    <FiUsers className="text-emerald-400" />
    <span className="text-gray-300">{candidatesApplied.length}</span>
  </div>

  <div className="flex flex-col items-center gap-2">
    <FiDollarSign className="text-emerald-400" />
    <div className="flex items-center gap-1">
      <span className="text-gray-300">
        {(salaryRange?.minSalary / 1000).toFixed(1)}k
      </span>
      <span className="text-gray-300">-</span>
      <span className="text-gray-300">
        {(salaryRange?.maxSalary / 1000).toFixed(1)}k
      </span>
    </div>
  </div>

  <div className="flex flex-col items-center gap-2">
    <FiCalendar className="text-emerald-400" />
    <span className="text-gray-300">
      {new Date(createdAt).toLocaleDateString()}
    </span>
  </div>
</motion.div>


        {/* Description */}
        <motion.p 
          className="text-gray-400 leading-relaxed"
          variants={itemVariants}
        >
          {desc_requirement?.substring(0, 200) + "..." || "No description provided"}
        </motion.p>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={itemVariants}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {skill.skillName}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Contact Info */}
        <motion.div 
          className="pt-4 border-t border-gray-800 space-y-2"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <FiMail className="text-cyan-400" />
            <a href={`mailto:${email}`} className="text-cyan-400 hover:text-cyan-300">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="text-cyan-400" />
            <span className="text-gray-300">{ph_no}</span>
          </div>
        </motion.div>

        {/* Connect Button */}
        <motion.div 
          className="pt-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={onConnectClick}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold">Connect Now</span>
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="inline-block"
            >
              <FiArrowRight />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddOpportunityCard;