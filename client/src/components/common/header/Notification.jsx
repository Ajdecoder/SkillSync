import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationsContext";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const { loggedInUser, google_user } = useAuth();
  const currentUser = loggedInUser || google_user;

  const { notifications, unreadCount, fetchNotifications, markAsRead } =
    useNotifications();
  const navigate = useNavigate();

  // Fetch notifications on login/user change
  useEffect(() => {
    fetchNotifications();
  }, [currentUser, fetchNotifications]);

  // Handle click outside to close notifications dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifications]);

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification?.read) {
        // Use markAsRead from context to handle both UI update and server call
        await markAsRead(notification?._id);
        navigate(`/notifications/${notification?._id}`);
        setShowNotifications(false);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="relative z-40">
      <button className="notification-button dark:text-white " onClick={handleBellClick}>
        <i className="fa-solid fa-bell text-3xl"></i>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          ref={dropdownRef}
          className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md w-[18rem] top-12 right-[-7rem] p-4 max-h-[22rem] overflow-auto z-10 border border-gray-300 dark:border-gray-700 scroll-smooth"
          onWheel={(e) => e.stopPropagation()}
        >
          {notifications && (notifications.read || notifications) ? (
            <div className="space-y-4">
              {notifications.read?.map((notification, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No notifications
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
