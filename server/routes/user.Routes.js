import express from "express";
import { Delete, ForgotPass, Login,Register, ResetPassword } from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
import { LoginValidation, SignupValidation } from "../middleware/Authvalidation.js";

const Userrouter = express.Router();

Userrouter.post("/login",LoginValidation, Login);
Userrouter.post("/register", SignupValidation, Register);
Userrouter.post("/DeleteAccount", Delete);
Userrouter.post("/account/ResetPassword", ResetPassword);
Userrouter.post("/account/Forgotpassword", ForgotPass);

export default Userrouter;
