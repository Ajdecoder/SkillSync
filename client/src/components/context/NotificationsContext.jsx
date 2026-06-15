import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getNotifications, markNotificationAsRead } from "../../services/api";
import { useAuth } from "./AuthContext";

const NotificationsContext = createContext();

// Prevent duplicate API calls even in React StrictMode/dev remounts
const notificationsCache = {
  key: null,
  data: null,
  promise: null,
};

const getNotificationsCached = async (key, force = false) => {
  if (!force && notificationsCache.key === key && notificationsCache.data) {
    return notificationsCache.data;
  }

  if (!force && notificationsCache.key === key && notificationsCache.promise) {
    return notificationsCache.promise;
  }

  notificationsCache.key = key;

  notificationsCache.promise = getNotifications()
    .then((response) => {
      const notifications = response?.data?.notifications || [];
      notificationsCache.data = notifications;
      return notifications;
    })
    .finally(() => {
      notificationsCache.promise = null;
    });

  return notificationsCache.promise;
};

export const NotificationsProvider = ({ children }) => {
  const { loggedInUser, googleUser } = useAuth();

  const currentUser = loggedInUser || googleUser;

  const userKey =
    currentUser?._id ||
    currentUser?.id ||
    currentUser?.email ||
    null;

  const userRole = currentUser?.role?.toLowerCase() || null;

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const fetchNotifications = useCallback(
    async (force = false) => {
      if (!userKey || !userRole) {
        setNotifications([]);
        setUnreadCount(0);
        setNotificationsLoading(false);
        return;
      }

      try {
        setNotificationsLoading(true);

        const requestKey = `${userKey}-${userRole}`;

        console.count("NOTIFICATION API FETCH");
        console.log("requestKey:", requestKey);

        const allNotifications = await getNotificationsCached(
          requestKey,
          force
        );

        let filtered = allNotifications;

        if (userRole === "candidate") {
          filtered = allNotifications.filter(
            (notification) => notification.type === "job_posted"
          );
        } else if (userRole === "recruiter") {
          filtered = allNotifications.filter(
            (notification) => notification.type === "application_received"
          );
        }

        setNotifications(filtered);
        setUnreadCount(filtered.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setNotificationsLoading(false);
      }
    },
    [userKey, userRole]
  );

  useEffect(() => {
    fetchNotifications(false);
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      setNotifications((prev) => {
        const selectedNotification = prev.find(
          (n) => n._id === notificationId
        );

        if (!selectedNotification || selectedNotification.read) {
          return prev;
        }

        setUnreadCount((count) => Math.max(count - 1, 0));

        return prev.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        );
      });

      // Also update local cache
      if (notificationsCache.data) {
        notificationsCache.data = notificationsCache.data.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        );
      }

      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        notificationsLoading,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => React.useContext(NotificationsContext);