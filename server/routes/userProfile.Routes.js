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

UserProfileRouter.post("/upload-avatar/:userId", verifyUser, imageUploader, UploadProfilePicture);
UserProfileRouter.post("/upload-resume/:userId", verifyUser, resumeUploader, UploadCandidateResume);
UserProfileRouter.get("/account/user/email/:email", verifyUser, getUserProfileByEmail);
UserProfileRouter.get("/account/user/id/:id", verifyUser, getUserProfileById);
UserProfileRouter.get("/account/users/user/candidates", getAllCandidateProfiles);
UserProfileRouter.get("/account/users/user/recruiters", verifyUser, getAllRecruiterProfiles);
UserProfileRouter.put("/account/users/update/email/:email", verifyUser, updateUserProfileByEmail);

export default UserProfileRouter;