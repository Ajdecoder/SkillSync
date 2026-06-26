import express from "express";
import { cookieOptions } from "../utils/cookiesConfig.js";

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
import { Candidate, Recruiter } from "../db/database.js";

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
Userrouter.get("/id/:id", async(req,res) => {
  try {
    const { id } = req.params;
    console.log('id in api',id)
    const user = await Candidate.findById(id) || await Recruiter.findById(id);
    if(user){
      return res.status(200).json({
        success:true,
        user
      })
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Error fetching user" });
  }
})
Userrouter.post("/logout", (req, res) => {
  res.clearCookie("authToken", cookieOptions);

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

// Userrouter.patch("/account/user/changeAccPassword", changeAccPassword)
// Userrouter.post("/account/DeleteAccount", DeleteAcc);
// Userrouter.post("/account/ResetPassword", ResetPassword);

export default Userrouter;
