import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import { PORT_CLIENT } from "../../../commonClient";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const RecentCard = () => {
  const { loggedInUser } = useAuth();
  const [requirements, setRequirements] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to another page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${PORT_CLIENT}/api/requirements/allData`,
          { withCredentials: true }
        );
        const {
          data: { data: requirementsData },
        } = response;
        setRequirements(requirementsData || []);
      } catch (error) {
        console.error("API Error:", error.message);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleConnectClick = (company, index) => {
    // Navigate to the new page, passing company data as state

    const post_id = requirements[index]._id;
    console.log("requirements Index", requirements[index]._id);
    console.log("requirements", requirements);

    // console.log("requirements Index",index)
    navigate(`/connect/${post_id}`, { state: { company } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {requirements.map((card, index) => {
        const {
          company_name,
          company_website,
          available_expert,
          from,
          to,
          desc_requirement,
          address,
          cover_Img,
          Status,
        } = card;

        return (
          loggedInUser && (
            <div
              key={index}
              className="shadow-lg rounded-lg overflow-hidden bg-white p-6"
              data-aos={index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
            >
              <img
                src={`http://localhost:9002/${cover_Img}`}
                alt={company_name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      Status === "required"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {Status === "required" ? "Hiring" : "Required"}
                  </span>
                </div>

                <h4 className="text-lg font-bold">{company_name}</h4>
                <p className="text-sm text-gray-600">
                  <i className="fa fa-location-dot mr-1"></i>
                  {available_expert.join(", ")}
                </p>
                <p className="text-sm text-gray-500">{address}</p>
                <p className="text-sm text-gray-500">{desc_requirement}</p>
                <p className="text-xs text-gray-400">
                  From: {new Date(from).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400">
                  To: {new Date(to).toLocaleDateString()}
                </p>
                <p className="text-sm text-blue-500">
                  Website:{" "}
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

              <div className="p-2 inline-block justify-center bg-green-400 rounded-md hover:text-sky-600">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition duration-200"
                  onClick={() => handleConnectClick(card, index)}
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
