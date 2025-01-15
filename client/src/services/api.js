import axios from "axios";

// Configure Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PORT || "http://localhost:6010", // Update with your backend URL
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
export const loginCandidate = (data) => API.post('/api/users/login/candidate', data);
export const loginRecruiter = (data) => API.post('/api/users/login/recruiter', data);
export const registerCandidate = (data) => API.post('/api/users/register/candidate', data);
export const registerRecruiter = (data) => API.post('/api/users/register/recruiter', data);
export const forgotPassword = (data) => API.post('/api/users/account/Forgotpassword', data);



// Profile Api Methods
export const getUserProfile = (email) => API.get(`/api/users/profile/account/user/profile/${email}`);
export const updateUserProfile = (email, data) => API.put(`/api/users/profile/account/user/profile/update/${email}`, data);



//Opportunity Api Methods
export const addOpportunity = (data) => API.post('/api/requirements/addOpportunity', data);
export const getOpportunities = () => API.get('/api/requirements/addedOpportunites');
export const getRequirements = () => API.get('/api/requirements/allRequirements');

// Requirement By id Api Method
export const getRequirementById = (id) => API.get(`/api/requirements/Companyrequirements/${id}`);

// Talents Api Methods
export const getTalents = () => API.get('/api/requirements/allTalents');
export const hireTalent = (data) => API.post('/api/requirements/hireTalent', data);


// Chat Api Methods
export const getChatResponse = (data) => API.post('/chat-response', data);

