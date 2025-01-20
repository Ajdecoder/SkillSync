import express from "express";

import {
  getAllCandidateProfiles,
  getAllRecruiterProfiles,
  getUserProfileByEmail,
  updateUserProfileByEmail,
} from "../controller/user.profile.controller.js";
import verifyUser from "../middleware/auth.js";
const UserProfileRouter = express.Router();


// Update Recruiter Profile
UserProfileRouter.get("/account/user/profile/:email", getUserProfileByEmail);
UserProfileRouter.get("/account/users/profile/user/candidates", getAllCandidateProfiles);
UserProfileRouter.get("/account/users/profile/user/recruiters", getAllRecruiterProfiles);
UserProfileRouter.put("/account/user/profile/update/:email", updateUserProfileByEmail);

export default UserProfileRouter;
