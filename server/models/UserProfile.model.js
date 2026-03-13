import mongoose from "mongoose";

// Candidate Profile Schema
export const candidateProfileSchema = new mongoose.Schema(
  {
    candidateInfo: { type: mongoose.Schema.ObjectId, ref: "Candidate" },
    name: { type: String, default: "Anonymous Candidate" },
    email: { type: String, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg",
    },
    profilePictureDetails: {
      publicId: { type: String },
      url: { type: String }
    },
    role: { type: String, default: "candidate" },
    skills: [{ type: String, default: "No skills provided yet" }],
    experience: [
      {
        company: { type: String, default: "No company listed" },
        jobRole: { type: String, default: "No role specified" },
        duration: { start: { type: Date }, end: { type: Date } },
        description: { type: String, default: "No description provided" },
      },
    ],
    education: [
      {
        institution: { type: String, default: "Unknown Institution" },
        degree: { type: String, default: "No degree specified" },
        year: { type: String, default: "N/A" },
      },
    ],
    location: {
      city: { type: String, default: "Unknown City" },
      state: { type: String, default: "Unknown State" },
      country: { type: String, default: "Unknown Country" },
    },
    preferences: {
      careerInterests: {
        type: [String],
        default: ["Web Development", "Programming"],
      },
      jobType: { type: String, default: "Full-Time" },
      salaryRange: {
        min: { type: Number, default: 30000 },
        max: { type: Number, default: 100000 },
      },
    },
    about: {
      type: String,
      maxLength: 500,
      default:
        "An enthusiastic professional eager to contribute skills and knowledge in a dynamic work environment.",
    },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    portfolio: [
      {
        title: { type: String, default: "Untitled Project" },
        description: { type: String, default: "No description provided" },
        link: { type: String, default: "" },
      },
    ],
    certifications: [
      {
        name: { type: String, default: "Certification Name" },
        issuingOrganization: { type: String, default: "Organization Name" },
        dateIssued: { type: Date, default: Date.now },
        expiryDate: { type: Date, default: null },
      },
    ],
    languages: [
      {
        language: { type: String, default: "English" },
        proficiency: { type: String, default: "Basic" },
      },
    ],
    awards: [
      {
        awardName: { type: String, default: "Award Title" },
        issuingOrganization: { type: String, default: "Organization Name" },
        date: { type: Date, default: Date.now },
      },
    ],
    availabilityStatus: {
      type: String,
      default: "Closed",
      // enum: ["Closed", "Open"],
    },
    resume: { type: String, default: "" },
    resumeFileName: {type: String, default: ""},
    volunteerExperience: [
      {
        organization: { type: String, default: "Unknown Organization" },
        volunteerRole: { type: String, default: "No role specified" },
        duration: { type: String, default: "No duration mentioned" },
        description: { type: String, default: "No description provided" },
      },
    ],
    workEnvironment: {
      type: String,
      default: "Remote",
    },
    OpportunityBookmarks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AddOpportunity" },
    ],
  },
  { timestamps: true }
);

export const recruiterProfileSchema = new mongoose.Schema(
  {
    recruiterInfo: { type: mongoose.Schema.ObjectId, ref: "Recruiter" },
    name: { type: String, default: "Anonymous Recruiter" },
    email: { type: String, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg",
    },
    profilePictureDetails: {
      publicId: { type: String },
      url: { type: String }
    },
    companyOverview: {
      name: { type: String, default: "Company Name" },
      description: { type: String, default: "No description available" },
      website: { type: String, default: "" },
      socialLinks: {
        linkedin: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
      },
    },
    role: { type: String, default: "recruiter" },
    jobListings: {
      type: [
        {
          jobTitle: { type: String, default: "Untitled Job" },
          location: { type: String, default: "Location not specified" },
          jobType: { type: String, default: "Full-Time" },
          skillsRequired: [{ type: String, default: "Not specified" }],
          description: { type: String, default: "No description provided" },
          applicationDeadline: { type: Date, default: Date.now },
          salaryRange: {
            min: { type: Number, default: 30000 },
            max: { type: Number, default: 100000 },
          },
          jobCategory: { type: String, default: "General" },
          jobStatus: {
            type: String,
            enum: ["Open", "Closed", "On Hold", "Filled"],
            default: "Open",
          },
        },
      ],
      default: [
        {
          jobTitle: "Untitled Job",
          location: "Location not specified",
          jobType: "Full-Time",
          skillsRequired: ["Not specified"],
          description: "No description provided",
          applicationDeadline: new Date(),
          salaryRange: {
            min: 30000,
            max: 100000,
          },
          jobCategory: "General",
          jobStatus: "Open",
        },
      ],
    },
    teamMembers: {
      type: [
        {
          name: { type: String, default: "Team Member" },
          teamMemberRole: { type: String, default: "Member" },
          linkedIn: { type: String, default: "" },
          github: { type: String, default: "" },
        },
      ],
      default: [
        {
          name: "Team Member",
          teamMemberRole: "Member",
          linkedIn: "",
          github: "",
        },
      ],
    },
    recruitmentProcess: {
      description: { type: String, default: "No process defined" },
      timeline: { type: String, default: "No timeline specified" },
      interviewStages: { type: [String], default: ["Stage1", "Stage2"] },
      assessmentTypes: {
        type: [String],
        default: ["AssessmentType1", "AssessmentType2"],
      },
      applicationReview: {
        type: String,
        enum: [
          "Pending",
          "Reviewed",
          "Under Review",
          "Interviewing",
          "Hired",
          "Rejected",
        ],
        default: "Pending",
      },
    },
    companyLogo: {
      type: String,
      default: "https://app-skillsync.vercel.app/images/logo.png",
    },
    companyLocation: {
      city: { type: String, default: "Unknown City" },
      state: { type: String, default: "Unknown State" },
      country: { type: String, default: "Unknown Country" },
    },
    companyBenefits: {
      type: [
        {
          benefitType: {
            type: String,
            enum: ["Health Insurance", "Paid Time Off", "Retirement Plan"],
            default: "Health Insurance",
          },
          description: { type: String, default: "No details provided" },
        },
      ],
      default: [
        {
          benefitType: "Health Insurance",
          description: "No details provided",
        },
      ],
    },
    pastHires: {
      type: [
        {
          candidateName: { type: String, default: "Unknown Candidate" },
          position: { type: String, default: "Position not specified" },
          hireDate: { type: Date, default: Date.now },
          testimonial: { type: String, default: "" },
          status: {
            type: String,
            enum: ["Hired", "Interviewed", "Not Selected"],
            default: "Hired",
          },
        },
      ],
      default: [
        {
          candidateName: "Unknown Candidate",
          position: "Position not specified",
          hireDate: new Date(),
          testimonial: "",
          status: "Hired",
        },
        {
          candidateName: "Unknown Candidate",
          position: "Position not specified",
          hireDate: new Date(),
          testimonial: "",
          status: "Hired",
        },
      ],
    },
    bookmarkedTalents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CandidateUserProfile" },
    ],
    hiringIntrests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CandidateUserProfile" },
    ],
  },
  { timestamps: true }
);

export const adminProfileSchema = new mongoose.Schema(
  {
    adminInfo: { type: mongoose.Schema.ObjectId, ref: "Admin" },
    name: { type: String },
    email: { type: String, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg",
    },
    profilePictureDetails: {
      publicId: { type: String },
      url: { type: String }
    },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

