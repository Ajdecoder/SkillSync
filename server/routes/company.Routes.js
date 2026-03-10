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

companyRouter.get("/addedOpportunities", allOpportunitiesData);
companyRouter.use(verifyUser)

companyRouter.post("/addOpportunity", notificationMiddleware, addOpportunity);
companyRouter.get("/jobListeningsByRecruiter/:recruiterId", jobListeningsByRecruiter);
companyRouter.get("/Companyrequirements/:id", getOpportunitytById);
companyRouter.delete("/deleteOpportunity/:id", deleteOpportunity);
companyRouter.put("/updateOpportunity", updateOpportunity)

export default companyRouter;
