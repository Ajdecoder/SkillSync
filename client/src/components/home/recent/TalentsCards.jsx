import React, { useEffect, useState } from "react";
import { getAllCandidateProfiles } from "../../../services/api";
import { Spinner } from "../../common/loadingSpinner/spinner";

const TalentsCard = ({ bgColor, onConnectClick }) => {
  const [talent, setTalents] = useState(null);

  useEffect(() => {
    async function getAllCandidates() {
      try {
        const { data } = await getAllCandidateProfiles();
        setTalents(data.candidates); // Assuming `data.candidates` contains an array of candidate objects
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }

    getAllCandidates();
  }, []);

  if (!talent) return <Spinner />;

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {talent.map((candidate) => {
          const {
            _id,
            profilePicture,
            skills,
            experience,
            location,
            about,
            socialLinks,
            certifications,
          } = candidate;

          return (
            <div
              key={_id}
              style={{ backgroundColor: bgColor }}
              className=" border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col border-2 p-4 "
            >
              <img
                className="w-full h-48 object-contain "
                src={profilePicture}
                alt={`${about || "Candidate"}'s profile`}
              />
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-[#d55d19]">
                  {about || "Candidate"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {location.city}, {location.state}, {location.country}
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Skills:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {skills.slice(0, 5).map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Experience:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {experience.slice(0, 2).map((exp,index) => (
                      <li key={index}>
                        <strong>{exp.JobRole}</strong> at {exp.company}
                        <p className="text-xs text-gray-500">{exp.duration}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Certifications:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {certifications.slice(0, 2).map((cert,i) => (
                      <li key={cert._id}>
                        {cert.name} (
                        {new Date(cert.dateIssued.$date).getFullYear()} )
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <a
                  href={socialLinks?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href={socialLinks?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 underline text-sm"
                >
                  GitHub
                </a>
              </div>
              <div className="p-4 flex justify-between items-center">
                <button
                  onClick={onConnectClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                >
                  View Profile
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all">
                  Hire Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TalentsCard;
