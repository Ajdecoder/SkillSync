import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SkillsChips from "./SkillsChips";
import LocationDropdown from "./Location";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white ";

const cardClass =
  "rounded-2xl border border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/60";

const Field = ({ label, hint, children }) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-2">
      <label className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {label}
      </label>
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </div>
    {children}
  </div>
);

export const CandidatesFilters = ({
  candidates = [],
  data = {},
  setData,
  onClear,
}) => {
  const locations = useMemo(() => {
    const unique = new Map();

    candidates.forEach(({ location }) => {
      if (!location?.city || !location?.state || !location?.country) return;

      const key = `${location.city}-${location.state}-${location.country}`;
      unique.set(key, location);
    });

    return [...unique.values()];
  }, [candidates]);

  const skills = useMemo(
    () => [...new Set(candidates.flatMap((c) => c.skills || []).filter(Boolean))],
    [candidates]
  );

  const { overallMin, overallMax } = useMemo(() => {
    const salaries = candidates
      .map((c) => Number(c.expectedSalary))
      .filter(Number.isFinite);

    return {
      overallMin: salaries.length ? Math.min(...salaries) : 0,
      overallMax: salaries.length ? Math.max(...salaries) : 100000,
    };
  }, [candidates]);

  const [range, setRange] = useState({
    min: overallMin,
    max: overallMax,
  });

  useEffect(() => {
    setRange({
      min: data.minSalary ?? overallMin,
      max: data.maxSalary ?? overallMax,
    });
  }, [overallMin, overallMax, data.minSalary, data.maxSalary]);

  const updateFilter = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSalary = (key, value) => {
    setRange((prev) => {
      const updated = {
        ...prev,
        [key]: key === "min" ? Math.min(value, prev.max) : Math.max(value, prev.min),
      };

      setData((p) => ({
        ...p,
        minSalary: updated.min,
        maxSalary: updated.max,
      }));

      return updated;
    });
  };

  const formatSalary = (value) =>
    new Intl.NumberFormat("en-IN").format(value || 0);

  const activeFilters = [
    data.location?.city || data.location?.state || data.location?.country,
    data.skills?.length,
    data.availability,
    data.workEnvironment,
    data.minSalary || data.maxSalary,
  ].filter(Boolean).length;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
        <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-950 dark:text-white">
              Candidate Filters
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Refine candidates by role-fit criteria.
            </p>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
            {activeFilters} active
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[`${candidates.length} candidates`, `${skills.length} skills`, `${locations.length} locations`].map(
            (item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <div className="space-y-6 p-3">
        <Field label="Location" hint="City / State / Country">
          <div className={cardClass}>
            <LocationDropdown
              allLocations={locations}
              selectedLocation={data.location || {}}
              onChange={(location) => updateFilter("location", location)}
            />
          </div>
        </Field>

        <Field label="Skills" hint={`${data.skills?.length || 0} selected`}>
          <div className={cardClass}>
            <SkillsChips
              allSkills={skills}
              selectedSkills={data.skills || []}
              onChange={(skills) => updateFilter("skills", skills)}
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Availability">
            <select
              value={data.availability || ""}
              onChange={(e) => updateFilter("availability", e.target.value)}
              className={inputClass}
            >
              <option value="">Any availability</option>
              <option value="Open">Open to work</option>
              <option value="Closed">Not available</option>
            </select>
          </Field>

          <Field label="Work Mode">
            <select
              value={data.workEnvironment || ""}
              onChange={(e) => updateFilter("workEnvironment", e.target.value)}
              className={inputClass}
            >
              <option value="">Any work mode</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </Field>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
          <Field
            label="Expected Salary"
            hint={`Up to ₹${formatSalary(range.max)}`}
          >
            <input
              type="range"
              min={overallMin}
              max={overallMax}
              value={range.max}
              onChange={(e) => updateSalary("max", Number(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300"
          >
            Clear filters
          </button>
        </div>
      </div>
    </motion.aside>
  );
};