import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SkillsMultiSelect from "./SkillsChips";

export const OpportunitiesFilter = ({
  opportunities = [],
  data,
  setData,
  onClear,
}) => {
  const RequirementOptions = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
  ];

  /* -------------------- Cities -------------------- */
  const uniqueCities = useMemo(() => {
    return [
      ...new Set(
        opportunities
          .map(o => o.location)
          .filter(Boolean)
      ),
    ];
  }, [opportunities]);

  /* -------------------- Skills -------------------- */
  const allSkills = useMemo(() => {
    return [
      ...new Set(
        opportunities.flatMap(o =>
          (o.skills || []).map(s =>
            typeof s === "string" ? s : s.skillName
          )
        )
      ),
    ];
  }, [opportunities]);

  /* -------------------- Salary -------------------- */
  const [overallMin, overallMax] = useMemo(() => {
    const values = opportunities.flatMap(o =>
      o.salaryRange
        ? [
          o.salaryRange.minSalary || 0,
          o.salaryRange.maxSalary || 0,
        ]
        : []
    );
    return values.length
      ? [Math.min(...values), Math.max(...values)]
      : [0, 0];
  }, [opportunities]);

  const [range, setRange] = useState({
    min: overallMin,
    max: overallMax,
  });

  useEffect(() => {
    setRange({ min: overallMin, max: overallMax });
  }, [overallMin, overallMax]);

  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">

      {/* City */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 block">
          City / Region
        </label>
        <select
          value={data.location || ""}
          onChange={e =>
            setData(prev => ({ ...prev, location: e.target.value }))
          }
          className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 p-2.5"
        >
          <option value="">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 block">
          Skills
        </label>

        <SkillsMultiSelect
          allSkills={allSkills}
          selectedSkills={data.skills || []}
          onChange={skills =>
            setData(prev => ({ ...prev, skills }))
          }
        />
      </motion.div>

      {/* Salary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Salary Range
        </label>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{range.min}</span>
          <span>₹{range.max}</span>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="range"
            min={overallMin}
            max={overallMax}
            value={range.min}
            onChange={e => {
              const val = Number(e.target.value);
              if (val <= range.max) {
                setRange(r => ({ ...r, min: val }));
                setData(p => ({ ...p, minSalary: val }));
              }
            }}
            className="w-full"
          />
          <input
            type="range"
            min={overallMin}
            max={overallMax}
            value={range.max}
            onChange={e => {
              const val = Number(e.target.value);
              if (val >= range.min) {
                setRange(r => ({ ...r, max: val }));
                setData(p => ({ ...p, maxSalary: val }));
              }
            }}
            className="w-full"
          />
        </div>
      </motion.div>

      {/* Requirement Type */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 block">
          Requirement Type
        </label>
        <select
          value={data.requirement_type || ""}
          onChange={e =>
            setData(prev => ({
              ...prev,
              requirement_type: e.target.value,
            }))
          }
          className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 p-2.5"
        >
          <option value="">Any</option>
          {RequirementOptions.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Clear Button */}
      <button
        type="button"
        onClick={onClear}
        className="mt-2 text-sm text-red-600 hover:underline self-end"
      >
        Clear filters
      </button>
    </div>
  );
};
