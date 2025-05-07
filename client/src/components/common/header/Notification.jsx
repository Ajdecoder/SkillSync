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
  const { loggedInUser,google_user } = useAuth();
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
    <div>
      <button
        className="notification-button"
        onClick={handleBellClick}
      >
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
          className="absolute bg-white shadow-lg rounded-md w-[18rem] top-12 right-[-7rem] p-4 max-h-[22rem] overflow-auto z-10 border border-gray-300 scroll-smooth"
          onWheel={(e) => e.stopPropagation()}
        >
          {notifications && (notifications.read || notifications) ? (
            <>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                className="divide-y divide-gray-100 rounded-lg shadow-lg border border-gray-100 bg-white max-w-md overflow-hidden"
              >
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <motion.li
                      key={notification?._id}
                      variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 transition-all duration-200 ease-out ${
                        notification?.read
                          ? "bg-gray-50 text-gray-400"
                          : "bg-white text-gray-800 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {notification?.read ? (
                            <FaCheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="relative">
                              <HiBellAlert className="w-5 h-5 text-blue-500 animate-pulse" />
                              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm leading-5">
                          {notification?.message}
                        </p>
                      </div>
                      {!notification?.read && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="h-1 bg-blue-200 mt-2 rounded-full"
                        />
                      )}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
              <button
                className="block mx-auto p-1 hover:text-blue-600 mt-2"
                onClick={() => {
                  navigate("/notifications");
                  setShowNotifications(false);
                }}
              >
                View All
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 text-center">
                No new notifications
              </p>
              <button
                className="block mx-auto p-1 hover:text-blue-600"
                onClick={() => {
                  navigate("/notifications");
                  setShowNotifications(false);
                }}
              >
                View All
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
