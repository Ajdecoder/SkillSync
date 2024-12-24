import express from "express";
import {
  ForgotPass,
  Login,
  CandidateRegister,
  ResetPassword,
  RecruiterRegister,
  DeleteAcc,
} from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
import {LoginValidation, SignupValidation} from'../middleware/AuthValidation.js'
import { changeAccPassword } from "../controller/user.controller.js";


const Userrouter = express.Router();

Userrouter.post("/login", LoginValidation, Login);
Userrouter.patch("/profile/changeAccPassword", changeAccPassword)
Userrouter.post("/register/candidate", SignupValidation, CandidateRegister);
Userrouter.post("/register/recruiter", SignupValidation, RecruiterRegister);
Userrouter.post("/DeleteAccount", DeleteAcc);
Userrouter.post("/account/ResetPassword", ResetPassword);
Userrouter.post("/account/Forgotpassword", ForgotPass);

export default Userrouter;
