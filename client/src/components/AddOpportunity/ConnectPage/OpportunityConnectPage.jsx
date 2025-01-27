import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PORT_CLIENT } from "../../../commonClient.js";
import useFetchData from "../../hooks/useGetDataFetch.jsx";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import { motion } from "framer-motion";
import {
  ApplyToOpportunity,
  getUserProfileByEmail,
  RevertBackApplication,
} from "../../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";

const OpportunityConnectPage = () => {
  const [error, setError] = useState(null);
  const [loadingApply, setLoadingApply] = useState(false);
  const [userHasApplied, setUserHasApplied] = useState(false);
  const [showRevertModal, setShowRevertModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { loggedInUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const { post_id } = useParams();

  const { data: companyData, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/Companyrequirements/${post_id}`
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfileByEmail(loggedInUser.email);
        setUserId(user.data.candidateProfile._id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Unable to fetch user profile.");
      }
    };

    if (loggedInUser.email) {
      fetchUserProfile();
    }
  }, [loggedInUser.email]);

  const handleJobApply = async () => {
    if (!userId || !companyData?._id) return;

    try {
      setLoadingApply(true);
      await ApplyToOpportunity(userId, companyData._id);
      setUserHasApplied(true);
      toast.success("Application submitted successfully", { autoClose: 1200 });
    } catch (err) {
      console.error("Error applying to the job:", err);
      setError("There was an error applying to the opportunity.");
    } finally {
      setLoadingApply(false);
    }
  };

  const handleRevertApplication = async () => {
    if (!userId || !companyData?._id) return;

    try {
      setLoadingApply(true);
      await RevertBackApplication(userId, companyData._id);
      setUserHasApplied(false);
      toast.info("Application reverted successfully", { autoClose: 1200 });

      const updatedCandidates = companyData.candidatesApplied.filter(
        (candidateId) => candidateId !== userId
      );
      companyData.candidatesApplied = updatedCandidates;
    } catch (err) {
      console.error("Error reverting application:", err);
      setError("There was an error reverting the application.");
    } finally {
      setLoadingApply(false);
    }
  };

  if (!post_id) {
    return <div className="text-red-500">Invalid post ID.</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading || !companyData) {
    return <Spinner />;
  }

  const {
    company_name,
    skills = [],
    location,
    desc_requirement,
    requirement_type,
    salaryRange,
    email,
    ph_no,
    title,
    createdAt,
    company_website,
    candidatesApplied,
    _id,
    recruiterDetails,
  } = companyData;

  console.log(companyData);

  const userHasAlreadyApplied = candidatesApplied?.includes(userId);

  const renderSkills = () => {
    return skills.length > 0
      ? skills.map((skill) => skill.skillName || "Unnamed Skill").join(", ")
      : "No skills available";
  };

  return (
    <div className="p-8 md:p-20 bg-black min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="p-6 w-[66rem] max-w-4xl mx-auto bg-black shadow-lg rounded-lg border-2 border-gray-300 hover:scale-105 transition-all duration-300"
      >
        <button className="float-end">
          <i className="fa-regular fa-bookmark text-white text-2xl" />
        </button>
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
              <strong>Job Type:</strong> {requirement_type || "NA"}
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
            Posting Date
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

        {showMore && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Company Overview
            </h3>
            <p>
              <strong>Name:</strong> {recruiterDetails.companyOverview?.name || "NA" }
            </p>
            <p>
              <strong>Description:</strong>
              {recruiterDetails.companyOverview?.description ||
                "No description available"}
            </p>
            <p>
              <strong>Website:</strong>
              <a
                href={recruiterDetails.companyOverview?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-700"
              >
                {recruiterDetails.companyOverview?.website|| "NA"}
              </a>
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
              Company Location
            </h3>
            <p>
              {recruiterDetails.companyLocation.city},{" "}
              {recruiterDetails.companyLocation.state},{" "}
              {recruiterDetails.companyLocation.country}
            </p>

            {/* <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
              Company Benefits
            </h3>
            <ul className="list-disc ml-6">
              {recruiterDetails.companyBenefits &&
              recruiterDetails.companyBenefits.length > 0
                ? recruiterDetails.companyBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))
                : "No benefits available"}
            </ul> */}

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
              Recruitment Process
            </h3>
            <p>
              <strong>Description:</strong>{" "}
              {recruiterDetails.recruitmentProcess.description}
            </p>
            <p>
              <strong>Timeline:</strong>{" "}
              {recruiterDetails.recruitmentProcess.timeline}
            </p>
            <p>
              <strong>Interview Stages:</strong>{" "}
              {recruiterDetails.recruitmentProcess.interviewStages.join(", ")}
            </p>
            <p>
              <strong>Assessment Types:</strong>{" "}
              {recruiterDetails.recruitmentProcess.assessmentTypes.join(", ")}
            </p>
            <p>
              <strong>Application Review:</strong>{" "}
              {recruiterDetails.recruitmentProcess.applicationReview}
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
              Past Hires
            </h3>
            <ul className="list-disc ml-6">
              {recruiterDetails.pastHires &&
              recruiterDetails.pastHires.length > 0
                ? recruiterDetails.pastHires.map((hire, index) => (
                    <li key={index}>
                      {hire.name} - {hire.position}
                    </li>
                  ))
                : "No past hires available"}
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
              Team Members
            </h3>
            {recruiterDetails.teamMembers &&
            recruiterDetails.teamMembers.length > 0
              ? recruiterDetails.teamMembers.map((member, index) => (
                  <div key={index}>
                    <p>
                      <strong>Name:</strong> {member.name}
                    </p>
                    <p>
                      <strong>Role:</strong> {member.teamMemberRole}
                    </p>
                    {member.github && (
                      <p>
                        <strong>GitHub:</strong>{" "}
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {member.github}
                        </a>
                      </p>
                    )}
                    {member.linkedIn && (
                      <p>
                        <strong>LinkedIn:</strong>{" "}
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {member.linkedIn}
                        </a>
                      </p>
                    )}
                  </div>
                ))
              : "No team members available"}
          </div>
        )}

        {!showMore && (
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="text-white p-1 mt-2 m-auto flex bg-blue-600 border-2 border-gray-500"
          >
            Show More
          </motion.button>
        )}

        <motion.button
          onClick={handleJobApply}
          className={`text-white p-3 mt-2 m-auto flex bg-orange-600 border-2 border-gray-500`}
          style={{
            cursor:
              userHasAlreadyApplied || userHasApplied || loadingApply
                ? "not-allowed"
                : "pointer",
            opacity:
              userHasAlreadyApplied || userHasApplied || loadingApply ? 0.5 : 1,
          }}
          disabled={userHasApplied || loadingApply || userHasAlreadyApplied}
        >
          {loadingApply ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : userHasApplied || userHasAlreadyApplied ? (
            "Already Applied"
          ) : (
            "Apply"
          )}
        </motion.button>

        {(userHasApplied || userHasAlreadyApplied) && (
          <motion.h1 className="text-white p-3 mt-2 text-center table m-auto">
            Want To Revert Application Your Application?{" "}
            <motion.a
              className="ml-1 cursor-pointer hover:underline"
              onClick={() => setShowRevertModal(true)}
            >
              Revert
            </motion.a>
          </motion.h1>
        )}

        {showRevertModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Confirm Revert</h2>
              <p className="mb-6">
                Are you sure you want to revert your application?{" "}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    handleRevertApplication();
                    setShowRevertModal(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes, Revert
                </button>
                <button
                  onClick={() => setShowRevertModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="bottom-left" />
      </motion.div>
    </div>
  );
};

export default OpportunityConnectPage;
