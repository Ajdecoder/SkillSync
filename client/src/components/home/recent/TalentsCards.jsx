import React, { useEffect, useState } from "react";
import { getAllCandidateProfiles } from "../../../services/api";
import { Spinner } from "../../common/loadingSpinner/spinner";

const TalentsCard = ({ bgColor, onConnectClick }) => {
  const [talents, setTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    location: "",
    skills: "",
    experience: "",
    salary: { min: "", max: "" },
    jobType: "",
    industry: "",
    language: "",
    workEnvironment: "",
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await getAllCandidateProfiles();
        setTalents(data.candidates);
        setFilteredTalents(data.candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const filterCandidates = () => {
    let filtered = [...talents];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((candidate) => {
        const { city, state, country } = candidate.location;
        return (
          city.toLowerCase().includes(filters.location.toLowerCase()) ||
          state.toLowerCase().includes(filters.location.toLowerCase()) ||
          country.toLowerCase().includes(filters.location.toLowerCase())
        );
      });
    }

    // Filter by skills
    if (filters.skills) {
      filtered = filtered.filter((candidate) =>
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    // Filter by experience
    if (filters.experience) {
      filtered = filtered.filter((candidate) =>
        candidate.experience.some((exp) =>
          exp.JobRole.toLowerCase().includes(filters.experience.toLowerCase()) ||
          exp.company.toLowerCase().includes(filters.experience.toLowerCase())
        )
      );
    }

    // Filter by salary range
    if (filters.salary.min || filters.salary.max) {
      filtered = filtered.filter((candidate) => {
        const { min, max } = candidate.preferences.salaryRange;
        return (
          (!filters.salary.min || min >= parseInt(filters.salary.min)) &&
          (!filters.salary.max || max <= parseInt(filters.salary.max))
        );
      });
    }

    // Filter by job type
    if (filters.jobType) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.preferences.jobType.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // Filter by industry
    if (filters.industry) {
      filtered = filtered.filter((candidate) =>
        candidate.preferences.industry.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }

    // Filter by language
    if (filters.language) {
      filtered = filtered.filter((candidate) =>
        candidate.languages.some((lang) =>
          lang.language.toLowerCase().includes(filters.language.toLowerCase())
        )
      );
    }

    // Filter by work environment
    if (filters.workEnvironment) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.workEnvironment.toLowerCase() ===
          filters.workEnvironment.toLowerCase()
      );
    }

    setFilteredTalents(filtered);
  };

  useEffect(() => {
    filterCandidates();
  }, [filters]);

  if (!filteredTalents.length) return <Spinner />;

  return (
    <div className="mx-auto p-4">
      {/* Filter Inputs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={filters.location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, location: e.target.value }))
          }
          placeholder="Filter by location"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filters.skills}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, skills: e.target.value }))
          }
          placeholder="Filter by skills"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filters.experience}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, experience: e.target.value }))
          }
          placeholder="Filter by experience"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="number"
          value={filters.salary.min}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              salary: { ...prev.salary, min: e.target.value },
            }))
          }
          placeholder="Min salary"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="number"
          value={filters.salary.max}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              salary: { ...prev.salary, max: e.target.value },
            }))
          }
          placeholder="Max salary"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filters.jobType}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, jobType: e.target.value }))
          }
          placeholder="Filter by job type"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filters.industry}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, industry: e.target.value }))
          }
          placeholder="Filter by industry"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filters.language}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, language: e.target.value }))
          }
          placeholder="Filter by language"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filters.workEnvironment}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, workEnvironment: e.target.value }))
          }
          placeholder="Filter by work environment"
          className="border-2 bg-slate-400 text-black px-4 py-2 rounded-md"
        />
      </div>

      {/* Talent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalents.map((candidate) => (
          <div
            key={candidate._id.$oid}
            style={{ backgroundColor: bgColor }}
            className="border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col border-2 p-4"
          >
            <img
              src={candidate.profilePicture}
              alt={`${candidate.name}'s profile`}
              className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-center font-bold text-lg">{candidate.name}</h3>
            <p className="text-center text-sm">{candidate.about}</p>
            <button
              className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => onConnectClick(candidate._id.$oid)}
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentsCard;
