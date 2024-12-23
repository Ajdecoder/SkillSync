import React, { useEffect, useState } from "react";
import { PORT_CLIENT } from "../../commonClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const SavedOpportunity = () => {
  const { loggedInUser } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${PORT_CLIENT}/api/requirements/addedOpportunites`,
          { withCredentials: true }
        );
        const {
          data: { Addedopportunities },
        } = response;
        setOpportunities(Addedopportunities || []);
        console.log("Fetched Opportunities:", Addedopportunities);
      } catch (error) {
        console.error("API Error:", error.message);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConnectClick = (opportunity) => {
    const post_id = opportunity._id;
    navigate(`/opportunity/connect/${post_id}`, { state: { opportunity } });
  };

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>{error}</div>;
  if (opportunities.length === 0) return <div>No opportunities found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {opportunities.map((opportunity, index) => {
        const {
          _id,
          title,
          desc_requirement,
          skills,
          company_name,
          company_website,
          email,
          ph_no,
          type,
          location,
          salaryRange,
          createdAt,
        } = opportunity;

        return (
          loggedInUser && (
            <div
              key={_id}
              className="shadow-lg rounded-lg overflow-hidden bg-white p-6 hover:shadow-2xl transition-all duration-300"
              data-aos={index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
            >
              <div className="p-4 space-y-2">
                {/* Title */}
                <h4 className="text-xl font-semibold text-gray-800">{title || "Untitled Opportunity"}</h4>

                {/* Company Info */}
                <p className="text-sm text-gray-600">
                  <i className="fa fa-building mr-2"></i>
                  {company_name} - <a href={`https://${company_website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{company_website}</a>
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500">{desc_requirement || "No description provided"}</p>

                {/* Skills */}
                <p className="text-sm text-gray-500">
                  <strong>Skills:</strong> {skills.length > 0 ? skills.join(", ") : "N/A"}
                </p>

                {/* Job Type */}
                <p className="text-sm text-gray-500">
                  <strong>Type:</strong> {type}
                </p>

                {/* Location */}
                <p className="text-sm text-gray-500">
                  <strong>Location:</strong> {location}
                </p>

                {/* Salary Range */}
                <p className="text-sm text-gray-500">
                  <strong>Salary:</strong> {salaryRange || "Not disclosed"}
                </p>

                {/* Contact Info */}
                <p className="text-sm text-blue-500">Email: {email}</p>
                <p className="text-sm text-gray-500">Phone: {ph_no}</p>

                {/* Date */}
                <p className="text-xs text-gray-400">
                  Posted on: {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Connect Button */}
              <div className="p-2 inline-block justify-center bg-green-500 rounded-md hover:bg-green-600 text-white">
                <button
                  className="px-6 py-2 border border-transparent rounded-md transition duration-200"
                  onClick={() => handleConnectClick(opportunity)}
                >
                  Connect
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
