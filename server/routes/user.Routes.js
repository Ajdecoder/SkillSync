import express from "express";
import {
  Login,
  Logout,
  Register,
  allRequirements,
  getRequirement,
  greeting,
  postRequirement,
} from "../controller/user.controller.js";
import verifyUser from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/postRequirement",
  upload.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  postRequirement
);

router.post(
  "/getRequirement",
  upload.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  getRequirement
);

router.get("/allRequirements", allRequirements);
router.get("/greeting", greeting);
router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);

// Show token route
router.get("/showToken", async (req, res) => {
  try {
    const cookieshow = req.cookies;
    await res.send(cookieshow);
  } catch (error) {
    console.error("Error getting cookies:", error);
    res.status(500).send("Error getting cookies");
  }
});

export default router;
