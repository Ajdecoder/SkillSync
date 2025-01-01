import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PORT_CLIENT } from "../../commonClient";
import useFetchData from "../hooks/useGetDataFetch.jsx";

const OpportunityConnectPage = () => {
  const [error, setError] = useState(null);

  const { post_id } = useParams();
  const { data: companyData, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/Companyrequirements/${post_id}`
  );

  if (!post_id) return setError("Invalid post ID.");

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!companyData) {
    return <div className="text-gray-600">Loading...</div>;
  }

  const {
    company_name,
    skills = [],
    location,
    desc_requirement,
    type,
    salaryRange,
    email,
    ph_no,
    title,
    createdAt,
    company_website,
  } = companyData;

  // Helper function to render skills properly
  const renderSkills = () => {
    if (!skills || skills.length === 0) return "No skills available";
    return skills
      .map((skill) => skill.skillName || "Unnamed Skill") // Fallback for missing 'name' property
      .join(", ");
  };

  return (
    <div className="p-8 md:p-20 bg-black min-h-screen flex items-center justify-center">
      <div className="p-6 w-[66rem] max-w-4xl mx-auto bg-black shadow-lg rounded-lg border-2 border-gray-300 hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          {company_name}
        </h2>
        <div className="text-lg text-gray-700 mb-4">
          <strong>Position:</strong> {title}
        </div>
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <i className="fa fa-location-dot text-gray-500"></i>
          <span>{location}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{desc_requirement}</p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Details
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Job Type:</strong> {type}
            </p>
            <p>
              <strong>Skills:</strong> {renderSkills()}
            </p>
            <p>
              <strong>Salary Range:</strong> {salaryRange}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Info
          </h3>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {ph_no}
          </p>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Opportunity Posting Date
          </h3>
          <p>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-blue-500 mt-6">
          <strong>Website:</strong>{" "}
          <a
            href={`http://${company_website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-700"
          >
            {company_website}
          </a>
        </p>
      </div>
    </div>
  );
};

export default OpportunityConnectPage;
