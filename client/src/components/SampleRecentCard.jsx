import React from "react";
import { dummyRecentCards } from "./data/Data";
import "../components/home/recent/RecentCard.css";


export const SampleRecentCard = () => {
  return (
    <div className="content grid3 mtop">
      {dummyRecentCards.map((val, i) => {
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
        } = val;

        return (
          <div key={i} >
            <div
              className="box shadow recentdummy"
              key={i}
              data-aos={i % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
            >
              <div className="img">
                <img
                  src={cover_Img}
                  alt={company_name}
                />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                        Status === "required" ? "#25b5791a" : "#ff98001a",
                      color: Status === "required" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {Status === "required" ? "Hiring" : "Required"}
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
                  <a
                    href={`http://${company_website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
          </div>
        );
      })}
    </div>
  );
};
