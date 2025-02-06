import express from "express";
import {
  addOpportunity,
  allOpportunitiesData,
  getOpportunitytById,
} from "../controller/company.controller.js";

const companyRouter = express.Router();

import { multerUploader } from "../middleware/multer.js";
import { uploadFile } from "../middleware/cloudinary.js";
import notificationMiddleware from "../middleware/Notification.js";

companyRouter.post("/addOpportunity", notificationMiddleware, addOpportunity);
companyRouter.get("/addedOpportunities", allOpportunitiesData);
companyRouter.get("/Companyrequirements/:id", getOpportunitytById);

export default companyRouter;
