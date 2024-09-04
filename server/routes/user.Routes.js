import express from "express";
import { Login, Logout, Register } from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const Userrouter = express.Router();

Userrouter.post("/login", Login);
Userrouter.post("/register", Register);
Userrouter.post("/logout", Logout);

// Show token route
Userrouter.get("/showToken", async (req, res) => {
  try {
    const cookieshow = req.cookies;
    await res.send(cookieshow);
  } catch (error) {
    console.error("Error getting cookies:", error);
    res.status(500).send("Error getting cookies");
  }
});

export default Userrouter;
