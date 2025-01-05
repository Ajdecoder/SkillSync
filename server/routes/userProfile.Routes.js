import express from "express";

import {
  getUserProfile,
  updateUserProfile,
} from "../controller/user.profile.controller.js";
import verifyUser from "../middleware/auth.js";
const UserProfileRouter = express.Router();


// Update Recruiter Profile
UserProfileRouter.get("/account/user/profile/:email", getUserProfile);
UserProfileRouter.put("/account/user/profile/update/:email", updateUserProfile);

export default UserProfileRouter;
