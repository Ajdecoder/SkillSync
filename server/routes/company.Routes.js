import express from "express";
import {
  addManyOpportunities,
  addOpportunity,
  allOpportunitiesData,
  deleteOpportunity,
  getOpportunitytById,
  jobListeningsByRecruiter,
  updateOpportunity,
} from "../controller/company.controller.js";
import notificationMiddleware from "../middleware/Notification.js";
import verifyUser from "../middleware/auth.js";

const companyRouter = express.Router();

companyRouter.get("/addedOpportunities", allOpportunitiesData);
companyRouter.post("/addedOpportunities/bulk", addManyOpportunities);
companyRouter.get("/Companyrequirements/:id", getOpportunitytById);
companyRouter.use(verifyUser)

companyRouter.post("/addOpportunity", notificationMiddleware, addOpportunity);
companyRouter.get("/jobListeningsByRecruiter/:recruiterId", jobListeningsByRecruiter);
companyRouter.delete("/deleteOpportunity/:id", deleteOpportunity);
companyRouter.put("/updateOpportunity", updateOpportunity)

export default companyRouter;
