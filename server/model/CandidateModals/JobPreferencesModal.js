import mongoose from "mongoose";

// Schema for Job Preferences
export const jobPreferencesSchema = new mongoose.Schema({
  jobTitle: {
    type: [String], // Array of job titles that the candidate is interested in
    required: true,
  },
  location: {
    type: [String], // Array of locations the candidate is open to
    required: true,
  },
  salaryRange: {
    type: String, // Salary range, e.g., "60,000 - 80,000"
    required: true,
  },
  industry: {
    type: [String], // Industries the candidate is interested in
    required: true,
  },
  jobType: {
    type: String, // Full-Time, Part-Time, Contract, Freelance, etc.
    required: true,
  },
  workHours: {
    type: String, // Flexible, 9-5, night shifts, etc.
    required: true,
  },
  growthOpportunities: {
    type: Boolean, // Whether the candidate is looking for growth opportunities
    default: false,
  },
  companySize: {
    type: String, // e.g., Small, Medium, Large company
    required: true,
  },
  workLifeBalance: {
    type: String, // Importance of work-life balance (e.g., Important, Not Important)
    required: true,
  },
  benefits: {
    type: [String], // Array of preferred benefits (e.g., Health insurance, PTO, etc.)
    default: [],
  },
  travel: {
    type: String, // Willingness to travel (e.g., No travel, Occasional travel, Frequent travel)
    required: true,
  },
  startDate: {
    type: Date, // Candidate's preferred start date
  },
  languages: {
    type: [String], // Languages spoken by the candidate (e.g., English, Spanish)
    default: [],
  },
  relocation: {
    type: String, // Willingness to relocate (e.g., Open to relocation, No relocation)
    required: true,
  },
  additionalNotes: {
    type: String, // Any other preferences or notes the candidate wants to add
  },
});

