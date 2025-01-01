import React from "react";

const AddOpportunityCard = ({ opportunity, onConnectClick }) => {
  const {
    title,
    desc_requirement,
    skills,
    company_name,
    company_website,
    email,
    ph_no,
    type: jobType,
    location,
    salaryRange,
    candidatesApplied,
    createdAt,
  } = opportunity;

  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden bg-black p-6 hover:shadow-2xl transition-all duration-300"
      data-aos="zoom-in-up"
    >
      <div className="p-4 space-y-2">
        {/* Job Title */}
        <h4 className="text-xl font-semibold text-gray-800">{title}</h4>

        {/* Company Name and Website */}
        <p className="text-sm text-gray-600">
          <strong>Company:</strong> {company_name}
        </p>
        <p className="text-sm text-blue-500">
          <strong>Website:</strong>{" "}
          <a
            href={`https://${company_website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company_website}
          </a>
        </p>

        {/* Job Type and Location */}
        <p className="text-sm text-gray-500">
          <strong>Type:</strong> {jobType}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Location:</strong> {location}
        </p>

        {/* Salary Range */}
        <p className="text-sm text-gray-500">
          <strong>Salary Range:</strong> {salaryRange}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600">
          <strong>Description:</strong>{" "}
          {desc_requirement
            ? desc_requirement.substring(0, 150) + "..."
            : "N/A"}
        </p>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <p className="text-sm text-gray-500">
            <strong>Skills:</strong> {skills.join(", ")}
          </p>
        )}

        {/* Candidates Applied */}
        <p className="text-sm text-gray-500">
          <strong>Candidates Applied:</strong> {candidatesApplied.length}
        </p>

        {/* Contact Info */}
        <p className="text-sm text-blue-500">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Phone:</strong> {ph_no}
        </p>

        {/* Post Date */}
        <p className="text-xs text-gray-400">
          <strong>Posted on:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Connect Button */}
      <div className="p-2 inline-block justify-center bg-green-500 rounded-md hover:bg-green-600 text-white">
        <button
          className="px-6 py-2 border border-transparent rounded-md transition duration-200"
          onClick={onConnectClick}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default AddOpportunityCard;
