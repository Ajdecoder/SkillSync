import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecentCard.css";
import { useAuth } from "../../utils/AuthContext";

const RecentCard = () => {
  const { loggedInUser } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9002/api/requirements/allRequirements",
          { withCredentials: true }
        );
        setData(response.data.data || []);
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

  if (data.length === 0) {
    return <div>Nothing is here</div>;
  }

  return (
    <div className="content grid3 mtop">
      {data.map((val, index) => {
        const {
          company_name,
          company_website,
          available_expert,
          from,
          to,
          desc_requirement,
          address,
          cover_Img,
        } = val;

        return (
          loggedInUser && (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={`http://localhost:9002/${cover_Img}`} alt={company_name} />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background: "Required" === "Required" ? "#25b5791a" : "#ff98001a",
                      color: "Required" === "Hiring" ? "#25b579" : "#ff9800",
                    }}
                  >
                    Required
                  </span>
                </div>
                <h4>{company_name}</h4>
                <p>
                  <i className="fa fa-location-dot"></i>{" "}
                  {available_expert.join(", ")}
                </p>
                <p>{address}</p>
                <p>{desc_requirement}</p>
                <p>From: {new Date(from).toLocaleDateString()}</p>
                <p>To: {new Date(to).toLocaleDateString()}</p>
                <p>
                  Website:{" "}
                  <a href={`http://${company_website}`} target="_blank" rel="noopener noreferrer">
                    {company_website}
                  </a>
                </p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">Connect</button>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default RecentCard;