import mongoose from "mongoose";
import dotenv from "dotenv";
import { userSchema } from "../model/userModal.js";
import { HireTalentSchema } from "../model/HireTalentModal.js";
import { AddOpportunitySchema } from "../model/AddOpportunityModal.js";

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
  "AddOpportunityCollection",
  AddOpportunitySchema
);
export const HireTalentCollection = connect.model(
  "TalentSearchCollection",
  HireTalentSchema
);

export const Candidate = connect.model("Candidate", userSchema, "CandidateCollection");
export const Recruiter = connect.model("Recruiter", userSchema, "RecruiterCollection");
