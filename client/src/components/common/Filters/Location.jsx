import { useState, useMemo, useEffect, useRef } from "react";

const LocationDropdown = ({
  allLocations = [],
  selectedLocation = {},
  onChange,
}) => {
  const [openField, setOpenField] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenField("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const normalizedLocations = useMemo(() => {
    return allLocations
      .map((item) => {
        if (item?.city && item?.state && item?.country) {
          return {
            city: item.city,
            state: item.state,
            country: item.country,
          };
        }

        if (
          item?.location?.city &&
          item?.location?.state &&
          item?.location?.country
        ) {
          return {
            city: item.location.city,
            state: item.location.state,
            country: item.location.country,
          };
        }

        if (typeof item === "string") {
          const [city, state, country] = item
            .split(",")
            .map((v) => v.trim());

          if (city && state && country) {
            return { city, state, country };
          }
        }

        return null;
      })
      .filter(Boolean);
  }, [allLocations]);

  const countries = useMemo(() => {
    return [
      ...new Set(
        normalizedLocations
          .map((loc) => loc.country)
          .filter(Boolean)
      ),
    ];
  }, [normalizedLocations]);

  const states = useMemo(() => {
    return [
      ...new Set(
        normalizedLocations
          .filter((loc) =>
            selectedLocation.country
              ? loc.country === selectedLocation.country
              : true
          )
          .map((loc) => loc.state)
          .filter(Boolean)
      ),
    ];
  }, [normalizedLocations, selectedLocation.country]);

  const cities = useMemo(() => {
    return [
      ...new Set(
        normalizedLocations
          .filter((loc) => {
            const matchesCountry = selectedLocation.country
              ? loc.country === selectedLocation.country
              : true;

            const matchesState = selectedLocation.state
              ? loc.state === selectedLocation.state
              : true;

            return matchesCountry && matchesState;
          })
          .map((loc) => loc.city)
          .filter(Boolean)
      ),
    ];
  }, [
    normalizedLocations,
    selectedLocation.country,
    selectedLocation.state,
  ]);

  const handleInputChange = (field, value) => {
    const updatedLocation = {
      ...(selectedLocation || {}),
      [field]: value,
    };

    if (field === "country") {
      updatedLocation.state = "";
      updatedLocation.city = "";
    }

    if (field === "state") {
      updatedLocation.city = "";
    }

    onChange(updatedLocation);
  };

  const handleSelect = (field, value) => {
    handleInputChange(field, value);
    setOpenField("");
  };

  const renderDropdown = (field, options) => {
    if (openField !== field) return null;

    return (
      <div className="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-auto border rounded-md bg-white dark:bg-gray-900 shadow">
        {options.length > 0 ? (
          options.map((option) => (
            <div
              key={option}
              onMouseDown={() => handleSelect(field, option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {option}
            </div>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">
            No options found
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="flex gap-3">
      <div className="relative w-full ">
        <input
          type="text"
          placeholder="select city"
          value={selectedLocation?.city || ""}
          onFocus={() => setOpenField("city")}
          onChange={(e) => handleInputChange("city", e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />

        {renderDropdown("city", cities)}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="select state"
          value={selectedLocation?.state || ""}
          onFocus={() => setOpenField("state")}
          onChange={(e) => handleInputChange("state", e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />

        {renderDropdown("state", states)}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="select country"
          value={selectedLocation?.country || ""}
          onFocus={() => setOpenField("country")}
          onChange={(e) => handleInputChange("country", e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />

        {renderDropdown("country", countries)}
      </div>
    </div>
  );
};

export default LocationDropdown;