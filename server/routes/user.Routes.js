import express from "express";
import {
  Delete,
  ForgotPass,
  Login,
  CandidateRegister,
  ResetPassword,
  RecruiterRegister,
} from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
import {LoginValidation, SignupValidation} from'../middleware/AuthValidation.js'


const Userrouter = express.Router();

Userrouter.post("/login", LoginValidation, Login);
Userrouter.post("/register/candidate", SignupValidation, CandidateRegister);
Userrouter.post("/register/recruiter", SignupValidation, RecruiterRegister);
Userrouter.post("/DeleteAccount", Delete);
Userrouter.post("/account/ResetPassword", ResetPassword);
Userrouter.post("/account/Forgotpassword", ForgotPass);

export default Userrouter;
