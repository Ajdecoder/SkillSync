import { useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";

const LocationDropdown = ({
  allLocations = [],
  selectedLocations = [],
  onChange,
}) => {

  console.log('all location in lf', allLocations)
  console.log('all location in sl', selectedLocations)

  const selectedCity = selectedLocations.map((s) => s.city)
  const selectedState = selectedLocations.map((s) => s.state)
  const selectedCountry = selectedLocations.map((s) => s.country)
  console.log('sc',selectedCity)
  console.log('ss',selectedState)
  console.log('sco',selectedCountry)

  const [open, setOpen] = useState(false);

  const groupedLocations = useMemo(() => {
    const map = {};

    allLocations.forEach((loc) => {
      const [city, state, country] = loc.split(",");

      if (!map[country]) map[country] = {};
      if (!map[country][state]) map[country][state] = [];

      map[country][state].push(city);
    });

    return map;
  }, [allLocations]);

  return (
    <div className="relative">


      {/* INPUT */}
      <div className="flex gap-3" >

        <input
          type="text"
          placeholder="select city"
          value={selectedCity}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="select state"
          value={selectedState}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="select country"
          value={selectedCountry}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
      </div>
      
      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-20 w-[1/2] mt-1 max-h-60 overflow-auto border rounded-md bg-white dark:bg-gray-900 shadow">

          {Object.entries(groupedLocations).map(([country, states]) => (
            <div key={country} className="border-b">

              {Object.entries(states).map(([states, cities, countries],idx) => (
                <div key={idx}>

                  {/* STATE */}
                  {/* <div className="px-4 py-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {states}
                  </div> */}

                  {/* CITIES */}
                  {cities.map((city) => (
                    <div
                      key={`${city}`}
                      onClick={() =>
                        onChange({ city })
                      }
                      className="px-6 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {city}
                    </div>
                  ))}
                  
                </div>
              ))}
            </div>
          ))}

        </div>
      )}
      
    </div>
  );
};

export default LocationDropdown;