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
export const getOpportunityById = () =>
  API.get("/api/requirements/addedOpportunities");
export const ApplyToOpportunity = (payload) => {
  return API.put(`/api/users/candidate/opportunity/apply-to-job`, payload);
};
export const RevertBackApplication = (userId, opportunityId) => {
  return API.put(`/api/users/candidate/revert-application`, {
    userId,
    opportunityId,
  });
};

export const DeleteOpportunity = (opportunityId) => {
  return API.delete(`/api/requirements/deleteOpportunity/${opportunityId}`);
}

export const GetBookmarkOpportunities = () => {
  return API.get(`/api/bookmark/candidate/bookmark-opportunities`);
};
export const GetBookmarkOpportunitiesById = (userId) => {
  return API.get(`/api/bookmark/candidate/bookmark-opportunities/${userId}`);
};

export const BookmarkOpportunity = (userId, post_id) => {
  return API.put(`/api/bookmark/opportunity/job/bookmark-opportunity/`, {
    userId,
    post_id,
  });
};

export const RemoveBookmarkOpportunity = (userId, post_id) => {
  console.log("userId", userId, "post_id", post_id);
  return API.delete('/api/bookmark/opportunity/job/unbookmark-opportunity', {
    data: { userId, post_id }, // Ensure the data is sent correctly in the body
  });
};

export const getOpportunitytById = (id) =>
  API.get(`/api/requirements/Companyrequirements/${id}`);



// Talents Api Method

export const GetBookmarkTakents = () => {
  return API.get(`/api/bookmark/talents/bookmark-opportunities`);
};
export const GetBookmarkTakentsById = (userId) => {
  return API.get(`/api/bookmark/talents/bookmark-opportunities/${userId}`);
};

export const BookmarkTakents = (recruiterId, candidateId) => {
  return API.put(`/api/bookmark/talents/addBookmark/`, {
    recruiterId,
    candidateId,
  });
};

export const RemoveBookmarkTakents = (recruiterId, candidateId) => {
  return API.delete(
    `/api/bookmark/talents/removeBookmark/`,{
      data: { recruiterId, candidateId }, // Ensure the data is sent correctly in the body
    }
  );
};



// Chat Api Methods
export const getChatResponse = (data) =>
  API.post("/api/chatbot/chat-response", data);

// notifications Api Methods

export const getNotifications = () =>
  API.get("/api/users/job/user/job-notifications");
export const markNotificationAsRead = (notificationId) =>
  API.put(`/api/users/notifications/markAsRead`, { notificationId });
