import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SkillsChips from "./SkillsChips";
import LocationDropdown from "./Location";

export const CandidatesFilters = ({ candidates = [], data, setData, onClear }) => {


  // console.log('candiates log', candidates)
  console.log('data log', data)

  const locations = useMemo(() => {
    return [
      ...new Set(
        candidates
          .map(c =>
            c.location
              ? `${c.location.city}, ${c.location.state}, ${c.location.country}`
              : null
          )
          .filter(Boolean)
      ),
    ];
  }, [candidates]);

  // 🧠 Unique skills
  const skills = useMemo(() => {
    return [...new Set(
      candidates.flatMap(c => c.skills || [])
    )];
  }, [candidates]);

  const { overallMin, overallMax } = useMemo(() => {
    const salaries = candidates
      .map(c => c.expectedSalary)
      .filter(Boolean);

    return {
      overallMin: salaries.length ? Math.min(...salaries) : 0,
      overallMax: salaries.length ? Math.max(...salaries) : 100000,
    };
  }, [candidates]);


  const [selectedRange, setSelectedRange] = useState({
    min: overallMin,
    max: overallMax,
  });

  useEffect(() => {
    setSelectedRange({ min: overallMin, max: overallMax });
  }, [overallMin, overallMax]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setSelectedRange(prev => {
      const updated = { ...prev, min: Math.min(value, prev.max) };
      setData(p => ({ ...p, minSalary: updated.min }));
      return updated;
    });
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setSelectedRange(prev => {
      const updated = { ...prev, max: Math.max(value, prev.min) };
      setData(p => ({ ...p, maxSalary: updated.max }));
      return updated;
    });
  };


  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">

      {/* Location */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className="dark:text-gray-200">
          Location
        </label>
        <LocationDropdown
          allLocations={locations}
           onChange={(e) =>
            setData((p) => ({ ...p, location: e.target.value }))
          }
          selectedLocation={data.location}
        />
      </motion.div>

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className=" dark:text-gray-200">Skill</label>
        {/* {console.log('got skills here ', candidates.map((sk) => sk.skills))} */}
        <SkillsChips
          allSkills={skills}          // all available skills
          selectedSkills={data.skills} // selected bullets
          onChange={(updatedSkills) =>
            setData(prev => ({
              ...prev,
              skills: updatedSkills
            }))
          }
        />

      </motion.div>

      <div className="flex justify-evenly gap-5" >
        {/* Availability */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className=" dark:text-gray-200">Availability</label>
          <select
            value={data?.availability || ""}
            onChange={(e) => setData(p => ({ ...p, availability: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Any</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </motion.div>

        {/* Work Environment */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className=" dark:text-gray-200">Work Mode</label>
          <select
            value={data?.workEnvironment || ""}
            onChange={(e) => setData(p => ({ ...p, workEnvironment: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Any</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </motion.div>
      </div>

      {/* Salary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

        {/* Salary */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className=" dark:text-gray-200">Expected Salary (₹)</label>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
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
        </motion.div>

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
