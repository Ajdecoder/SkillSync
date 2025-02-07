import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCandidateProfiles } from "../../../services/api";

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
  }, [filters, candidates]); // Apply filters when filters or candidate data changes

  const fetchCandidates = async () => {
    try {
      const response = await getAllCandidateProfiles();
      console.log(response);
      setCandidates(response.data.candidates);
      setFilteredCandidates(response.data.candidates); // Initialize with full data
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  const applyFilters = () => {
    let filtered = candidates;
  
    // Filter by search (name or skills)
    if (filters.search) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(filters.search.toLowerCase())
          )
      );
    }
  
    // Filter by skill
    if (filters.skill) {
      filtered = filtered.filter((candidate) =>
        candidate.skills.includes(filters.skill)
      );
    }
  
    // Filter by experience (ensure correct property name)
    if (filters.experience) {
      filtered = filtered.filter((candidate) =>
        filters.experience === "fresher"
          ? candidate.experience === 0
          : filters.experience === "mid"
          ? candidate.experience >= 1 && candidate.experience <= 3
          : candidate.experience > 3
      );
    }
  
    // Filter by location (city, state, country)
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
  
    // Filter by salary range
    if (filters.minSalary || filters.maxSalary) {
      filtered = filtered.filter((candidate) => {
        const min = filters.minSalary ? parseInt(filters.minSalary) : 0;
        const max = filters.maxSalary ? parseInt(filters.maxSalary) : Infinity;
  
        const candidateMin = candidate.preferences.salaryRange?.min || 0;
        const candidateMax = candidate.preferences.salaryRange?.max || Infinity;
  
        return candidateMax >= min && candidateMin <= max;
      });
    }
  
    // Filter by job type
    if (filters.jobType) {
      filtered = filtered.filter(
        (candidate) => candidate.preferences.jobType === filters.jobType
      );
    }
  
    // Filter by industry
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Talent Pool</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or skill"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={filters.skill}
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Skill</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>
        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Experience</option>
          <option value="fresher">Fresher</option>
          <option value="mid">1-3 Years</option>
          <option value="senior">3+ Years</option>
        </select>

        {/*Filter by location*/}
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select By City</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Pune">Pune</option>
        </select>
        {/*Filter by location*/}
        <select
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select By State</option>
          <option value="Mumbai">Maharashtra</option>
          <option value="Delhi">Delhi</option>
          <option value="Pune">Pune</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
        {/*Filter by location*/}
        <select
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select By Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>

      {/* Candidate List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="p-4 shadow-lg rounded-xl border"
            >
              <div className="flex items-center gap-4">
                <img
                  src={candidate.profilePicture}
                  alt={candidate.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-bold">{candidate.name || "Candidate"}</h2>
                  <p className="text-sm text-gray-600">
                    {candidate.role || "No Role"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {candidate.experience.length} years experience
                  </p>
                  <p className="text-xs text-gray-500">
                    {candidate.location.city}, {candidate.location.state},{" "}
                    {candidate.location.country}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-200 px-2 py-1 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Salary & Job Preferences */}
              <div className="mt-2 text-xs text-gray-700">
                <p>Job Type: {candidate.preferences.jobType}</p>
                <p>Industry: {candidate.preferences.industry}</p>
                <p>
                  Expected Salary: ₹{candidate.preferences.salaryRange.min} - ₹
                  {candidate.preferences.salaryRange.max}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-2 flex gap-2 text-sm">
                {candidate.socialLinks.linkedin && (
                  <a
                    href={candidate.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    LinkedIn
                  </a>
                )}
                {candidate.socialLinks.github && (
                  <a
                    href={candidate.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600"
                  >
                    GitHub
                  </a>
                )}
                {candidate.socialLinks.portfolio && (
                  <a
                    href={candidate.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600"
                  >
                    Portfolio
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleInterest(candidate._id)}
                >
                  Express Interest
                </button>
                <button
                  className="border px-4 py-2 rounded"
                  onClick={() => navigate(`/candidateinfo/${candidate._id}`)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No candidates match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default TalentPool;
