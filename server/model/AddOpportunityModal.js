import mongoose from "mongoose";

export const AddOpportunitySchema = new mongoose.Schema({
  requirementType: {
    type: String,
  },
  title: { type: String, required: true },
  desc_requirement: { type: String, required: true },
  skills: [
    {
      skillName: { type: String, required: true },
      mandatory: { type: Boolean, default: false },
    },
  ],
  company_name: { type: String, required: true }, // Adjusted to match request data
  company_website: { type: String, required: false }, // Adjusted to match request data
  email: { type: String, required: true },
  ph_no: { type: String, required: true }, // Changed from 'phoneNumber' to 'ph_no'
  type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
    required: true,
  },
  location: { type: String, required: true },
  salaryRange: { type: String, required: false },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  candidatesApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

