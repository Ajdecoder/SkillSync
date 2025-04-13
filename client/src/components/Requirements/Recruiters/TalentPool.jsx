import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCandidateProfiles } from "../../../services/api";
import { motion } from "framer-motion";

const TalentPool = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    skill: "",
    experience: "",
    city: "",
    state: "",
    country: "",
    minSalary: "",
    maxSalary: "",
    jobType: "",
    industry: "",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, candidates]);

  const fetchCandidates = async () => {
    try {
      const response = await getAllCandidateProfiles();
      setCandidates(response.data.candidates);
      setFilteredCandidates(response.data.candidates);
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  const applyFilters = () => {
    let filtered = candidates;

    if (filters.search) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(filters.search.toLowerCase())
          )
      );
    }

    if (filters.skill) {
      filtered = filtered.filter((candidate) =>
        candidate.skills.includes(filters.skill)
      );
    }

    if (filters.experience) {
      filtered = filtered.filter((candidate) =>
        filters.experience === "fresher"
          ? candidate.experience === 0
          : filters.experience === "mid"
          ? candidate.experience >= 1 && candidate.experience <= 3
          : candidate.experience > 3
      );
    }

    if (filters.city) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.location?.city?.toLowerCase() === filters.city.toLowerCase()
      );
    }
    if (filters.state) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.location?.state?.toLowerCase() === filters.state.toLowerCase()
      );
    }
    if (filters.country) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.location?.country?.toLowerCase() ===
          filters.country.toLowerCase()
      );
    }

    if (filters.minSalary || filters.maxSalary) {
      filtered = filtered.filter((candidate) => {
        const min = filters.minSalary ? parseInt(filters.minSalary) : 0;
        const max = filters.maxSalary ? parseInt(filters.maxSalary) : Infinity;

        const candidateMin = candidate.preferences.salaryRange?.min || 0;
        const candidateMax = candidate.preferences.salaryRange?.max || Infinity;

        return candidateMax >= min && candidateMin <= max;
      });
    }

    if (filters.jobType) {
      filtered = filtered.filter(
        (candidate) => candidate.preferences.jobType === filters.jobType
      );
    }

    if (filters.industry) {
      filtered = filtered.filter(
        (candidate) => candidate.preferences.industry === filters.industry
      );
    }

    setFilteredCandidates(filtered);
  };

  const handleInterest = (candidateId) => {
    toast.success("Interest Expressed!");
    console.log("Expressed Interest for:", candidateId);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Talent Pool</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or skill"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-800 dark:border-gray-600"
        />

        <select
          value={filters.skill}
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">All Skills</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>

        <select
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">Experience Level</option>
          <option value="fresher">Fresher</option>
          <option value="mid">1-3 Years</option>
          <option value="senior">3+ Years</option>
        </select>

        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Pune">Pune</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <motion.div
              key={candidate._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={candidate.profilePicture || '/default-avatar.png'}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    {candidate.name || "Candidate"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {candidate.role || "No Role Specified"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {candidate.experience?.length || 0} yrs exp
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {candidate.location?.city || 'Remote'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-300">Salary:</span>
                  <span className="font-medium text-green-700 dark:text-green-400">
                    ₹{candidate.preferences.salaryRange.min} - ₹{candidate.preferences.salaryRange.max}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-300">Job Type:</span>
                  <span className="font-medium text-purple-700 dark:text-purple-400">
                    {candidate.preferences.jobType}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                {candidate.socialLinks.linkedin && (
                  <a
                    href={candidate.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    LinkedIn
                  </a>
                )}
                {candidate.socialLinks.github && (
                  <a
                    href={candidate.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                  >
                    GitHub
                  </a>
                )}
                {candidate.socialLinks.portfolio && (
                  <a
                    href={candidate.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 dark:hover:text-green-400"
                  >
                    Portfolio
                  </a>
                )}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex-1 text-center transition-colors"
                  onClick={() => handleInterest(candidate._id)}
                >
                  Express Interest
                </motion.button>
                <button
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg flex-1 text-center transition-colors dark:border-gray-600 dark:text-gray-200"
                  onClick={() => navigate(`/candidateinfo/${candidate._id}`)}
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-300 text-lg mb-2">
              No candidates found matching your criteria
            </div>
            <button
              onClick={() => setFilters({
                search: "",
                skill: "",
                experience: "",
                city: "",
                state: "",
                country: "",
                minSalary: "",
                maxSalary: "",
                jobType: "",
                industry: "",
              })}
              className="text-blue-600 hover:text-blue-700 text-sm dark:hover:text-blue-400"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentPool;