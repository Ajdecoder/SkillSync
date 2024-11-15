import mongoose from "mongoose";

export const AddOpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Job title
    description: { type: String, required: true }, // Detailed job description
    requirements: { type: [String], required: true }, // List of skills/qualifications
    type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'], required: true }, // Type of opportunity
    location: { type: String, required: true }, // Location or remote
    salaryRange: { type: String, required: false }, // Optional salary information
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to employer/user
    candidatesApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of applicants
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
    expiresAt: { type: Date, required: true }, // Expiry date of the opportunity
  });
  