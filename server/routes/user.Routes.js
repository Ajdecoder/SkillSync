import express from "express";
import { Login, Logout, Register, getRequirement, greeting, postRequirement } from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
const router = express.Router();

router.post('/getRequirement', getRequirement);
router.post('/postRequirement', postRequirement);

router.get("/greeting", greeting)
router.post("/login",verifyUser, Login)
// router.post("/login", Login)
router.post("/register", Register)
router.post("/logout", Logout)
router.get("/showToken", async (req,res) => {
    const cookieshow = req.cookies
    await res.send(cookieshow)
})


export default router;