import express from "express";
import {
  addOpportunity,
  allOpportunitiesData,
  deleteOpportunity,
  getOpportunitytById,
  jobListeningsByRecruiter,
  updateOpportunity,
} from "../controller/company.controller.js";

const companyRouter = express.Router();

import { multerUploader } from "../middleware/multer.js";
import { uploadFile } from "../middleware/cloudinary.js";
import notificationMiddleware from "../middleware/Notification.js";

companyRouter.post("/addOpportunity", notificationMiddleware, addOpportunity);
companyRouter.get("/addedOpportunities", allOpportunitiesData);
companyRouter.get("/jobListeningsByRecruiter/:recruiterId", jobListeningsByRecruiter);
companyRouter.get("/Companyrequirements/:id", getOpportunitytById);
companyRouter.delete("/deleteOpportunity/:id", deleteOpportunity);
companyRouter.put("/updateOpportunity", updateOpportunity)

export default companyRouter;
