import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PORT_CLIENT } from "../../commonClient";

const ConnectPage = () => {
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);

  const { post_id } = useParams();

  useEffect(() => {
    if (!post_id) {
      setError("Invalid post ID.");
      return;
    }

    const fetchCompanyRequirements = async () => {
      try {
        const response = await axios.get(
          `${PORT_CLIENT}/api/requirements/Companyrequirements/${post_id}`
        );

        if (response.data) {
          setCompanyData(response.data);
        } else {
          setError("No data found for the provided ID.");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("Failed to load company data.");
      }
    };

    fetchCompanyRequirements();
  }, [post_id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!companyData) {
    return <div className="text-gray-600">Loading...</div>;
  }

  const {
    jobType,
    skills,
    availability,
    requirements,
    jobDescription,
    compensation,
    contactInfo,
    status,
    createdAt,
    updatedAt,
    company_name,
    company_website,
    available_expert,
    desc_requirement,
    address,
  } = companyData;

  return (
    <div className="p-8 md:p-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border-2 border-gray-300 hover:scale-105 transition-all duration-300">
        {/* Company Name */}
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          {company_name}
        </h2>

        {/* Available Expert */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <i className="fa fa-location-dot text-gray-500"></i>
          {skills && skills.length > 0 ? (
            <span>{skills.join(", ")}</span>
          ) : (
            <span>No experts available</span>
          )}
        </div>

        {/* Address */}
        <p className="text-sm text-gray-500 mb-4">{address}</p>

        {/* Description Requirement */}
        <p className="text-sm text-gray-500 mb-4">{desc_requirement}</p>

        {/* Job Details Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Details
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-gray-800">Job Type:</strong> {jobType}
            </p>
            <p>
              <strong className="text-gray-800">Skills:</strong>{" "}
              {skills.join(", ")}
            </p>
            <p>
              <strong className="text-gray-800">Availability:</strong>{" "}
              {availability}
            </p>
            <p>
              <strong className="text-gray-800">Requirements:</strong>{" "}
              {requirements}
            </p>
            <p>
              <strong className="text-gray-800">Job Description:</strong>{" "}
              {jobDescription}
            </p>
            <p>
              <strong className="text-gray-800">
                Compensation & Benefits:
              </strong>{" "}
              {compensation}
            </p>
            <p>
              <strong
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  status === "Open"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
               
                {status === "Open" ? "Pending" : "Approved"}
              </strong>
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Info
          </h3>
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {contactInfo.phone}
          </p>
        </div>

        {/* Timestamps Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Timestamps
          </h3>
          <p>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Company Website */}
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

export default ConnectPage;
