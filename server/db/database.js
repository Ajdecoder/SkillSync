import mongoose from "mongoose";
import dotenv from "dotenv";
import { companySchema, userSchema } from "../model/userModal.js";

dotenv.config();

export const connectCompanyDB = async () => {
  try {
    const connection = await mongoose.createConnection(
      process.env.COMPANY_MONGO_URL
    );
    console.log("Company collection MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.error("Company collection MongoDB connection error:", err);
    process.exit(1);
  }
};

export const connectLoggedInRegDB = async () => {
  try {
    const connection = await mongoose.createConnection(
      process.env.REG_USER_MONGO_URL
    );
    console.log("Logged in user MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.error("Logged in user MongoDB connection error:", err);
    process.exit(1);
  }
};

const companyConnection = await connectCompanyDB();
const userConnection = await connectLoggedInRegDB();

export const CompanyPostCollection = companyConnection.model("PostCollection", companySchema);
export const CompanyGetCollection = companyConnection.model("GetCollection", companySchema);

export const User = userConnection.model("User", userSchema, "userCollection");
