import mongoose from "mongoose";
import dotenv from "dotenv";
import { HireTalentSchema } from "../model/RecruiterModals/HireTalentModal.js";
import { AddOpportunitySchema } from "../model/RecruiterModals/AddOpportunityModal.js";
import { candidateProfileSchema, recruiterProfileSchema } from "../model/UserProfileModal.js";
import { userSchema } from "../model/userModal.js";
import { jobPreferencesSchema } from "../model/CandidateModals/JobPreferencesModal.js";

dotenv.config();

export const connectDB = async () => {  
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Company collection MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.error("Company collection MongoDB connection error:", err);
    process.exit(1);
  }
};

const connect = await connectDB();

export const AddOpportunityCollection = connect.model(
  "AddOpportunity",
  AddOpportunitySchema,
  "AddOpportunityCollection"
);

export const HireTalentCollection = connect.model(
  "TalentSearch",
  HireTalentSchema,
  "TalentSearchCollection"
);

export const Candidate = connect.model("Candidate", userSchema, "CandidateCollection");
export const Recruiter = connect.model("Recruiter", userSchema, "RecruiterCollection");
export const CandidateUserProfile = connect.model("CandidateUserProfile", candidateProfileSchema, "CandidateProfileCollection");
export const RecruiterUserProfile = connect.model("RecruiterUserProfile", recruiterProfileSchema, "RecruiterProfileCollection");
export const JobPreferences = mongoose.model("JobPreferences", jobPreferencesSchema, "jobPreferencesCollection")
