import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { PORT_CLIENT } from "../../../commonClient";
import { useNavigate } from "react-router-dom";

const RecentCard = () => {
  const { loggedInUser } = useAuth();
  const [talents, setTalents] = useState([]); // changed from requirements to talents
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${PORT_CLIENT}/api/requirements/allRequirements`,
          { withCredentials: true }
        );
        const {
          data: { talents },
        } = response;
        setTalents(talents || []);
      } catch (error) {
        console.error("API Error:", error.message);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  console.log("talents in db",talents)

  const handleConnectClick = (talent, index) => {
    const post_id = talents[index]._id;
    

    // Navigate to the connect page with talent details
    navigate(`talent/connect/${post_id}`, { state: { talent } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {talents.map((talent, index) => {
        const {
          contactInfo: { email, phone },
          jobType,
          skills,
          availability,
          requirements,
          jobDescription,
          compensation,
          status,
          createdAt,
          company_name, // Assuming 'company_name' is available in 'talents'
        } = talent;

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
                <h4 className="text-xl font-semibold text-gray-800">{company_name}</h4>

                {/* Skills */}
                <p className="text-sm text-gray-600">
                  <i className="fa fa-location-dot mr-2"></i>
                  {skills.join(", ")}
                </p>

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
                <p className="text-sm text-blue-500">
                  Contact Email: {email}
                </p>
                <p className="text-sm text-gray-500">Phone: {phone}</p>
              </div>

              {/* Connect Button */}
              <div className="p-2 inline-block justify-center bg-green-500 rounded-md hover:bg-green-600 text-white">
                <button
                  className="px-6 py-2 border border-transparent rounded-md transition duration-200"
                  onClick={() => handleConnectClick(talent, index)}
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

export default RecentCard;
