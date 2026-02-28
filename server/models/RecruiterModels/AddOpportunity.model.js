import mongoose from "mongoose";

export const AddOpportunitySchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Job title is required"],
      trim: true 
    },

    desc_requirement: { 
      type: String 
    },

    skills: [
      {
        skillName: { 
          type: String 
        }
      }
    ],

    company_name: { 
      type: String, 
      required: [true, "Company name is required"],
      trim: true
    },

    company_website: { 
      type: String 
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    ph_no: {
      type: String,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },

    requirement_type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      required: true,
    },

    location: { 
      type: String 
    },

    salaryRange: {
      minSalary: Number,
      maxSalary: Number,
    },

    candidatesApplied: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CandidateUserProfile" },
    ],

    company_logo: String,

    recruiterDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterUserProfile",
      required: true
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


AddOpportunitySchema.pre("save", function (next) {

    if (this.location) {
    this.location = this.location.trim().toLowerCase();
  }

  if (
    this.salaryRange?.minSalary &&
    this.salaryRange?.maxSalary &&
    this.salaryRange.minSalary > this.salaryRange.maxSalary
  ) {
    return next(new Error("minSalary cannot be greater than maxSalary"));
  }
  next();
});
