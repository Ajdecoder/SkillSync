import mongoose from "mongoose";
import { AddOpportunitySchema } from "../models/RecruiterModels/AddOpportunity.model.js";
import { candidateProfileSchema, recruiterProfileSchema } from "../models/UserProfile.model.js";
import { userSchema } from "../models/user.model.js";
import { BookMarkSchema } from "../models/CandidateModals/BookMarks.model.js";
import blogSchema from "../models/blogs.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {  
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("collection MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.error("collection MongoDB connection error:", err);
    process.exit(1);
  }
};

const connect = await connectDB();

export const OpportunityCollection = connect.model(
  "AddOpportunity",
  AddOpportunitySchema,
  "OpportunityCollection"
);


export const Candidate = connect.model("Candidate", userSchema, "CandidateCollection");
export const Recruiter = connect.model("Recruiter", userSchema, "RecruiterCollection");
export const CandidateUserProfile = connect.model("CandidateUserProfile", candidateProfileSchema, "CandidateProfileCollection");
export const RecruiterUserProfile = connect.model("RecruiterUserProfile", recruiterProfileSchema, "RecruiterProfileCollection");
export const Bookmars = connect.model("Bookmarks", BookMarkSchema, "BookmarksCollection");
export const Blogs = connect.model("Blogs", blogSchema, "BlogsCollection");
  