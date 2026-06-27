import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure Axios
export const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT || "http://localhost:9002",
  withCredentials: true,
});

let isSessionExpiredHandled = false;

API.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLoginApi = err.config?.url?.includes("/login");
    console.log("isloginapi status:", isLoginApi);

    if (err.response?.status === 401 && !isLoginApi) {
      // localStorage.removeItem("authToken");

      if (!isSessionExpiredHandled) {
        isSessionExpiredHandled = true;

        toast.error("Your session has expired. Please login again.", {
          autoClose: 1500,
        });

      }
    }

    return Promise.reject(err);
  },
);

// Add Authorization token
API.interceptors.request.use(async (req) => {
  const token =
    localStorage.getItem("authToken") ||
    localStorage.getItem("authToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ========== Authentication APIs ========== */

export const loginCandidate = (data) =>
  API.post("/api/user/login/candidate", data);
export const loginRecruiter = (data) =>
  API.post("/api/user/login/recruiter", data);
export const registerCandidate = (data) =>
  API.post("/api/user/register/candidate", data);
export const registerRecruiter = (data) =>
  API.post("/api/user/register/recruiter", data);
export const forgotPassword = (data) =>
  API.post("/api/user/account/Forgotpassword", data);
export const logoutUser = () => API.post("/api/user/logout");

/* ========== Profile APIs ========== */

export const getUserProfileByEmail = (email) =>
  API.get(`/api/user/profile/email/${email}`);
export const getUserProfileById = (id) =>
  API.get(`/api/user/profile/id/${id}`);
export const updateUserProfileByEmail = (email, data) =>
  API.put(`/api/user/profile/update/email/${email}`, { data });
export const getAllCandidateProfiles = (query) =>
  API.get("/api/user/profile/candidates", { params: query });
export const getAllRecruitersProfiles = () =>
  API.get("/api/user/profile/emails/user/recruiters");

/* ========== Opportunities APIs ========== */

export const addOpportunity = (data) =>
  API.post("/api/requirements/addOpportunity", data);
export const getOpportunities = (query) =>
  API.get("/api/requirements/addedOpportunities", {
    params: query,
    paramsSerializer: {
      indexes: null,
    },
  });
export const updateOpportunity = (data) =>
  API.put("/api/requirements/updateOpportunity", data);

/* ========== joblisting APIs ========== */

export const jobListeningsByRecruiter = (recruiterId) => {
  console.log("got rec id in api.js", recruiterId);
  return API.get(`/api/requirements/jobListeningsByRecruiter/${recruiterId}`);
};

export const getOpportunityById = (id) =>
  API.get(`/api/requirements/Companyrequirements/${id}`);
export const applyToOpportunity = (payload) =>
  API.put(`/api/user/candidate/opportunity/apply-to-job`, payload);
export const revertBackApplication = (userId, opportunityId) =>
  API.put(`/api/user/candidate/revert-application`, { userId, opportunityId });
export const deleteOpportunity = (opportunityId) =>
  API.delete(`/api/requirements/deleteOpportunity/${opportunityId}`);

/* ========== Bookmark Opportunities APIs ========== */

export const getBookmarkOpportunities = () =>
  API.get(`/api/bookmark/candidate/bookmark-opportunities`);
export const getBookmarkOpportunitiesById = (userId) =>
  API.get(`/api/bookmark/candidate/bookmark-opportunities/${userId}`);
export const bookmarkOpportunity = (userId, post_id) =>
  API.put(`/api/bookmark/opportunity/job/bookmark-opportunity/`, {
    userId,
    post_id,
  });
export const removeBookmarkedOpportunity = (userId, post_id) =>
  API.delete("/api/bookmark/opportunity/job/unbookmark-opportunity", {
    data: { userId, post_id },
  });

/* ========== Bookmark Talents APIs ========== */

export const getbookmarkTalents = () =>
  API.get(`/api/bookmark/talents/bookmark-opportunities`);
export const getbookmarkTalentsById = (userId) =>
  API.get(`/api/bookmark/talents/bookmark-opportunities/${userId}`);
export const bookmarkTalent = (recruiterId, candidateId) =>
  API.put(`/api/bookmark/talents/bookmark-talents/`, {
    recruiterId,
    candidateId,
  });
export const removeBookmarkedTalent = (recruiterId, candidateId) =>
  API.delete(`/api/bookmark/talents/unbookmark-talents/`, {
    data: { recruiterId, candidateId },
  });

/* ========== Chat APIs ========== */

export const getChatResponse = (data) =>
  API.post("/api/chatbot/chat-response", data);

/* ========== Notifications APIs ========== */

export const getNotifications = () =>
  API.get("/api/user/job-notifications");
export const markNotificationAsRead = (notificationId) =>
  API.put(`/api/user/notifications/markAsRead`, { notificationId });
