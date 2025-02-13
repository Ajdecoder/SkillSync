import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationsContext";

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const { notifications, unreadCount, fetchNotifications, markAsRead } =
    useNotifications();

  // Fetch notifications on login/user change
  useEffect(() => {
    fetchNotifications();
  }, [loggedInUser, fetchNotifications]);

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
      if (!notification.read) {
        // Use markAsRead from context to handle both UI update and server call
        await markAsRead(notification._id);
        navigate(`/notifications/${notification._id}`);
        setShowNotifications(false);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="notification-button relative"
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
          {notifications.length && notifications.read > 0 ? (
            <>
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`text-sm py-2 border-b last:border-none hover:bg-gray-100 cursor-pointer p-2 ${
                      notification.read
                        ? "text-gray-400 hidden"
                        : "text-gray-800"
                    }`}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
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
