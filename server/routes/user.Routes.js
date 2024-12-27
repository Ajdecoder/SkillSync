import express from "express";
import {
  CandidateForgotPassword,
  CandidateLogin,
  CandidateRegister,
  // ResetPassword,
} from "../controller/user.candidate.controller.js";
import verifyUser from "../middleware/auth.js";
import {LoginValidation, SignupValidation} from'../middleware/AuthValidation.js'
// import { changeAccPassword } from "../controller/user.candidate.controller.js";
import { RecruiterLogin, RecruiterRegister } from "../controller/user.recruiter.controller.js";
import { getUserById } from "../controller/user.profile.controller.js";


const Userrouter = express.Router();

Userrouter.post("/login/candidate", LoginValidation, CandidateLogin);
Userrouter.post("/login/recruiter", LoginValidation, RecruiterLogin);
Userrouter.get('/account/user/:userId',getUserById)
Userrouter.post("/register/candidate", SignupValidation, CandidateRegister);
Userrouter.post("/register/recruiter", SignupValidation, RecruiterRegister);
Userrouter.post("/account/Forgotpassword", CandidateForgotPassword);
// Userrouter.patch("/account/user/changeAccPassword", changeAccPassword)
// Userrouter.post("/DeleteAccount", DeleteAcc);
// Userrouter.post("/account/ResetPassword", ResetPassword);

export default Userrouter;
