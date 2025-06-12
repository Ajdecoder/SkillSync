import React, { createContext, useState, useEffect, useCallback } from "react";
import { getNotifications, markNotificationAsRead } from "../../services/api";
import { useAuth } from "./AuthContext";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const { loggedInUser,googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  

  // Fetch notifications based on the user's role
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getNotifications();
      if (response.ok || response.status === 200) {
        const filtered = response.data.notifications.filter((notification) => {
          if (currentUser?.role === "candidate") return notification.type === "job_posted";
          if (currentUser?.role === "recruiter") return notification.type === "application_received";
          return false;
        });
        setNotifications(filtered);
        setUnreadCount(filtered.filter((n) => !n.read).length);
        setNotificationsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
      setUnreadCount(0);
      setNotificationsLoading(false);
    }
  }, [currentUser]);

  // Mark a notification as read (both in UI and on the server)
  const markAsRead = useCallback(async (notificationId) => {
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
      
      // Update the server
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, fetchNotifications, markAsRead, notificationsLoading }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => React.useContext(NotificationsContext);
