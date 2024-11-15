import mongoose from "mongoose";

export const HireTalentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Candidate's user ID
    skills: { type: [String], required: true }, // List of skills
    experience: { type: Number, required: false }, // Years of experience
    resume: { type: String, required: true }, // Link to resume file
    portfolio: { type: String, required: false }, // Link to portfolio/website
    availability: { type: String, enum: ['Available', 'Not Available'], default: 'Available' }, // Availability status
    location: { type: String, required: true }, // Candidate location
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: false },
    },
    createdAt: { type: Date, default: Date.now }, // Timestamp for profile creation
    lastUpdated: { type: Date, default: Date.now }, // Timestamp for the last update
  });
  