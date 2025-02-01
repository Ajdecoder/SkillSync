import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../../services/api";
import { useAuth } from "../../context/AuthContext";

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      const data = response.data;

      if (response.statusText === "OK" && Array.isArray(data.notifications)) {
        const filteredNotifications = data.notifications.filter((notification) => {
          if (loggedInUser?.role === "candidate" && notification.type === "job_posted") {
            return true;
          } else if (loggedInUser?.role === "recruiter" && notification.type === "application_received") {
            return true;
          }
          return false;
        });

        setNotifications(filteredNotifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [loggedInUser]);

  // Memoized unread notification count
  const unreadCount = useMemo(() => 
    notifications.filter((notification) => !notification.read).length, 
    [notifications]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        className="notification-button relative p-2 hover:bg-gray-100 rounded-full"
        onClick={handleNotificationClick}
      >
        <i className="fa-solid fa-bell text-2xl text-gray-600"></i>
        
        {/* Notification Counter */}
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center transform translate-x-1 -translate-y-1">
          {loading ? (
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
          ) : (
            unreadCount > 0 ? unreadCount : null
          )}
        </span>
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div
          ref={dropdownRef}
          className="absolute bg-white shadow-lg rounded-md w-[18rem] top-12 right-[-7rem] p-4 max-h-[22rem] overflow-auto z-10 border border-gray-300"
        >
          {loading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            <>
              <ul>
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: notification.read ? "#f3f4f6" : "white",
                      color: notification.read ? "#6b7280" : "black",
                    }}
                    className="text-sm py-2 border-b last:border-none hover:bg-gray-100 cursor-pointer p-2"
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
              <button
                className="block mx-auto mt-3 text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => navigate("/notifications")}
              >
                View All Notifications
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No new notifications
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;