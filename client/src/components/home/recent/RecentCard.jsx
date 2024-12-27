import React from "react";
import { useAuth } from "../../context/AuthContext";
import { PORT_CLIENT } from "../../../commonClient";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useGetDataFetch.jsx";

const RecentCard = () => {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  // Use the custom hook to fetch data
  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/allRequirements`
  );

  // Destructure talents and addedOpportunities from fetched data
  const talents = data?.talents || [];
  const addedOpportunities = data?.Addedopportunities || [];

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleConnectClick = (item, index, type) => {
    const post_id =
      type === "talent" ? talents[index]._id : addedOpportunities[index]._id;

    // Navigate to the connect page with item details
    navigate(`${type}/connect/${post_id}`, { state: { item } });
  };

  const renderTalentCard = (item, index, type) => {
    const {
      contactInfo: { email, phone } = {},
      jobType,
      skills,
      availability,
      requirements,
      jobDescription,
      compensation,
      status,
      createdAt,
      company_name,
    } = item;

    return (
      loggedInUser && (
        <div
          key={index}
          className="shadow-lg rounded-lg overflow-hidden bg-white p-6 hover:shadow-2xl transition-all duration-300"
          data-aos={index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
        >
          {/* Job Status */}
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  status === "Open"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {status === "Open" ? "Pending" : "Approved"}
              </span>
            </div>

            {/* Company Name */}
            <h4 className="text-xl font-semibold text-gray-800">
              {company_name}
            </h4>

            {/* Skills */}
            {skills && (
              <p className="text-sm text-gray-600">
                <i className="fa fa-location-dot mr-2"></i>
                {skills.join(", ")}
              </p>
            )}

            {/* Requirements */}
            <p className="text-sm text-gray-500">{requirements}</p>

            {/* Job Description */}
            <p className="text-sm text-gray-500">{jobDescription}</p>

            {/* Compensation */}
            <p className="text-sm text-gray-500">{compensation}</p>

            {/* Availability and Post Date */}
            <p className="text-xs text-gray-400">
              Availability: {availability}
            </p>
            <p className="text-xs text-gray-400">
              Posted on: {new Date(createdAt).toLocaleDateString()}
            </p>

            {/* Contact Info */}
            {email && (
              <p className="text-sm text-blue-500">Contact Email: {email}</p>
            )}
            {phone && <p className="text-sm text-gray-500">Phone: {phone}</p>}
          </div>

          {/* Connect Button */}
          <div className="p-2 inline-block justify-center bg-green-500 rounded-md hover:bg-green-600 text-white">
            <button
              className="px-6 py-2 border border-transparent rounded-md transition duration-200"
              onClick={() => handleConnectClick(item, index, type)}
            >
              Connect
            </button>
          </div>
        </div>
      )
    );
  };

  const renderOpportunityCard = (item, index, type) => {
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
    } = item;

    return (
      loggedInUser && (
        <div
          key={index}
          className="shadow-lg rounded-lg overflow-hidden bg-white p-6 hover:shadow-2xl transition-all duration-300"
          data-aos={index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
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
              <strong>Posted on:</strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Connect Button */}
          <div className="p-2 inline-block justify-center bg-green-500 rounded-md hover:bg-green-600 text-white">
            <button
              className="px-6 py-2 border border-transparent rounded-md transition duration-200"
              onClick={() => handleConnectClick(item, index, type)}
            >
              Connect
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Talents Section */}
      {talents.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent, index) =>
              renderTalentCard(talent, index, "talent")
            )}
          </div>
        </div>
      )}

      {/* Added Opportunities Section */}
      {addedOpportunities.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addedOpportunities.map((opportunity, index) =>
              renderOpportunityCard(opportunity, index, "opportunity")
            )}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {talents.length === 0 && addedOpportunities.length === 0 && (
        <div className="text-center text-gray-500">
          No recent posts or opportunities available.
        </div>
      )}
    </div>
  );
};

export default RecentCard;
