import mongoose from "mongoose";

const jobListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      index: true, // Indexing for faster searches
    },
    salaryRange: {
      min: {
        type: Number,
        required: true,
        min: 0, // Ensures no negative salaries
      },
      max: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance", "Remote"], // Added Remote and Freelance
      required: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
        index: true, // Index for fast queries based on skills
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Paused"],
      default: "Open",
    },
    benefits: [String], // List of benefits (e.g., "Health Insurance", "Remote Work")
    deadline: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const JobListing = mongoose.model("JobListing", jobListingSchema);

export default JobListing;
