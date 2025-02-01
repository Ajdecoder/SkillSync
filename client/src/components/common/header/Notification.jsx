import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "../loadingSpinner/spinner";

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { loggedInUser } = useAuth(); 
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(notifications.length);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      const data = response.data;

      console.log("Notification here:----", data);

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
        console.error("Failed to fetch notifications:", data);
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [loggedInUser]); // Fetch notifications only when user changes

  // Memoized unread notification count
  const unreadCount = useMemo(() => 
    notifications.filter((notification) => !notification.read).length, 
    [notifications]
  );

  // Immediately update the notification count whenever notifications change
  useEffect(() => {
    setUnreadNotificationCount(unreadCount);
  }, [unreadCount]); // Depend on `unreadCount` only to avoid infinite re-renders

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
        className="notification-button"
        onClick={handleNotificationClick}
      >
        {unreadCount?<i className="fa-solid fa-bell text-3xl"></i>:<Spinner/>}
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {unreadNotificationCount}
        </span>
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div
          ref={dropdownRef}
          className="absolute bg-white shadow-lg rounded-md w-[18rem] top-12 right-[-7rem] p-4 max-h-[22rem] overflow-auto z-10 border border-gray-300"
        >
          {notifications.length > 0 ? (
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
                className="block m-auto p-1"
                onClick={() => navigate("/notifications")}
                onClick={() => navigate("/notifications")}
              >
                View All
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
