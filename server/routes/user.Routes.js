import express from "express";
import { Login, Logout, Register, getRequirement, greeting, postRequirement } from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
const router = express.Router();

router.post('/getRequirement', getRequirement);
router.post('/postRequirement', postRequirement);

router.get("/greeting", greeting)
router.post("/login",verifyUser, Login)
router.post("/register", Register)
router.post("/logout", Logout)

router.get("/showToken", async (req, res) => {
    try {
      const cookieshow = req.cookies;
      await res.send(cookieshow);
      console.log(JSON.stringify(cookieshow));
    } catch (error) {
      console.error("Error getting cookies:", error);
      res.status(500).send("Error getting cookies");
    }
  });


export default router;