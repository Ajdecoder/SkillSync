import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useFetchData from "../hooks/useGetDataFetch";
import { PORT_CLIENT } from "../../commonClient";
import { Spinner } from "../common/loadingSpinner/spinner";
import { markNotificationAsRead } from "../../services/api";
import { useAuth } from "../context/AuthContext";

const NotificationPage = () => {
  const [readNotifications, setReadNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const { data, error, loading } = useFetchData(
    `${PORT_CLIENT}/api/users/job/user/job-notifications`
  );

  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (data?.notifications) {
      // Filter notifications based on user role
      const filteredNotifications = data.notifications.filter((notification) => {
        if (loggedInUser?.role === "candidate" && notification.type === "job_posted") {
          return true;
        } else if (loggedInUser?.role === "recruiter" && notification.type === "application_received") {
          return true;
        }
        return false;
      });

      setNotifications(filteredNotifications);

      // Set already read notifications
      const alreadyRead = data.notifications.filter((n) => n.read);
      setReadNotifications(alreadyRead.map((n) => n._id));
    }
  }, [data, loggedInUser]); // Re-fetch when `data` or `loggedInUser` changes

  const handleMarkAsRead = async (notification) => {
    if (!readNotifications.includes(notification._id)) {
      setReadNotifications((prev) => [...prev, notification._id]);

      try {
        await markNotificationAsRead(notification._id);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
    setSelectedNotification(notification); // Show details in the right panel
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Error loading notifications</p>
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
                  readNotifications.includes(notification._id)
                    ? "bg-gray-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => handleMarkAsRead(notification)}
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
        {selectedNotification ? (
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
                {selectedNotification.recipient?.company_name || "N/A"}
              </h3>
              <a
                href={selectedNotification.recipient?.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {selectedNotification.recipient?.company_website ||
                  "No Website"}
              </a>
            </div>

            {/* Job Description */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Job Description</p>
              <p className="text-base text-gray-800">
                {selectedNotification.recipient?.desc_requirement ||
                  "No description available"}
              </p>
            </div>

            {/* Job Details */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="text-base text-gray-800">
                {selectedNotification.recipient?.requirement_type ||
                  "Not specified"}
              </p>
            </div>

            {/* Salary */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Salary Range</p>
              <p className="text-base text-gray-800">
                {selectedNotification.recipient?.salaryRange || "Not disclosed"}
              </p>
            </div>

            {/* Location */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-base text-gray-800">
                {selectedNotification.recipient?.location ||
                  "Remote / Unspecified"}
              </p>
            </div>

            {/* Contact Info */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Contact Email</p>
              <p className="text-base text-gray-800">
                {selectedNotification.recipient?.email || "No email provided"}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">Contact Phone</p>
              <p className="text-base text-gray-800">
                {selectedNotification.recipient?.ph_no ||
                  "No phone number provided"}
              </p>
            </div>

            {/* Skills Required */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Required Skills</p>
              <ul className="list-disc list-inside text-gray-800">
                {selectedNotification.recipient?.skills?.length > 0 ? (
                  selectedNotification.recipient.skills.map((skill, index) => (
                    <li key={index}>{skill.name}</li>
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
        ) : (
          <p className="text-gray-500">Select a notification to view details</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
