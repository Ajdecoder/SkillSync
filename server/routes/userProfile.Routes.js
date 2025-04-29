import express from "express";

import {
  getAllCandidateProfiles,
  getAllRecruiterProfiles,
  getUserProfileByEmail,
  getUserProfileById,
  updateUserProfileByEmail,
  UploadProfilePicture,
} from "../controller/user.profile.controller.js";
import verifyUser from "../middleware/auth.js";
import multerUploader from "../middleware/multer.js";
const UserProfileRouter = express.Router();

UserProfileRouter.post("/upload-avatar/:userId", multerUploader, UploadProfilePicture);
UserProfileRouter.post("/upload-resume/:userId", multerUploader, UploadProfilePicture);
UserProfileRouter.get("/account/user/email/:email", getUserProfileByEmail);
UserProfileRouter.get("/account/user/id/:id", getUserProfileById);
UserProfileRouter.get("/account/users/user/candidates", getAllCandidateProfiles);
UserProfileRouter.get("/account/users/user/recruiters", getAllRecruiterProfiles);
UserProfileRouter.put("/account/users/update/email/:email", updateUserProfileByEmail);

export default UserProfileRouter;