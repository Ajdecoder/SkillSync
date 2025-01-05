import bcrypt from "bcrypt";
import { Recruiter, RecruiterUserProfile } from "../db/database.js";

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
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
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
        jobListings: [],
        teamMembers: [],
        recruitmentProcess: {
          description: "",
          timeline: "",
          interviewStages: [],
          assessmentTypes: [],
        },
        companyLocation: { city: "", state: "", country: "" },
        companyBenefits: [],
        pastHires: [],
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
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

// Recruiter Registration
export const RecruiterRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = new Recruiter({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newRecruiter.save();

    const token = await newRecruiter.generateToken();

    res.cookie("jwttoken", token, { httpOnly: true });

    res.status(201).json({
      message: "Recruiter registered successfully",
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};
