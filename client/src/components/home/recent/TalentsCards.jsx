import React, { useEffect, useState } from "react";
import { getAllCandidateProfiles } from "../../../services/api";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { useNavigate } from "react-router-dom";
import { experiences, locations, skills } from "../../data/Data";

const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
const industries = ["Technology", "Finance", "Healthcare", "Education"];
const languages = ["English", "Spanish", "French", "German"];
const workEnvironments = ["Remote", "On-Site", "Hybrid"];

const TalentsCard = ({ bgColor }) => {


    const [talents, setTalents] = useState([]);


      useEffect(() => {
        const fetchCandidates = async () => {
          try {
            const { data } = await getAllCandidateProfiles();
            setTalents(data.candidates || []);
          } catch (error) {
            console.error("Error fetching candidates:", error);
          }
        };
        fetchCandidates();
      }, []);
 

  const navigate = useNavigate();

  return (
    <div className="mx-auto p-4">

      {/* Talent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {talents.map((candidate) => (
          <div
            key={candidate._id}
            style={{ backgroundColor: bgColor }}
            className="border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col border-2 p-4"
          >
            <img
              src={candidate.profilePicture}
              alt={`${candidate.name}'s profile`}
              className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-center font-bold text-lg">{candidate.name}</h3>
            <p className="text-center text-sm">{candidate.about}</p>
            <button
              className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => navigate(`/candidateinfo/${candidate._id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentsCard;
