import mongoose from "mongoose";
import dotenv from "dotenv";
import { userSchema } from "../model/userModal.js";
import { Requirement } from "../model/Requirement.js";

dotenv.config();

export const connectDB = async () => {  
  try {
    const connection = await mongoose.createConnection(process.env.MONGO_URL);
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
  Requirement
);
export const HireTalentCollection = connect.model(
  "HireTalentCollection",
  Requirement
);

export const User = connect.model("User", userSchema, "userCollection");
