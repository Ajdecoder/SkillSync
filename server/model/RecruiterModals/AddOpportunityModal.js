import mongoose from "mongoose";

export const AddOpportunitySchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    desc_requirement: {
      type: String,
      required: true,
    },
    skills: [
      {
        skillName: {
          type: String,
          required: true,
        }
      },
    ],
    company_name: {
      type: String,
      required: true,
    },
    company_website: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    ph_no: {
      type: String,
      required: true,
    },
    requirement_type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      required: true,

    },
    location: {
      type: String,
      required: true,
    },
    salaryRange: {
      minSalary: {
        type: Number,
        required: false,
      },
      maxSalary: {
        type: Number,
        required: false,
      },
    },
    candidatesApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CandidateUserProfile",
      },
    ],
    company_logo: {
      type: String,
      required: false, // URL of company logo if needed
    },
    recruiterDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterUserProfile",
    }
  },
  { timestamps: true }
);
