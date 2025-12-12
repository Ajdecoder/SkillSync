import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export const OpportunitiesFilter = ({ opportunities = [], data, setData }) => {
  const RequirementOptions = ["Full-Time", "Part-Time", "Internship", "Contract"];

  //  Extract unique city options
  const uniqueCities = useMemo(() => {
    if (!Array.isArray(opportunities)) return [];
    return [...new Set(opportunities.map((o) => o.location).filter(Boolean))];
  }, [opportunities]);

  //  Extract unique skill options (handles string or object type)
  const uniqueSkills = useMemo(() => {
    if (!Array.isArray(opportunities)) return [];
    return [
      ...new Set(
        opportunities.flatMap((o) => {
          if (!o.skills) return [];
          return o.skills.map((s) =>
            typeof s === "string" ? s : s.skillName
          );
        }).filter(Boolean)
      ),
    ];
  }, [opportunities]);

  //  Extract min and max salary dynamically
  const allSalaries = useMemo(() => {
    if (!Array.isArray(opportunities)) return [0, 0];
    const salaries = opportunities.flatMap((item) =>
      item.salaryRange
        ? [item.salaryRange.minSalary || 0, item.salaryRange.maxSalary || 0]
        : []
    );
    return salaries.length > 0 ? salaries : [0, 0];
  }, [opportunities]);

  const overallMin = Math.min(...allSalaries);
  const overallMax = Math.max(...allSalaries);

  const [selectedRange, setSelectedRange] = useState({
    min: overallMin,
    max: overallMax,
  });

  //  Reset salary range when data changes
  useEffect(() => {
    setSelectedRange({ min: overallMin, max: overallMax });
  }, [overallMin, overallMax]);

  //  Handlers for salary sliders
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= selectedRange.max) {
      setSelectedRange((prev) => ({ ...prev, min: value }));
      setData((prev) => ({ ...prev, minSalary: value }));
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= selectedRange.min) {
      setSelectedRange((prev) => ({ ...prev, max: value }));
      setData((prev) => ({ ...prev, maxSalary: value }));
    }
  };

  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
      {/* 🏙️ City Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          City / Region
        </label>
        <select
          value={data.location || ""}
          onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select City</option>
          {uniqueCities.length > 0 ? (
            uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          ) : (
            <option disabled>No cities available</option>
          )}
        </select>
      </motion.div>

      {/* 💡 Skills Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Skills
        </label>
        <select
          value={data.skills || ""}
          onChange={(e) => setData((prev) => ({ ...prev, skills: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Skill</option>
          {uniqueSkills.length > 0 ? (
            uniqueSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))
          ) : (
            <option disabled>No skills available</option>
          )}
        </select>
      </motion.div>

      {/* 💰 Salary Range */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Salary Range
        </label>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>₹{selectedRange.min}</span>
            <span>₹{selectedRange.max}</span>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={overallMin}
              max={overallMax}
              value={selectedRange.min}
              onChange={handleMinChange}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <input
              type="range"
              min={overallMin}
              max={overallMax}
              value={selectedRange.max}
              onChange={handleMaxChange}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </motion.div>

      {/* 🧾 Requirement Type */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Requirement Type
        </label>
        <select
          value={data.requirement_type || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, requirement_type: e.target.value }))
          }
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Requirement Type</option>
          {RequirementOptions.map((req) => (
            <option key={req} value={req}>
              {req}
            </option>
          ))}
        </select>
      </motion.div>
    </div>
  );
};
