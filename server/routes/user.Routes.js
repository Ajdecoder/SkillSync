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

Userrouter.use(verifyUser)

Userrouter.put("/candidate/opportunity/apply-to-job", notificationMiddleware, JobApply);
Userrouter.put("/candidate/revert-application", RevertApplication);
Userrouter.get("/job/user/job-notifications", Notifications);
Userrouter.get("/job/user/job-notifications/:notificationId", NotificationsById);
Userrouter.put("/notifications/markAsRead", NotificationAsRead)
Userrouter.post("/logout", (req, res) => {
  res.clearCookie("jwttoken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

// Userrouter.patch("/account/user/changeAccPassword", changeAccPassword)
// Userrouter.post("/account/DeleteAccount", DeleteAcc);
// Userrouter.post("/account/ResetPassword", ResetPassword);

export default Userrouter;
