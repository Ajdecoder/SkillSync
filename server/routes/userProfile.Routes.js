import express from "express";

import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getRecruiterProfile,
  getCandidateProfile,
  updateCandidateProfile,
  updateRecruiterProfile,
  createCandidateProfile,
  createRecruiterProfile,
} from "../controller/userProfile.controller.js";
import verifyUser from "../middleware/auth.js";
import {
} from "../controller/user.candidate.controller.js";

const UserProfileRouter = express.Router();

UserProfileRouter.get("/account/user/profile/candidate/:userId", verifyUser, getCandidateProfile);
UserProfileRouter.put(
  "/account/user/profile/candidate/:userId",
  verifyUser,
  updateCandidateProfile
);
// Get Recruiter Profile by ID
UserProfileRouter.get("/account/user/profile/recruiter/:userId", verifyUser, getRecruiterProfile);
// Update Recruiter Profile
UserProfileRouter.put(
  "/account/user/profile/recruiter/:userId",
  verifyUser,
  updateRecruiterProfile
);
UserProfileRouter.post('/account/user/profile/candidate/create',createCandidateProfile)
UserProfileRouter.post('/account/user/profile/recruiter/create',createRecruiterProfile)
UserProfileRouter.get("/account/user/profile/:email", getUserProfile);
UserProfileRouter.put("/account/user/profile/:email", updateUserProfile);
UserProfileRouter.delete("/account/user/profile/:email", deleteUserProfile);

export default UserProfileRouter;
