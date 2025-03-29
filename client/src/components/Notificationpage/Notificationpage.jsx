import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Spinner } from "../common/loadingSpinner/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../context/NotificationsContext";

const NotificationPage = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  console.log(notifications);

  const selectedNotification = notifications.find(
    (n) => n._id === notificationId
  );

  // Mark notification as read when page loads
  useEffect(() => {
    if (selectedNotification && !selectedNotification.read) {
      markAsRead(selectedNotification._id);
    }
  }, [selectedNotification, markAsRead]);

  const handleNotificationSelect = (notification) => {
    if (!notification.read) {
      markAsRead(notification._id);
    }
    navigate(`/notifications/${notification._id}`);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderNotificationDetails = () => {
    if (!selectedNotification) {
      return (
        <p className="text-gray-500">Select a notification to view details</p>
      );
    }

    const renderJobPostings = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full"
        >
          <h3 className="text-xl font-bold mb-2">
            {selectedNotification.message}
          </h3>

          {/* Company Info */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Company</p>
            <h3 className="text-lg font-semibold">
              {selectedNotification.JobDetails?.company_name || "N/A"}
            </h3>
            <a
              href={selectedNotification.JobDetails?.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {selectedNotification.JobDetails?.company_website || "No Website"}
            </a>
          </div>

          {/* Job Description */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Job Description</p>
            <p className="text-base text-gray-800">
              {selectedNotification.JobDetails?.desc_requirement ||
                "No description available"}
            </p>
          </div>

          {/* Job Details */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Job Type</p>
            <p className="text-base text-gray-800">
              {selectedNotification.JobDetails?.requirement_type ||
                "Not specified"}
            </p>
          </div>

          {/* Salary */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Salary Range</p>
            <p className="text-base text-gray-800">
              {(selectedNotification?.JobDetails?.salaryRange &&
                selectedNotification.JobDetails?.salaryRange?.minSalary +
                  "-" +
                  selectedNotification.JobDetails?.salaryRange?.maxSalary) ||
                "Not disclosed"}
            </p>
          </div>

          {/* Location */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-base text-gray-800">
              {selectedNotification.JobDetails?.location ||
                "Remote / Unspecified"}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Contact Email</p>
            <p className="text-base text-gray-800">
              {selectedNotification.JobDetails?.email || "No email provided"}
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-500">Contact Phone</p>
            <p className="text-base text-gray-800">
              {selectedNotification.JobDetails?.ph_no ||
                "No phone number provided"}
            </p>
          </div>

          {/* Skills Required */}
          <div className="mb-3">
            <p className="text-sm text-gray-500">Required Skills</p>
            <ul className="list-disc list-inside text-gray-800">
              {selectedNotification.JobDetails?.skills?.length > 0 ? (
                selectedNotification.JobDetails.skills.map((skill, index) => (
                  <li key={index}>{skill.skillName}</li>
                ))
              ) : (
                <li>No skills specified</li>
              )}
            </ul>
          </div>

          {/* Timestamp */}
          <p className="text-sm text-gray-500 mt-4">
            Posted on: {formatTime(selectedNotification.createdAt)}
          </p>
        </motion.div>
      );
    };

    const renderApplicationRecieved = () => {
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full"
      >
        {console.log(selectedNotification)}
        <h3 className="text-xl font-bold mb-2">
          Application from {selectedNotification.name}
        </h3>

        {/* Candidate Info */}
        <div className="flex items-center gap-4 mb-3">
          <img
            src={selectedNotification.profilePicture}
            alt={selectedNotification.name}
            className="w-14 h-14 rounded-full border"
          />
          <div>
            <p className="text-lg font-semibold">{selectedNotification.name}</p>
            <p className="text-sm text-gray-500">
              {selectedNotification.email}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-base text-gray-800">
            {selectedNotification.location.city},{" "}
            {selectedNotification.location.state},{" "}
            {selectedNotification.location.country}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Skills</p>
          <ul className="list-disc list-inside text-gray-800">
            {selectedNotification.skills.length > 0 ? (
              selectedNotification.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>No skills specified</li>
            )}
          </ul>
        </div>

        {/* Career Interests */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Career Interests</p>
          <p className="text-base text-gray-800">
            {selectedNotification.preferences.careerInterests.join(", ") ||
              "Not specified"}
          </p>
        </div>

        {/* Job Type */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Preferred Job Type</p>
          <p className="text-base text-gray-800">
            {selectedNotification.preferences.jobType}
          </p>
        </div>

        {/* Salary Range */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Expected Salary Range</p>
          <p className="text-base text-gray-800">
            {selectedNotification.preferences.salaryRange.min} -{" "}
            {selectedNotification.preferences.salaryRange.max}
          </p>
        </div>

        {/* Work Environment */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Work Environment Preference</p>
          <p className="text-base text-gray-800">
            {selectedNotification.workEnvironment || "Not specified"}
          </p>
        </div>

        {/* About Candidate */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">About</p>
          <p className="text-base text-gray-800">
            {selectedNotification.about || "No description available"}
          </p>
        </div>

        {/* Portfolio Links */}
        {selectedNotification.portfolio.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-500">Portfolio</p>
            {selectedNotification.portfolio.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block"
              >
                {item.title || "Portfolio Item"}
              </a>
            ))}
          </div>
        )}

        {/* Social Links */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Social Links</p>
          <div className="flex gap-2">
            {selectedNotification.socialLinks.linkedin && (
              <a
                href={selectedNotification.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {selectedNotification.socialLinks.github && (
              <a
                href={selectedNotification.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:underline"
              >
                GitHub
              </a>
            )}
            {selectedNotification.socialLinks.portfolio && (
              <a
                href={selectedNotification.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <p className="text-sm text-gray-500 mt-4">
          Applied on:{" "}
          {new Date(selectedNotification.createdAt.$date).toLocaleDateString()}
        </p>
      </motion.div>;
    };

    return (
      <>
        {selectedNotification.type === "job_posted"
          ? renderJobPostings()
          : renderApplicationRecieved()}
      </>
    );
  };

  if (!notifications) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar - Notification List */}
      <div className="w-1/3 bg-white shadow-lg border-r p-4 overflow-auto">
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
                    ? "bg-green-200"
                    : "bg-gray-200 hover:bg-gray-100"
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

      {/* Right Content - Notification Details */}
      <div className="w-2/3 p-6 flex items-center justify-center">
        {renderNotificationDetails()}
      </div>
    </div>
  );
};

export default NotificationPage;
