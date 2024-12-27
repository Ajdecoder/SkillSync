import mongoose from "mongoose";

export const candidateProfileSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  profilePicture: { type: String, default: "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg" },
  role: { type: String, enum: ["JobSeeker", "Recruiter"] },
  skills: [{ type: String }],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      year: String,
    },
  ],
  location: {
    city: String,
    state: String,
    country: String,
  },
  preferences: {
    jobType: { type: String, enum: ["Full-Time", "Part-Time", "Freelance"] },
    industry: String,
    salaryRange: { min: Number, max: Number },
  },
  about: { type: String, maxLength: 500 },
  socialLinks: {
    linkedin: {
      type: String,
      validate: /^https?:\/\/[a-zA-Z0-9.-]+(?:\/[^\s]*)?/,
    }, // URL validation regex
    github: String,
    portfolio: String,
  },
  portfolio: [
    {
      title: String,
      description: String,
      link: String,
      dateCompleted: Date,
    },
  ],
  certifications: [
    {
      name: String,
      issuingOrganization: String,
      dateIssued: Date,
      expiryDate: Date,
    },
  ],
  languages: [
    {
      language: String,
      proficiency: {
        type: String,
        enum: ["Basic", "Intermediate", "Fluent", "Native"],
      },
    },
  ],
  awards: [
    {
      awardName: String,
      issuingOrganization: String,
      date: Date,
    },
  ],
  availabilityStatus: { type: Boolean, default: true },
  resume: String,
  volunteerExperience: [
    {
      organization: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
  workEnvironment: {
    type: String,
    enum: ["Remote", "Hybrid", "On-site"],
    default: "Remote",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const recruiterProfileSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  profilePicture: { type: String, default: "" },
  companyOverview: {
    name: String,
    description: String,
    website: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },
  },
  jobListings: [
    {
      jobTitle: String,
      location: String,
      jobType: String,
      skillsRequired: [String],
      description: String,
      applicationDeadline: Date,
      salaryRange: { min: Number, max: Number }, // Added salary range
    },
  ],
  teamMembers: [
    {
      name: String,
      role: String,
      linkedIn: String,
      github: String,
    },
  ],
  recruitmentProcess: {
    description: String,
    timeline: String,
    interviewStages: [String], // Added stages
    assessmentTypes: [String], // Added assessment types
  },
  companyLogo: String,
  companyLocation: { city: String, state: String, country: String },
  companyBenefits: [
    {
      benefitType: {
        type: String,
        enum: ["Health Insurance", "Paid Time Off", "Retirement Plan"],
      },
      description: String,
    },
  ],
  pastHires: [
    {
      candidateName: String,
      position: String,
      hireDate: Date,
      testimonial: String,
      status: { type: String, enum: ["hired", "rejected", "interviewed"] }, // Added status
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
