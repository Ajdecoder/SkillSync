import mongoose from "mongoose";

export const candidateProfileSchema = new mongoose.Schema(
  {
    candidateInfo: { type: mongoose.Schema.ObjectId, ref: "Candidate" },
    name: { type: String },
    email: { type: String, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg",
    },
    role: { type: String },
    skills: [{ type: String }],
    experience: [
      {
        company: String,
        JobRole: String,
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
      jobType: { type: String },
      industry: String,
      salaryRange: { min: Number, max: Number },
    },
    about: {
      type: String,
      maxLength: 500,
      default:
        "An enthusiastic software developer with a passion for problem-solving and continuous learning",
    },
    socialLinks: {
      linkedin: { type: String },
      github: String,
      portfolio: String,
    },
    portfolio: [
      {
        title: String,
        description: String,
        link: String,
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
          default: "Basic",
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
        volunteerRole: String,
        duration: String,
        description: String,
      },
    ],
    workEnvironment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const recruiterProfileSchema = new mongoose.Schema(
  {
    recruiterInfo: { type: mongoose.Schema.ObjectId, ref: "Recruiter" },
    name: { type: String },
    email: { type: String, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg",
    },
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
        jobCategory: { type: String }, // New field for job categories
        jobStatus: {
          type: String,
          enum: ["Open", "Closed", "On Hold", "Filled"],
          default: "Open",
        }, // New field to track job status
      },
    ],
    teamMembers: [
      {
        name: String,
        teamMemberRole: String,
        linkedIn: String,
        github: String,
      },
    ],
    recruitmentProcess: {
      description: String,
      timeline: String,
      interviewStages: [String], // Added stages
      assessmentTypes: [String], // Added assessment types
      applicationReview: {
        type: String,
        enum: ["Pending", "Reviewed", "Interviewing", "Hired", "Rejected"],
        default: "Pending", // Track application review status
      },
    },

    companyLogo: {
      type: String,
      default: "https://app-skillsync.vercel.app/images/logo.png",
    },
    companyLocation: { city: String, state: String, country: String },
    companyBenefits: [
      {
        benefitType: {
          type: String,
          enum: ["Health Insurance", "Paid Time Off", "Retirement Plan"],
          default: "Health Insurance",
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
        status: {
          type: String,
          enum: ["Hired", "Interviewed", "Not Selected"], // Added status
          default: "Hired",
        },
      },
    ],
  },
  { timestamps: true }
);
