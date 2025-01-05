import mongoose from "mongoose";

// Define the HireTalent Schema
export const HireTalentSchema = new mongoose.Schema(
  {
    requirementType: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Freelance"],
    },
    skills: {
      type: [String],
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    compensation: {
      type: String,
      required: true,
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
      },
      phone: {
        type: String,
        required: true,
        match: /^[0-9]{8,15}$/, // Validates phone number format
      },
    },
    // The profile image field is commented out, as per your request to remove it.
    // profile_Img: {
    //   type: String,
    //   match: /\.(jpg|jpeg|png|gif)$/i,
    // },
    status: {
      type: String,
      enum: ["Open", "Closed", "Pending"],
      default: "Pending", // Default status is Pending
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);
