import React, { useEffect, useState } from "react";
import { PORT_CLIENT } from "../../../commonClient";
import { useNavigate } from "react-router-dom";
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
import { filterData } from "../../common/constants";
import { OpportunitiesFilter } from "../../common/Filters/OpportunitiesFilter";
import { LoginPromoPage } from "../../Login/NotLoggedIn";

export const SavedOpportunity = () => {
  const { loggedInUser, googleUser } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [filterCategory, setFilterCategory] = useState({
    selectedCity: "", // matches op.location
    selectedExpertType: "", // matches op.title
    selectedPriceRange: "", // format: "50000-60000"
    selectedRequirementType: "", // matches op.requirement_type
  });
  const [showFiltersOnsmall, setShowFiltersOnSmall] = useState(false);

  // console.log("Filter Category:", filterCategory);

  const navigate = useNavigate();
  const currentUser = loggedInUser || googleUser;
  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/addedOpportunities`
  );

  useEffect(() => {
    if (data?.Addedopportunities) {
      setOpportunities(data.Addedopportunities);
    }
  }, [data]);

  const filteredOpportunities = opportunities.filter((op) => {
    const matchesCity = filterCategory.selectedCity
      ? op.location
          .toLowerCase()
          .includes(filterCategory.selectedCity.toLowerCase())
      : true;

    const matchesExpertType = filterCategory.selectedExpertType
      ? op.title.toLowerCase() ===
        filterCategory.selectedExpertType.toLowerCase()
      : true;

    const matchesRequirementType = filterCategory.selectedRequirementType
      ? op.requirement_type.toLowerCase() ===
        filterCategory.selectedRequirementType.toLowerCase()
      : true;

    const matchesSalaryRange = filterCategory.selectedPriceRange
      ? (() => {
          const [min, max] = filterCategory.selectedPriceRange
            .split("-")
            .map((s) => parseInt(s.trim()));
          return (
            op.salaryRange?.minSalary >= min && op.salaryRange?.maxSalary <= max
          );
        })()
      : true;

    return (
      matchesCity &&
      matchesExpertType &&
      matchesRequirementType &&
      matchesSalaryRange
    );
  });

  console.log(filteredOpportunities);

  const handleConnectClick = (opportunity) => {
    navigate(`/opportunity/connect/${opportunity._id}`, {
      state: { opportunity },
    });
  };

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

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  if (!currentUser) return <LoginPromoPage />;

  return (
    <div className="p-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <OpportunitiesFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterData={filterData}
          showClearButton={true}
        />


        {filteredOpportunities.length === 0 ? (
          <div className=" text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              No Opportunities Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Please adjust your filters or check back later.
            </p>
          </div>
        ) : (
          filteredOpportunities.map((op, index) => {
            const websiteUrl = op.company_website.startsWith("http")
              ? op.company_website
              : `http://${op.company_website}`;

            if (filteredOpportunities.length === 0) {
              return (
                <div
                  key={index}
                  className="col-span-1 sm:col-span-2 lg:col-span-3 text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    No Opportunities Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Please adjust your filters or check back later.
                  </p>
                </div>
              );
            }

            return (
              <motion.div
                key={op._id}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-transparent"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                      {op.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FiGlobe className="text-cyan-600" />
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 hover:text-cyan-700"
                      >
                        {op.company_website}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    variants={itemVariants}
                  >
                    {[
                      {
                        icon: <FiUsers />,
                        value: op.candidatesApplied.length,
                      },
                      {
                        icon: <FiDollarSign />,
                        value: `${(op.salaryRange?.minSalary / 1000).toFixed(
                          1
                        )}k - ${(op.salaryRange?.maxSalary / 1000).toFixed(
                          1
                        )}k`,
                      },
                      {
                        icon: <FiCalendar />,
                        value: new Date(op.createdAt).toLocaleDateString(),
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex flex-col items-center gap-1"
                        variants={itemVariants}
                      >
                        <span className="text-emerald-600">{item.icon}</span>
                        <span className="text-gray-700 text-sm">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p className="text-gray-600" variants={itemVariants}>
                    {op.desc_requirement?.substring(0, 200) + "..."}
                  </motion.p>

                  {op.skills?.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={itemVariants}
                    >
                      {op.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-700 text-sm"
                        >
                          {skill.skillName}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  <motion.div
                    className="pt-4 border-t space-y-2"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2">
                      <FiMail className="text-cyan-600" />
                      <a
                        href={`mailto:${op.email}`}
                        className="text-cyan-600 hover:text-cyan-700"
                      >
                        {op.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-cyan-600" />
                      <span className="text-gray-700">{op.ph_no}</span>
                    </div>
                  </motion.div>

                  <motion.div className="pt-6" variants={itemVariants}>
                    <motion.button
                      onClick={() => handleConnectClick(op)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white hover:from-emerald-600 hover:to-cyan-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-semibold">Connect Now</span>
                      <motion.span animate={{ x: 0 }} whileHover={{ x: 5 }}>
                        <FiArrowRight />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
