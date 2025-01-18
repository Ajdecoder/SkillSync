import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PORT_CLIENT } from "../../../commonClient.js";
import useFetchData from "../../hooks/useGetDataFetch.jsx";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import { motion } from "framer-motion";
import {
  ApplyToOpportunity,
  getUserProfileByEmail,
} from "../../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";

const OpportunityConnectPage = () => {
  const [error, setError] = useState(null);
  const [loadingApply, setLoadingApply] = useState(false); // Loading state for application
  const [userHasApplied, setUserHasApplied] = useState(false); // Track if user has applied locally
  const { loggedInUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const [opportunityId, setOpportunityId] = useState(null);

  const userEmail = loggedInUser.email;

  const { post_id } = useParams();

  const { data: companyData, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/Companyrequirements/${post_id}`
  );

  useEffect(() => {
    if (companyData) {
      if (userId) {
        setOpportunityId(companyData._id);
      }
    }
  }, [companyData, userId]);

  useEffect(() => {
    const UserProfile = async () => {
      const user = await getUserProfileByEmail(userEmail);
      setUserId(user.data.candidateProfile._id);
    };
    UserProfile();
  }, [userEmail]);

  const JobApply = async () => {
    try {
      setLoadingApply(true); // Start loading state
      setUserHasApplied(true); // Optimistic update: assume the user applied immediately
      const data = await ApplyToOpportunity(userId, opportunityId);
      console.log(data.data.message);
      toast.success("Applied successfully");
    } catch (err) {
      console.error("Error applying to the job:", err);
      setError("There was an error applying to the opportunity.");
      setLoadingApply(false); // End loading state
      setUserHasApplied(false); // Reset if error occurs
    }
  };

  // Check if post_id is valid
  if (!post_id) return setError("Invalid post ID.");

  // Prevent rendering if there is an error
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Show loading spinner if companyData is not available yet
  if (loading || !companyData) {
    return <Spinner />;
  }

  // Ensure companyData and its properties are safe to access
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
    candidatesApplied,
  } = companyData;

  // Check if the user has already applied
  const userHasAlreadyApplied =
    candidatesApplied && candidatesApplied.includes(userId);

  // Helper function to render skills properly
  const renderSkills = () => {
    if (!skills || skills.length === 0) return "No skills available";
    return skills.map((skill) => skill.skillName || "Unnamed Skill").join(", ");
  };

  return (
    <div className="p-8 md:p-20 bg-black min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="p-6 w-[66rem] max-w-4xl mx-auto bg-black shadow-lg rounded-lg border-2 border-gray-300 hover:scale-105 transition-all duration-300"
      >
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
            <strong>Created At:</strong>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-sm text-blue-500 mt-6">
          <strong>Website:</strong>{" "}
          <a
            href={`http://${company_website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-700"
            style={{ textTransform: "none" }}
          >
            {company_website}
          </a>
        </p>

        <motion.button
          onClick={JobApply}
          className={`text-white p-3 mt-2 m-auto flex bg-orange-600 border-2 border-gray-500`}
          style={{
            cursor: userHasAlreadyApplied ||userHasApplied || loadingApply ? "not-allowed" : "pointer",
            opacity:userHasAlreadyApplied || userHasApplied || loadingApply ? 0.5 : 1,
          }}
          disabled={userHasApplied || loadingApply || userHasAlreadyApplied}
        >
          {loadingApply ? (
           <i className="fa-solid fa-check"></i>
          ) : userHasApplied || userHasAlreadyApplied ? (
            "Already Applied"
          ) : (
            "Apply"
          )}
        </motion.button>
      </motion.div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default OpportunityConnectPage;
