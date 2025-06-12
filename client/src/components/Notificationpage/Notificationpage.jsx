import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "../common/loadingSpinner/spinner";
import { useParams } from "react-router-dom";
import { useNotifications } from "../context/NotificationsContext";
import { IoIosArrowBack } from "react-icons/io";

const NotificationPage = () => {
  const { notificationId } = useParams();
  const { notifications, markAsRead, notificationsLoading } = useNotifications();
  console.log(notifications);

  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const isMobile = window.innerWidth <= 480;

  const selectedNotification = notifications.find(
    (n) => n._id === (selectedNotificationId || notificationId)
  );

  useEffect(() => {
    if (selectedNotification && !selectedNotification?.read) {
      markAsRead(selectedNotification?._id);
    }
  }, [selectedNotification, markAsRead]);

  const handleNotificationSelect = (notification) => {
    if (!notification.read) {
      markAsRead(notification._id);
    }
    setSelectedNotificationId(notification._id);

    // For mobile: scroll to top of detail pane
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSelectedNotificationId(null);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderJobPostings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg max-w-lg w-full"
    >
      {/* Back Button for mobile */}
      {isMobile && (
        <button onClick={handleBack} className="p-2 bg-black text-white">
          <IoIosArrowBack />
        </button>
      )}

      <h3 className="text-xl font-bold mb-2">
        {selectedNotification?.message}
      </h3>

      {/* Company Info */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Company</p>
        <h3 className="text-lg font-semibold">
          {selectedNotification?.JobDetails?.company_name || "N/A"}
        </h3>
        <a
          href={selectedNotification?.JobDetails?.company_website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {selectedNotification?.JobDetails?.company_website || "No Website"}
        </a>
      </div>

      {/* Job Description */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Job Description</p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          {selectedNotification?.JobDetails?.desc_requirement ||
            "No description available"}
        </p>
      </div>

      {/* Job Details */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Job Type</p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          {selectedNotification?.JobDetails?.requirement_type ||
            "Not specified"}
        </p>
      </div>

      {/* Salary */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Salary Range</p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          {(selectedNotification?.JobDetails?.salaryRange &&
            selectedNotification?.JobDetails?.salaryRange?.minSalary +
              "-" +
              selectedNotification?.JobDetails?.salaryRange?.maxSalary) ||
            "Not disclosed"}
        </p>
      </div>

      {/* Location */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Location</p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          {selectedNotification?.JobDetails?.location || "Remote / Unspecified"}
        </p>
      </div>

      {/* Contact Info */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Contact Email</p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          {selectedNotification?.JobDetails?.email || "No email provided"}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-500">Contact Phone</p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          {selectedNotification?.JobDetails?.ph_no ||
            "No phone number provided"}
        </p>
      </div>

      {/* Skills Required */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Required Skills</p>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
          {selectedNotification?.JobDetails?.skills?.length > 0 ? (
            selectedNotification?.JobDetails.skills.map((skill, index) => (
              <li key={index}>{skill.skillName}</li>
            ))
          ) : (
            <li>No skills specified</li>
          )}
        </ul>
      </div>

      {/* Timestamp */}
      <p className="text-sm text-gray-500 mt-4">
        Posted on: {formatTime(selectedNotification?.createdAt)}
      </p>
    </motion.div>
  );

  const renderApplicationRecieved = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full"
    >
      {isMobile && (
        <button
          onClick={handleBack}
          className="mb-4 text-xl p-2 bg-black text-white"
        >
          <IoIosArrowBack />
        </button>
      )}
      <h3 className="text-xl font-bold mb-2">
        Application from {selectedNotification?.applicant?.name}
      </h3>

      {/* Candidate Info */}
      <div className="flex items-center gap-4 mb-3">
        <img
          src={selectedNotification?.applicant?.profilePicture}
          alt={selectedNotification?.applicant?.name}
          className="w-14 h-14 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">
            {selectedNotification?.applicant?.name}
          </p>
          <p className="text-sm text-gray-500">
            {selectedNotification?.applicant?.email}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Location</p>
        <p className="text-base text-gray-800">
          {selectedNotification?.applicant?.location?.city},{" "}
          {selectedNotification?.applicant?.location?.state},{" "}
          {selectedNotification?.applicant?.location?.country}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">Skills</p>
        <ul className="list-disc list-inside text-gray-800">
          {selectedNotification?.applicant?.skills?.length > 0 ? (
            selectedNotification?.applicant?.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))
          ) : (
            <li>No skills specified</li>
          )}
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Applied on:{" "}
        {new Date(selectedNotification?.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );

  const renderNotificationDetails = () => {
    if (!selectedNotification) {
      return (
        <p className="text-gray-500">Select a notification to view details</p>
      );
    }
    return selectedNotification?.type === "job_posted"
      ? renderJobPostings()
      : renderApplicationRecieved();
  };

  if (notificationsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left: Notification List */}
      <div
        className={`left-notification-plane w-full md:w-1/3 bg-white dark:bg-gray-800 shadow-lg border-r dark:border-gray-700 p-4 overflow-auto ...
${selectedNotificationId && isMobile ? "hidden" : "block"}`}
      >
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg cursor-pointer border ${
                  notification.read
                    ? "bg-green-200 dark:bg-green-600"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
                onClick={() => handleNotificationSelect(notification)}
              >
                <p className="text-sm font-medium">{notification.message}</p>
                <span className="text-xs text-gray-500">
                  {formatTime(notification.createdAt)}
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No notifications available
            </p>
          )}
        </div>
      </div>

      {/* Right: Notification Details */}
      <div
        className={`right-notification-plane w-full md:w-2/3 p-6 flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white ...
 ${!selectedNotificationId && isMobile ? "hidden" : "block"}`}
      >
        {renderNotificationDetails()}
      </div>
    </div>
  );
};

export default NotificationPage;
