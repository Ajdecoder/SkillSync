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
import { imageUploader, resumeUploader } from '../middleware/multer.js'

import verifyUser from "../middleware/auth.js";

const UserProfileRouter = express.Router();

UserProfileRouter.use(verifyUser)

UserProfileRouter.post("/upload-avatar/:userId", imageUploader, UploadProfilePicture);
UserProfileRouter.post("/upload-resume/:userId", resumeUploader, UploadCandidateResume);
UserProfileRouter.get("/email/:email", getUserProfileByEmail);
UserProfileRouter.get("/id/:id", getUserProfileById);
UserProfileRouter.get("/user/candidates", getAllCandidateProfiles);
UserProfileRouter.get("/user/recruiters", getAllRecruiterProfiles);
UserProfileRouter.put("/user/update/email/:email", updateUserProfileByEmail);

export default UserProfileRouter;