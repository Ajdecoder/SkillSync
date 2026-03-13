import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Configure Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT || "http://localhost:9002",
  withCredentials: true
});

let isSessionExpiredHandled = false;

API.interceptors.response.use(
  res => res,
  err => {
    const isLoginApi = err.config?.url?.includes("/login");
    console.log('isloginapi status:',isLoginApi)

    if (
      err.response?.status === 401 &&
      !isLoginApi
    ) {
      localStorage.removeItem("jwttoken");
      toast.error("Your session has expired. Please login again.");

      setTimeout(() => {
        isSessionExpiredHandled && (window.location.href = "/login");
      }, 3000);
    }

    return Promise.reject(err);
  }
);


// Add Authorization token
API.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("jwttoken") || await cookieStore.get("jwttoken")?.value || localStorage.getItem('googleUser');
  console.log("token in localStorage:", localStorage.getItem("jwttoken"));
  console.log("token in cookieStore:", await cookieStore.get("jwttoken")?.value);
  console.log("token in googleUser:", localStorage.getItem('googleUser'));
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ========== Authentication APIs ========== */

export const loginCandidate = (data) =>
  API.post("/api/users/login/candidate", data);
export const loginRecruiter = (data) =>
  API.post("/api/users/login/recruiter", data);
export const registerCandidate = (data) =>
  API.post("/api/users/register/candidate", data);
export const registerRecruiter = (data) =>
  API.post("/api/users/register/recruiter", data);
export const forgotPassword = (data) =>
  API.post("/api/users/account/Forgotpassword", data);
export const logoutUser = () => API.post("/api/users/logout");

/* ========== Profile APIs ========== */

export const getUserProfileByEmail = (email) =>
  API.get(`/api/user/profile/account/user/email/${email}`);
export const getUserProfileById = (id) =>
  API.get(`/api/user/profile/account/user/id/${id}`);
export const updateUserProfileByEmail = (email, data) =>
  API.put(`/api/user/profile/account/users/update/email/${email}`, { data });
export const getAllCandidateProfiles = (query) =>
  API.get("/api/user/profile/account/users/user/candidates", { params: query });
export const getAllRecruitersProfiles = () =>
  API.get("/api/user/profile/account/users/user/recruiters");

/* ========== Opportunities APIs ========== */

export const addOpportunity = (data) =>
  API.post("/api/requirements/addOpportunity", data);
export const getOpportunities = (query) =>
  API.get("/api/requirements/addedOpportunities", {
    params: query,
    paramsSerializer: {
      indexes: null
    },
  });
export const updateOpportunity = (data) =>
  API.put("/api/requirements/updateOpportunity", data);

/* ========== joblisting APIs ========== */

export const jobListeningsByRecruiter = (recruiterId) =>
  API.get(`/api/requirements/jobListeningsByRecruiter/${recruiterId}`);



export const getOpportunityById = (id) =>
  API.get(`/api/requirements/Companyrequirements/${id}`);
export const applyToOpportunity = (payload) =>
  API.put(`/api/users/candidate/opportunity/apply-to-job`, payload);
export const revertBackApplication = (userId, opportunityId) =>
  API.put(`/api/users/candidate/revert-application`, { userId, opportunityId });
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
  API.get("/api/users/job/user/job-notifications");
export const markNotificationAsRead = (notificationId) =>
  API.put(`/api/users/notifications/markAsRead`, { notificationId });

