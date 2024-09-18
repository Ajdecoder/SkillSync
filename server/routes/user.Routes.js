import express from "express";
import { Delete, ForgotPass, Login,Register, ResetPassword } from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";

const Userrouter = express.Router();

Userrouter.post("/login", Login);
Userrouter.post("/register", Register);
Userrouter.post("/DeleteAccount", Delete);
Userrouter.post("/account/ResetPassword", ResetPassword);
Userrouter.post("/account/Forgotpassword", ForgotPass);

export default Userrouter;
