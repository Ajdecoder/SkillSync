import { useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";

const LocationDropdown = ({
  allLocations = [],
  selectedLocations = [],
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">


      {/* INPUT */}

      <input
        type="text"
        placeholder="Search & select locations"
        value={selectedLocations}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md dark:bg-gray-800"
      />

      {/* DROPDOWN */}
      {open && allLocations.length > 0 && (
        <div className="absolute z-20 w-full mt-1 max-h-48 overflow-auto border rounded-md bg-white dark:bg-gray-900 shadow">
          {allLocations.map((location) => (
            <div
              key={location}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {location}
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default LocationDropdown;