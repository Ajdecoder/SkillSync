import express from "express";
import {
  allRequirements,
  getRequirement,
  postRequirement,
} from "../controller/company.controller.js";
import { upload } from "../middleware/multer.js";

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

export default companyRouter;
