import axios from "axios";

// Configure Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT,
});

// Add Authorization token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwttoken");
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

/* ========== Profile APIs ========== */

export const getUserProfileByEmail = (email) =>
  API.get(`/api/user/profile/account/user/email/${email}`);
export const getUserProfileById = (id) =>
  API.get(`/api/user/profile/account/user/id/${id}`);
export const updateUserProfileByEmail = (email, data) =>
  API.put(`/api/user/profile/account/users/update/email/${email}`, { data });
export const getAllCandidateProfiles = () =>
  API.get("/api/user/profile/account/users/user/candidates");
export const getAllRecruitersProfiles = () =>
  API.get("/api/user/profile/account/users/user/recruiters");

/* ========== Opportunities APIs ========== */

export const addOpportunity = (data) =>
  API.post("/api/requirements/addOpportunity", data);
export const getOpportunities = () =>
  API.get("/api/requirements/addedOpportunities");
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

