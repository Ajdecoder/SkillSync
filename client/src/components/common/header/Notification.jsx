import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationsContext";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { Spinner } from "../loadingSpinner/spinner";

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const { loggedInUser, google_user } = useAuth();
  const currentUser = loggedInUser || google_user;

  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
    notificationsLoading,
  } = useNotifications();

  console.log(notifications)

  const navigate = useNavigate();

  // Fetch notifications on login/user change
  useEffect(() => {
    fetchNotifications();
  }, [currentUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest(".notification-button") // ignore bell button clicks
    ) {
      setShowNotifications(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  const handleBellClick = (e) => {
    setShowNotifications((prev) => !prev);
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification?.read) {
        await markAsRead(notification?._id);
        navigate(`/notifications/${notification?._id}`);
        setShowNotifications(false);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="z-20 relative">
      <button className="notification-button" onClick={handleBellClick}>
        <i className="text-3xl fa-solid fa-bell z-10 relative"></i>
        {unreadCount > 0 && (
          <span className="top-0 right-0 absolute flex justify-center items-center bg-red-500 rounded-full w-4 h-4 text-white text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          ref={dropdownRef}
          className="top-12 right-[-7rem] z-10 absolute bg-white shadow-lg p-4 border border-gray-300 rounded-md w-[18rem] max-h-[22rem] overflow-auto scroll-smooth"
          onWheel={(e) => e.stopPropagation()}
        >
          {notificationsLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : notifications && notifications.length > 0 ? (
            <>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                className="bg-white shadow-lg pt-1 border border-gray-100 rounded-lg divide-y divide-gray-100 max-w-md overflow-hidden"
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
                      className={`p-4 transition-all duration-200 ease-out dark:bg-gray-300 dark:text-black  ${
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
                              <div className="top-0 right-0 absolute bg-red-500 rounded-full w-2 h-2 animate-ping" />
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
                          className="bg-blue-200 mt-2 rounded-full h-1"
                        />
                      )}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
              <button
                className="block mx-auto mt-2 p-1 hover:text-blue-600 dark:text-blue-400"
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
              <h1 className="mt-1 text-gray-500 text-sm text-center">
                No new notifications
              </h1>
              <button
                className="block mx-auto p-1 hover:text-blue-600"
                onClick={() => {
                  navigate("/notifications");
                  setShowNotifications(false);
                }}
              >
                {notifications.length>0 && "View All"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
