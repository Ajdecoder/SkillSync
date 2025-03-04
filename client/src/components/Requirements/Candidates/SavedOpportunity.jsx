import React, { useEffect, useState } from "react";
import { PORT_CLIENT } from "../../../commonClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import useFetchData from "../../hooks/useGetDataFetch";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiGlobe,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { filterData } from "../../data/Data";
import { OpportunitiesFilter } from "../../common/Filters/OpportunitiesFilter";

export const SavedOpportunity = () => {
  const { loggedInUser } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  const [programmers, setProgrammers] = useState([]);

  const [filterCategory, setFilterCategory] = useState({
    selectedCity: "",
    selectedExpertType: "",
    selectedPriceRange: "",
  });

  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/addedOpportunities`
  );

  if (loading) {
    <Spinner />;
  }

  useEffect(() => {
    if (data?.Addedopportunities) {
      setOpportunities(data.Addedopportunities);
    }
  }, [data]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!loggedInUser) {
    return (
      <div className="text-center text-gray-500">
        Please log in to view saved opportunities
      </div>
    );
  }

  const handleConnectClick = (opportunity) => {
    const post_id = opportunity._id;
    navigate(`/opportunity/connect/${post_id}`, { state: { opportunity } });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  if(!opportunities){
    return <Spinner/>
  }

  return (
    <div>
      {opportunities ? (
        <OpportunitiesFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterData={filterData}
          programmers={programmers}
          setProgrammers={setProgrammers}
        />
      ) : (
        <Spinner />
      )}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {opportunities.map((opportunity, index) => {
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

          // Fix website URL formatting
          const websiteUrl = company_website.startsWith("http")
            ? company_website
            : `http://${company_website}`;

          return (
            <motion.div
              key={opportunity._id}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
            >
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
                      href={websiteUrl}
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
                  transition={{ staggerChildren: 0.1 }}
                >
                  {[
                    { icon: <FiUsers />, value: candidatesApplied.length },
                    {
                      icon: <FiDollarSign />,
                      value: (
                        <span>
                          {salaryRange?.minSalary && (
                            <span>
                              {(salaryRange?.minSalary / 1000).toFixed(1)}k -{" "}
                            </span>
                          )}
                          {salaryRange?.maxSalary && (
                            <span>
                              {(salaryRange?.maxSalary / 1000).toFixed(1)}k
                            </span>
                          )}
                        </span>
                      ),
                    },
                    {
                      icon: <FiCalendar />,
                      value: new Date(createdAt).toLocaleDateString(),
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex flex-col items-center gap-1"
                      variants={itemVariants}
                    >
                      <span className="text-emerald-400">{item.icon}</span>
                      <span className="text-gray-300 text-sm">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-gray-400 leading-relaxed"
                  variants={itemVariants}
                >
                  {desc_requirement?.substring(0, 200) + "..." ||
                    "No description provided"}
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
                        variants={itemVariants}
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
                    <a
                      href={`mailto:${email}`}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      {email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-cyan-400" />
                    <span className="text-gray-300">{ph_no}</span>
                  </div>
                </motion.div>

                {/* Connect Button */}
                <motion.div className="pt-6" variants={itemVariants}>
                  <motion.button
                    onClick={() => handleConnectClick(opportunity)}
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
        })}
      </div>
    </div>
  );
};
