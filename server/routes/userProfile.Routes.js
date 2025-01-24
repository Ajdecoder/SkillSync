import express from "express";

import {
  getAllCandidateProfiles,
  getAllRecruiterProfiles,
  getUserProfileByEmail,
  getUserProfileById,
  updateUserProfileByEmail,
} from "../controller/user.profile.controller.js";
import verifyUser from "../middleware/auth.js";
const UserProfileRouter = express.Router();


// Update Recruiter Profile
UserProfileRouter.get("/account/user/email/:email", getUserProfileByEmail);
UserProfileRouter.get("/account/user/id/:id", getUserProfileById);
UserProfileRouter.get("/account/users/user/candidates", getAllCandidateProfiles);
UserProfileRouter.get("/account/users/user/recruiters", getAllRecruiterProfiles);
UserProfileRouter.put("/account/users/update/email/:email", updateUserProfileByEmail);

export default UserProfileRouter;
