import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteOpportunity,
  getUserProfileByEmail,
  jobListeningsByRecruiter,
} from "../../../services/api";
import { Spinner } from "../../common/loadingSpinner/spinner";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const MyJobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  console.log(currentUser)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const recruiterProfile = await getUserProfileByEmail(currentUser?.email);
        console.log(recruiterProfile)
        const recruiterId = recruiterProfile?.data?.recruiterProfile?._id;


        // No need to wait for state update, use recruiterId directly
        const response = await jobListeningsByRecruiter(recruiterId);
        console.log(response)
        setJobs(response?.data?.Addedopportunities || []);
      } catch (err) {
        setError("Error fetching job listings.");
        console.error("Error in fetchJobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentUser]); // Fetch data when currentUser changes

  const handleDeleteJob = async (jobId) => {
    try {
      setDeleting(jobId);
      await deleteOpportunity(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job?._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setDeleting(null);
    }
  };

  const handleViewApplicants = (applicants) => {
    setSelectedApplicants(applicants);
    console.log(selectedApplicants);
    setShowModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <div className="flex justify-end mb-4">
          <span className="inline-block bg-green-400 text-blue-800 px-4 py-2 rounded-full font-medium text-sm">
            {jobs?.length === 1
              ? "1 job posted"
              : `${jobs?.length} jobs posted`}
          </span>
        </div>

        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          My Job Listings
        </motion.h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500 mb-4"
          >
            {error}
          </motion.p>
        )}

        {jobs?.length === 0 && !error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg"
          >
            You haven't posted any jobs yet.
          </motion.p>
        ) : (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {jobs?.map((job) => (
                <motion.li
                  key={job?._id}
                  variants={itemVariants}
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={job?.company_logo}
                        alt="Company logo"
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {job?.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {job?.company_name} • {job?.location}
                            </p>
                          </div>
                          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                            {job?.requirement_type}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {new Date(job?.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            ${job?.salaryRange?.minSalary} - $
                            {job?.salaryRange?.maxSalary}
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button
                            onClick={() =>
                              handleViewApplicants(job?.candidatesApplied)
                            }
                            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {job?.candidatesApplied?.length || 0} Applicants
                          </button>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleDeleteJob(job?._id)}
                              disabled={deleting === job?._id}
                              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              {deleting === job?._id ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Deleting...
                                </>
                              ) : (
                                "Delete Job"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}


        <AnimatePresence>
          {showModal && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              variants={modalVariants}
              className="fixed inset-0 z-50   flex items-start justify-center p-4 "
              style={{ position: "fixed", top: window.scrollY + "px" }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 relative dark:text-black"
              >
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10 dark:text-black">
                  <h3 className="text-xl font-semibold">Applicants</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  >
                    <RxCross1 />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Applicant list content */}
                  {selectedApplicants.length > 0 ? (
                    selectedApplicants.map((applicant) => (
                      <div
                        key={applicant._id}
                        className="p-4 mb-4 bg-gray-50 rounded-lg last:mb-0"
                      >
                        {console.log(applicant)}
                        <li
                          key={applicant._id}
                          className="border-b pb-2 flex flex-wrap gap-4 flex-col"
                        >
                          <p>
                            <strong>Name:</strong> {applicant.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {applicant.email}
                          </p>
                          <p>
                            <strong>Skills:</strong>{" "}
                            {applicant.skills.join(", ")}
                          </p>
                          <p>
                            <strong>Location:</strong> {applicant.location.city}
                            , {applicant.location.state}
                          </p>
                          <Link
                            to={applicant.resume}
                            target="_blank"
                            className="text-blue-500"
                          >
                            View Resume
                          </Link>
                        </li>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No applicants yet
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
