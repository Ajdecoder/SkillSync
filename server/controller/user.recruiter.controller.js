import bcrypt from "bcrypt";
import { Recruiter, RecruiterUserProfile } from "../db/database.js";

// Recruiter Login
export const RecruiterLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if recruiter exists in the user table
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with stored password hash
    const passwordMatch = await bcrypt.compare(password, recruiter.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // Check if recruiter profile exists
    let recruiterProfile = await RecruiterUserProfile.findOne({ email });
    if (!recruiterProfile) {
      // If no profile exists, create a new recruiter profile with default values
      recruiterProfile = new RecruiterUserProfile({
        email,
        name: recruiter.name,
        role: recruiter.role,
        companyOverview: {
          name: "",
          description: "",
          website: "",
          socialLinks: {
            linkedin: "",
            twitter: "",
            facebook: "",
          },
        },
        jobListings: [],  // Default empty list of job listings
        teamMembers: [],  // Default empty list of team members
        recruitmentProcess: {
          description: "",
          timeline: "",
          interviewStages: [], // Default empty stages
          assessmentTypes: [], // Default empty assessment types
        },
        companyLocation: { city: "", state: "", country: "" },
        companyBenefits: [],  // Default empty list of benefits
        pastHires: [],  // Default empty past hires list
      });

      await recruiterProfile.save();
    }

    // Generate token for user
    const token = await recruiter.generateToken();

    // Set JWT token in cookies
    res.cookie("jwttoken", token, { httpOnly: true });

    // Send response with profile data and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      id: recruiter._id,
      accountInfo: {
        name: recruiter.name,
        email: recruiter.email,
        role: recruiter.role,
      },
      token,
      profile: recruiterProfile, // Send the profile data back
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

// Recruiter Registration
export const RecruiterRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new recruiter account
    const newRecruiter = new Recruiter({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newRecruiter.save();

    // Automatically create the recruiter's profile with default values
    const recruiterProfile = new RecruiterUserProfile({
      email,
      name,  // Using the name from the recruiter account
      role,  // Using the role from the recruiter account
      companyOverview: {
        name: "",
        description: "",
        website: "",
        socialLinks: {
          linkedin: "",
          twitter: "",
          facebook: "",
        },
      },
      jobListings: [],  // Default empty job listings
      teamMembers: [],  // Default empty team members
      recruitmentProcess: {
        description: "",
        timeline: "",
        interviewStages: [],  // Default empty interview stages
        assessmentTypes: [],  // Default empty assessment types
      },
      companyLocation: { city: "", state: "", country: "" },
      companyBenefits: [],  // Default empty benefits
      pastHires: [],  // Default empty past hires list
    });

    // Save the recruiter profile to the database
    await recruiterProfile.save();

    // Generate a JWT token for the recruiter
    const token = await newRecruiter.generateToken();

    // Send the token as a cookie
    res.cookie("jwttoken", token, { httpOnly: true });

    // Respond with success message and the token
    res.status(201).json({
      message: "Recruiter registered successfully",
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
};
