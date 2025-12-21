import express from "express";

import verifyUser from "../middleware/auth.js";
import {
  LoginValidation,
  SignupValidation,
} from "../middleware/AuthValidation.js";
import {
  CandidateForgotPassword,
  CandidateLogin,
  CandidateRegister,
  JobApply,
  RevertApplication,
} from "../controller/candidates/user.candidate.controller.js";
import {
  RecruiterLogin,
  RecruiterRegister,
} from "../controller/recruiters/user.recruiter.controller.js";
import { Notifications, NotificationsById, NotificationAsRead } from "../controller/notification.controller.js";
import notificationMiddleware from "../middleware/Notification.js";

const Userrouter = express.Router();

Userrouter.post("/login/candidate", LoginValidation, CandidateLogin);
Userrouter.post("/login/recruiter", LoginValidation, RecruiterLogin);
Userrouter.post("/register/candidate", SignupValidation, CandidateRegister);
Userrouter.post("/register/recruiter", SignupValidation, RecruiterRegister);  
Userrouter.post("/account/Forgotpassword", CandidateForgotPassword);
Userrouter.put("/candidate/opportunity/apply-to-job",verifyUser ,notificationMiddleware, JobApply);
Userrouter.put("/candidate/revert-application", verifyUser, RevertApplication); 
Userrouter.get("/job/user/job-notifications", verifyUser, Notifications );
Userrouter.get("/job/user/job-notifications/:notificationId", verifyUser, NotificationsById );
Userrouter.put("/notifications/markAsRead",NotificationAsRead)
// Userrouter.patch("/account/user/changeAccPassword", verifyUser, changeAccPassword)
// Userrouter.post("/account/DeleteAccount", verifyUser, DeleteAcc);
// Userrouter.post("/account/ResetPassword", verifyUser, ResetPassword);

export default Userrouter;
