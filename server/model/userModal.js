import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_website: { type: String, required: true },
  email: { type: String, required: true },
  ph_no: { type: String, unique: true },
  available_expert: { type: [String] },
  from: { type: Date },
  to: { type: Date },
  desc_requirement: { type: String },
  address: { type: String },
  documents: { type: String },
});

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
});

// Define a method to generate and return JWT token for a user
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '100d',
      }
    );
  } catch (err) {
    console.error("JWT token generation error:", err);
    throw err;
  }
};


