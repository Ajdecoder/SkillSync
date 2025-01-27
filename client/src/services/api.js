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

// Authentication Api Methods
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

// Profile Api Methods
export const getUserProfileByEmail = (email) =>
  API.get(`/api/user/profile/account/user/email/${email}`);
export const getUserProfileById = (id) =>
  API.get(`/api/user/profile/account/user/id/${id}`);
export const updateUserProfileByEmail = (email, data) =>
  API.put(`/api/user/profile/account/users/update/email/${email}`, data);
export const getAllCandidateProfiles = () =>
  API.get("/api/user/profile/account/users/user/candidates");
export const getAllRecruitersProfiles = () =>
  API.get("/api/user/profile/account/users/user/recruiters");

//Opportunity Api Methods
export const addOpportunity = (data) =>
  API.post("/api/requirements/addOpportunity", data);
export const getOpportunities = () =>
  API.get("/api/requirements/addedOpportunities");
export const ApplyToOpportunity = (userId, opportunityId) => {
  return API.put(`/api/users/candidate/opportunity/apply-to-job`, {
    userId,
    opportunityId
  });
};
export const RevertBackApplication = (userId, opportunityId) => {
  return API.put(`/api/users/candidate/revert-application`, {
    userId,
    opportunityId
  });
}


// Requirement By id Api Method
export const getRequirementById = (id) =>
  API.get(`/api/requirements/Companyrequirements/${id}`);



// Talents Api Methods
export const getTalents = () => API.get("/api/requirements/allTalents");
export const hireTalent = (data) =>
  API.post("/api/requirements/hireTalent", data);

// Chat Api Methods
export const getChatResponse = (data) => API.post("/api/chatbot/chat-response", data);

// notifications Api Methods

export const getNotifications = () => API.get("/api/users/job/user/job-notifications");
export const markNotificationAsRead = (notificationId) =>
  API.put(`/api/notifications/markAsRead`, { notificationId });

// Search Api Methods