import express from "express";
import {
  allRequirements,
  getRequirement,
  greeting,
  postRequirement,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import router from "./user.Routes.js";

const companyRouter = express.Router();

companyRouter.post(
  "/postRequirement",
  upload.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  postRequirement
);

companyRouter.post(
  "/getRequirement",
  upload.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  getRequirement
);

companyRouter.get("/allRequirements", allRequirements);
companyRouter.get("/greeting", greeting);

export default companyRouter;
