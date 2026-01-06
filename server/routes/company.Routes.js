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
import notificationMiddleware from "../middleware/Notification.js";
import verifyUser from "../middleware/auth.js";
companyRouter.post("/addOpportunity", verifyUser, notificationMiddleware, addOpportunity);
companyRouter.get("/addedOpportunities", allOpportunitiesData);
companyRouter.get("/jobListeningsByRecruiter/:recruiterId", verifyUser, jobListeningsByRecruiter);
companyRouter.get("/Companyrequirements/:id", verifyUser, getOpportunitytById);
companyRouter.delete("/deleteOpportunity/:id", verifyUser, deleteOpportunity);
companyRouter.put("/updateOpportunity", verifyUser, updateOpportunity)

export default companyRouter;
