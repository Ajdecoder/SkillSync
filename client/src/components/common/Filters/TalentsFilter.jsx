import React from "react";
import { motion } from "framer-motion";

export const CandidatesFilters = ({
  filterCategory,
  setFilterCategory,
  filterData,
}) => {
  return (
    <div className="flex flex-col justify-center m-16">
      {/* City Filter */}
      <motion.div
        className="box inpbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <span>City/Region</span>
        <select
          value={filterCategory.selectedCity}
          onChange={(e) =>
            setFilterCategory((prev) => ({
              ...prev,
              selectedCity: e.target.value,
            }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Please choose City/Region</option>
          {[...new Set(filterData.map((item) => item.city))].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Expert Type Filter */}
      <motion.div
        className="box inpbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <span>Skills Type</span>
        <select
          value={filterCategory.selectedExpertType}
          onChange={(e) =>
            setFilterCategory((prev) => ({
              ...prev,
              selectedExpertType: e.target.value,
            }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Please choose Expert Type</option>
          {[...new Set(filterData.map((item) => item.expert))].map((expert) => (
            <option key={expert} value={expert}>
              {expert}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Price Range Filter */}
      <motion.div
        className="box inpbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <span>Price Range</span>
        <select
          value={filterCategory.selectedPriceRange}
          onChange={(e) =>
            setFilterCategory((prev) => ({
              ...prev,
              selectedPriceRange: e.target.value,
            }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Please choose expected salary</option>
          {[...new Set(filterData.map((item) => item.expected_salary))].map(
            (salary) => (
              <option key={salary} value={salary}>
                {salary}
              </option>
            )
          )}
        </select>
      </motion.div>
    </div>
  );
};
