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
import CandidatesNotifications from "../controller/candidates/candidate.notification.js";
import { NotificationAsRead } from "../controller/notification.controller.js";

const Userrouter = express.Router();

Userrouter.post("/login/candidate", LoginValidation, CandidateLogin);
Userrouter.post("/login/recruiter", LoginValidation, RecruiterLogin);
Userrouter.post("/register/candidate", SignupValidation, CandidateRegister);
Userrouter.post("/register/recruiter", SignupValidation, RecruiterRegister);
Userrouter.post("/account/Forgotpassword", CandidateForgotPassword);
Userrouter.put("/candidate/opportunity/apply-to-job", JobApply);
Userrouter.put("/candidate/revert-application", RevertApplication); 
Userrouter.get("/job/user/job-notifications", CandidatesNotifications );
Userrouter.put("/notifications/markAsRead",NotificationAsRead)
// Userrouter.patch("/account/user/changeAccPassword", changeAccPassword)
// Userrouter.post("/account/DeleteAccount", DeleteAcc);
// Userrouter.post("/account/ResetPassword", ResetPassword);

export default Userrouter;
