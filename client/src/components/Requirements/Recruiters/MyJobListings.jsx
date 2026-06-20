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
import { toast } from "react-toastify";

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
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const recruiterProfileResponse = await getUserProfileByEmail(
        currentUser.email
      );

      console.log("Recruiter profile response:", recruiterProfileResponse);

      const recruiterProfile =
        recruiterProfileResponse?.data?.profile ||
        recruiterProfileResponse?.data?.userProfile ||
        recruiterProfileResponse?.data?.recruiterProfile ||
        recruiterProfileResponse?.data;

      const recruiterId = recruiterProfile?._id;

      console.log("Recruiter profile id:", recruiterId);

      if (!recruiterId) {
        throw new Error("Recruiter profile ID not found.");
      }

      const response = await jobListeningsByRecruiter(recruiterId);

      console.log("Job listings response:", response);

      const jobList =
        response?.data?.Addedopportunities ||
        response?.data?.opportunities ||
        response?.data?.jobs ||
        [];

      setJobs(Array.isArray(jobList) ? jobList : []);
    } catch (err) {
      console.error("Error in fetchJobs:", err);
      setError("Error fetching job listings.");
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, [currentUser?.email]);

  const handleDeleteJob = async (jobId) => {
    try {
      setDeleting(jobId);
      await deleteOpportunity(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job?._id !== jobId));
    } catch (error) {
      toast.error("Error deleting job:", error);
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
        className="mx-auto px-4 py-8 max-w-4xl container"
      >
        <div className="flex justify-end mb-4">
          <span className="inline-block bg-green-400 px-4 py-2 rounded-full font-medium text-blue-800 text-sm">
            {jobs?.length === 1
              ? "1 job posted"
              : `${jobs?.length} jobs posted`}
          </span>
        </div>

        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8 font-bold text-gray-800 dark:text-white text-3xl text-center"
        >
          My Job Listings
        </motion.h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}

        {jobs?.length === 0 && !error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-lg text-center"
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
                  className="group bg-white shadow-md hover:shadow-lg rounded-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={job?.company_logo}
                        alt="Company logo"
                        className="border rounded-lg w-14 h-14 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-xl">
                              {job?.title}
                            </h3>
                            <p className="mt-1 text-gray-600 text-sm">
                              {job?.company_name} • {job?.location}
                            </p>
                          </div>
                          <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">
                            {job?.requirement_type}
                          </span>
                        </div>

                        <div className="gap-4 grid grid-cols-2 mt-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="mr-2 w-5 h-5 text-gray-400"
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
                              className="mr-2 w-5 h-5 text-gray-400"
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

                        <div className="flex justify-between items-center mt-6">
                          <button
                            onClick={() =>
                              handleViewApplicants(job?.candidatesApplied)
                            }
                            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <svg
                              className="mr-2 w-5 h-5"
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
                              className="flex items-center hover:bg-red-50 px-4 py-2 rounded-lg text-red-600 transition-colors"
                            >
                              {deleting === job?._id ? (
                                <>
                                  <svg
                                    className="mr-3 -ml-1 w-5 h-5 text-red-600 animate-spin"
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
              className="z-50 fixed inset-0 flex justify-center items-start p-4"
              style={{ position: "fixed", top: window.scrollY + "px" }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative bg-white shadow-xl my-8 rounded-lg w-full max-w-2xl dark:text-black"
              >
                <div className="top-0 z-10 sticky flex justify-between items-center bg-white p-6 border-b dark:text-black">
                  <h3 className="font-semibold text-xl">Applicants</h3>
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
                        className="bg-gray-50 mb-4 last:mb-0 p-4 rounded-lg"
                      >
                        {console.log(applicant)}
                        <li
                          key={applicant._id}
                          className="flex flex-col flex-wrap gap-4 pb-2 border-b"
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
                    <div className="py-8 text-gray-500 text-center">
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
