import express from "express";

import {
  getAllCandidateProfiles,
  getAllRecruiterProfiles,
  getUserProfileByEmail,
  getUserProfileById,
  updateUserProfileByEmail,
  UploadCandidateResume,
  UploadProfilePicture,
} from "../controller/user.profile.controller.js";
import {imageUploader,resumeUploader} from '../middleware/multer.js'

import verifyUser from "../middleware/auth.js";

const UserProfileRouter = express.Router();

UserProfileRouter.use(verifyUser)

UserProfileRouter.post("/upload-avatar/:userId", imageUploader, UploadProfilePicture);
UserProfileRouter.post("/upload-resume/:userId", resumeUploader, UploadCandidateResume);
UserProfileRouter.get("/account/user/email/:email", getUserProfileByEmail);
UserProfileRouter.get("/account/user/id/:id", getUserProfileById);
UserProfileRouter.get("/account/users/user/candidates", getAllCandidateProfiles);
UserProfileRouter.get("/account/users/user/recruiters", getAllRecruiterProfiles);
UserProfileRouter.put("/account/users/update/email/:email", updateUserProfileByEmail);

export default UserProfileRouter;