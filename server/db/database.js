import mongoose from "mongoose";
import dotenv from "dotenv";
import { AddOpportunitySchema } from "../model/RecruiterModals/AddOpportunityModal.js";
import { candidateProfileSchema, recruiterProfileSchema } from "../model/UserProfileModal.js";
import { userSchema } from "../model/userModal.js";
import { BookMarkSchema } from "../model/CandidateModals/BookMarksModal.js";
import blogSchema from "../model/blogs.js";

dotenv.config();

export const connectDB = async () => {  
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
  