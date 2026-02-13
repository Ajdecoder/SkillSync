import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PORT_CLIENT } from "../../../commonClient.js";
import useFetchData from "../../hooks/useGetDataFetch.jsx";
import { Spinner } from "../../common/loadingSpinner/spinner.jsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  applyToOpportunity,
  bookmarkOpportunity,
  getUserProfileByEmail,
  removeBookmarkedOpportunity,
  revertBackApplication,
} from "../../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  FiBookmark,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiGlobe,
  FiMail,
  FiPhone,
  FiUsers,
} from "react-icons/fi";
import { toast } from "react-toastify";

const OpportunityConnectPage = () => {
  const [error, setError] = useState(null);
  const [loadingApply, setLoadingApply] = useState(false);
  const [userHasApplied, setUserHasApplied] = useState(false);
  const [showRevertModal, setShowRevertModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { loggedInUser, googleUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const [jobPoster, setJobPoster] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  const { post_id } = useParams();

  const { data: companyData, loading } = useFetchData(
    `${PORT_CLIENT}/api/requirements/Companyrequirements/${post_id}`
  );

  const currentUser = loggedInUser || googleUser;

  useEffect(() => {
    console.log(companyData);
    const fetchUserProfile = async () => {
      setJobPoster(companyData?.recruiterDetails?._id);
      console.log(companyData?.recruiterDetails?._id);
      try {
        const user = await getUserProfileByEmail(currentUser?.email);
        setUserId(user.data.candidateProfile._id);
        setBookmark(
          user.data.candidateProfile.OpportunityBookmarks.some(
            (bookmark) => bookmark._id === post_id
          )
        );
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Unable to fetch user profile.");
      }
    };

    if (currentUser?.email) {
      fetchUserProfile();
    }
  }, [post_id]);

  const handleJobApply = async () => {
    if (!userId || !companyData?._id) return;

    try {
      setLoadingApply(true);

      // Construct the payload
      const payload = {
        action: "application_received",
        payload: {
          jobTitle: companyData?.title,
          candidateName: currentUser?.name,
          userId,
          opportunityId: companyData?._id,
          recruiterId: jobPoster,
        },
      };

      await applyToOpportunity(payload);
      setUserHasApplied(true);

      // Set toast message on successful application
      toast.success("Application submitted successfully!");
    } catch (err) {
      console.error("Error applying to the job:", err);
      setError("There was an error applying to the opportunity.");

      // Show error toast
      toast.error("Failed to apply for the job.");
      
    } finally {
      setLoadingApply(false);
    }
  };

  const handleRevertApplication = async () => {
    if (!userId || !companyData?._id) return;

    try {
      setLoadingApply(true);
      await revertBackApplication(userId, companyData?._id);
      setUserHasApplied(false);

      toast.success("Application reverted successfully!");

      const updatedCandidates = companyData?.candidatesApplied.filter(
        (candidateId) => candidateId !== userId
      );
      companyData.candidatesApplied = updatedCandidates;
      setShowRevertModal(false);
    } catch (err) {
      console.error("Error reverting application:", err);
      toast.error("Failed to revert the application.");
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

  console.log("companyData here:", companyData)

  const userHasAlreadyApplied = candidatesApplied?.includes(userId);

  const renderSkills = () => {
    return skills?.length > 0
      ? skills.map((skill) => skill.skillName || "Unnamed Skill").join(", ")
      : "No skills available";
  };

  const handleBookmarClick = async () => {
    if (!userId || !post_id) return;

    try {
      // If bookmark is false, add bookmark. Otherwise, remove bookmark.
      if (!bookmark) {
        await bookmarkOpportunity(userId, post_id); // Add bookmark
        toast.success("Opportunity Bookmared!");
        
      } else {
        await removeBookmarkedOpportunity(userId, post_id); // Remove bookmark
        toast.success("Opportunity Unbookmared!");
      }

      // Toggle the bookmark state after the operation
      setBookmark(!bookmark); // This updates the UI to reflect the new state
      // console.log(userId, post_id);
    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast.error("Failed to update bookmark.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 2, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const skillVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <div className="overflow-hidden min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black p-8 md:p-12 flex items-center justify-center j-posting-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg dark:shadow-2xl border border-gray-300 dark:border-gray-700/30"
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {company_name}
            </h1>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 mt-1"
              variants={itemVariants}
            >
              {title}
            </motion.p>
          </motion.div>

          <motion.button
            onClick={() => handleBookmarClick(_id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl p-2 rounded-full hover:bg-gray-700/30 transition-colors"
          >
            <FiBookmark
              className={
                bookmark
                  ? "fill-emerald-500 text-emerald-500 dark:fill-emerald-400 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }
            />
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Location & Type */}
          <motion.div
            className="flex items-center gap-4 dark:text-gray-400"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <FiGlobe className="text-emerald-400" />
              <Link
                href={`http://${company_website}`}
                target="_blank"
                className="hover:text-emerald-400 transition-colors"
              >
                {company_website}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-cyan-400" />
              {console.log("Created at",createdAt)}
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="dark:text-gray-300 leading-relaxed">{desc_requirement}</p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            variants={itemVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={skillVariants}
                className="p-2 bg-emerald-600/10 rounded-lg flex items-center justify-center gap-2"
              >
                <span className="dark:text-emerald-400 text-sm">
                  {skill.skillName}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Details Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <div className="p-4 bg-gray-100 dark:bg-gray-700/20 rounded-xl">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Job Details
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FiUsers className="text-cyan-600 dark:text-cyan-400" />
                  <span>{requirement_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-cyan-600 dark:text-cyan-400" />
                  <span>
                    {salaryRange?.minSalary &&
                      `${(salaryRange.minSalary / 1000).toFixed(1)}k`}
                    {salaryRange?.maxSalary &&
                      ` - ${(salaryRange.maxSalary / 1000).toFixed(1)}k`}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-700/20 rounded-xl">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                Contact Info
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FiMail className="text-cyan-600 dark:text-cyan-400" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-cyan-700 dark:hover:text-cyan-300"
                  >
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-cyan-600 dark:text-cyan-400" />
                  <span>{ph_no}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expandable Section */}
          <AnimatePresence>
            {showMore && (
              <motion.div
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              ></motion.div>
            )}
          </AnimatePresence>

          {/* Show More Content */}
          <motion.div>
            {showMore && (
              <motion.div
                animate={{
                  height: "auto",
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                exit={{ opacity: 1, height: 0 }}
                className="overflow-hidden space-y-8 pt-6"
              >
                {/* Company Overview */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gray-700/20 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                    Company Overview
                  </h3>
                  <div className="space-y-3 dark:text-gray-300">
                    <p>
                      <strong className="text-cyan-400">Name:</strong>{" "}
                      {recruiterDetails?.companyOverview?.name || "N/A"}
                    </p>
                    <p>
                      <strong className="text-cyan-400">Description:</strong>{" "}
                      {recruiterDetails?.companyOverview?.description ||
                        "No description available"}
                    </p>
                    <div className="flex items-center gap-2">
                      <FiGlobe className="text-cyan-400" />
                      <Link
                        to={recruiterDetails?.companyOverview?.website}
                        target="_blank"
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {recruiterDetails?.companyOverview?.website || "N/A"}
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Company Location */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gray-700/20 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                    Company Location
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FiGlobe className="text-cyan-400" />
                    <p className="text-black dark:text-gray-300" >{location || "No location provided"}</p>
                  </div>
                </motion.div>

                {/* Recruitment Process */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gray-700/20 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                    Recruitment Process
                  </h3>
                  <div className="space-y-4 dark:text-gray-300">
                    <motion.div
                      className="space-y-2"
                      initial="hidden"
                      animate="visible"
                      transition={{ staggerChildren: 0.1 }}
                    >
                      <motion.p variants={itemVariants}>
                        <strong className="text-cyan-400">Description:</strong>{" "}
                        {recruiterDetails?.recruitmentProcess?.description ||
                          "No description provided"}
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        <strong className="text-cyan-400">Timeline:</strong>{" "}
                        {recruiterDetails?.recruitmentProcess?.timeline ||
                          "No timeline provided"}
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        <strong className="text-cyan-400">
                          Interview Stages:
                        </strong>{" "}
                        {recruiterDetails?.recruitmentProcess?.interviewStages?.join(
                          ", "
                        ) || "No interview stages provided"}
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        <strong className="text-cyan-400">
                          Assessment Types:
                        </strong>{" "}
                        {recruiterDetails?.recruitmentProcess?.assessmentTypes?.join(
                          ", "
                        ) || "No assessment types provided"}
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        <strong className="text-cyan-400">
                          Application Review:
                        </strong>{" "}
                        {recruiterDetails?.recruitmentProcess
                          ?.applicationReview || "No application review"}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Past Hires */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gray-700/20 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                    Past Hires
                  </h3>
                  <motion.ul
                    className="space-y-3 dark:text-gray-300"
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {recruiterDetails?.pastHires?.length > 0 ? (
                      recruiterDetails.pastHires.map((hire, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="flex items-center gap-2"
                        >
                          <FiUsers className="text-cyan-400" />
                          <span>
                            {hire.candidateName || "NA"} -{" "}
                            {hire.position || "NA"}
                          </span>
                        </motion.li>
                      ))
                    ) : (
                      <motion.p
                        variants={itemVariants}
                        className="text-gray-400"
                      >
                        No past hires available
                      </motion.p>
                    )}
                  </motion.ul>
                </motion.div>

                {/* Team Members */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gray-700/20 rounded-xl "
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                    Team Members
                  </h3>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {recruiterDetails?.teamMembers?.length > 0 ? (
                      recruiterDetails?.teamMembers.map((member, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="p-4 bg-gray-700/30 rounded-lg mt-2"
                        >
                          <p className="dark:text-cyan-400 font-medium">
                            {member.name}
                          </p>
                          <p className="dark:text-gray-400 text-sm">
                            {member.teamMemberRole}
                          </p>
                          <div className="mb-2 flex gap-3 text-sm">
                            {member.github && (
                              <Link
                                to={member.github}
                                target="_blank"
                                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                              >
                                <FiGlobe /> GitHub
                              </Link>
                            )}
                            {member.linkedIn && (
                              <Link
                                to={member.linkedIn}
                                target="_blank"
                                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                              >
                                <FiGlobe /> LinkedIn
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.p
                        variants={itemVariants}
                        className="text-gray-400"
                      >
                        No team members available
                      </motion.p>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Show More Button */}
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            variants={itemVariants}
          >
            <span>{showMore ? "Show Less" : "Show More Details"}</span>
            <motion.span
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown />
            </motion.span>
          </motion.button>

          {/* Apply Button */}
          <motion.div className="mt-8" variants={itemVariants}>            
            <motion.button
              onClick={handleJobApply}
              whileHover={!userHasApplied && { scale: 1.02 }}
              whileTap={!userHasApplied && { scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-semibold transition-all ${userHasApplied || userHasAlreadyApplied
                  ? "bg-emerald-400/30 text-emerald-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-gray-900"
                }`}
              disabled={userHasApplied || userHasAlreadyApplied}
            >
              {loadingApply ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block"
                >
                  <FiClock />
                </motion.div>
              ) : userHasApplied || userHasAlreadyApplied ? (
                <div className="flex items-center justify-center gap-2">
                  <FiCheckCircle className="text-xl" />
                  <span>Application Submitted</span>
                </div>
              ) : (
                "Apply Now"
              )}
            </motion.button>
          </motion.div>
        </div>

        {(userHasApplied || userHasAlreadyApplied) && (
          <motion.h1 className="dark:text-white p-3 mt-2 text-center table m-auto">
            Want To Revert Your Application?{" "}
            <motion.a
              className="ml-1 cursor-pointer hover:underline hover:text-red-600"
              onClick={() => setShowRevertModal(true)}
            >
              Revert
            </motion.a>
          </motion.h1>
        )}

        {/* Revert Modal */}
        <AnimatePresence>
          {showRevertModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
              >
                <h2 className="text-2xl font-bold text-emerald-400 mb-4">
                  Confirm Revert
                </h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to withdraw your application?
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={handleRevertApplication}
                    className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Confirm Revert
                  </motion.button>
                  <motion.button
                    onClick={() => setShowRevertModal(false)}
                    className="px-6 py-2 bg-gray-700/30 text-gray-300 rounded-lg hover:bg-gray-700/40 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OpportunityConnectPage;
