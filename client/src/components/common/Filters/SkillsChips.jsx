import { useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";

const MAX_VISIBLE = 10;

const SkillsMultiSelect = ({
  allSkills = [],
  selectedSkills = [],
  onChange,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // dropdown skills (exclude selected)
  const filteredSkills = useMemo(() => {
    return allSkills.filter(
      skill =>
        skill.toLowerCase().includes(search.toLowerCase()) &&
        !selectedSkills.includes(skill)
    );
  }, [search, allSkills, selectedSkills]);

  const addSkill = (skill) => {
    onChange([...selectedSkills, skill]);
    setSearch("");
  };

  const removeSkill = (skill) => {
    onChange(selectedSkills.filter(s => s !== skill));
  };

  // chip visibility logic
  const visibleSkills = showAll
    ? selectedSkills
    : selectedSkills.slice(0, MAX_VISIBLE);

  const remainingCount = selectedSkills.length - MAX_VISIBLE;

  return (
    <div className="relative">
      {/* INPUT */}
      <input
        type="text"
        placeholder="Search & select skills"
        value={search}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700
        bg-gray-50 dark:bg-gray-800 p-2.5"
      />

      {/* DROPDOWN */}
      {open && filteredSkills.length > 0 && (
        <div
          className="absolute z-20 w-full mt-1 max-h-48 overflow-auto
          rounded-lg border bg-white dark:bg-gray-900 shadow-md"
        >
          {filteredSkills.map(skill => (
            <div
              key={skill}
              onMouseDown={() => addSkill(skill)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {skill}
            </div>
          ))}
        </div>
      )}

      {/* SELECTED CHIPS */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 items-center">
          {visibleSkills.map(skill => (
            <span
              key={skill}
              className="flex items-center gap-1 px-3 py-1 rounded-full
              bg-blue-600 text-white text-sm"
            >
              {skill}
              <FaTimes
                className="cursor-pointer text-xs"
                onClick={() => removeSkill(skill)}
              />
            </span>
          ))}

          {/* +X more */}
          {remainingCount > 0 && !showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700
              text-gray-800 dark:text-gray-200 text-sm"
            >
              +{remainingCount} more
            </button>
          )}

          {/* Show less */}
          {showAll && selectedSkills.length > MAX_VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700
              text-gray-800 dark:text-gray-200 text-sm"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsMultiSelect;
