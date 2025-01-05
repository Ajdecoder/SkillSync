import bcrypt from "bcrypt";
import { Candidate } from "../db/database.js";
import { CandidateUserProfile } from "../db/database.js";

export const CandidateLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if candidate exists in the user table
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with stored password hash
    const passwordMatch = await bcrypt.compare(password, candidate.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // Check if candidate profile exists
    let candidateProfile = await CandidateUserProfile.findOne({ email });
    if (!candidateProfile) {
      // If no profile exists, create a new candidate profile with default values
      candidateProfile = new CandidateUserProfile({
        email,
        name: candidate.name,
        role: candidate.role,
        skills: [],
        experience: [],
        education: [],
        location: {
          city: "",
          state: "",
          country: "",
        },
        preferences: {
          jobType: "",
          industry: "",
          salaryRange: { min: 0, max: 0 },
        },
        about: "",
        socialLinks: {
          linkedin: "",
          github: "",
          portfolio: "",
        },
        portfolio: [],
        certifications: [],
        languages: [],
        awards: [],
        availabilityStatus: true,
        resume: "",
        volunteerExperience: [],
        workEnvironment: "", // default work environment
      });

      await candidateProfile.save();
    }

    // Generate token for user
    const token = await candidate.generateToken();

    // Set JWT token in cookies
    res.cookie("jwttoken", token, { httpOnly: true });

    // Send response with profile data and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      id: candidate._id,
      accountInfo: {
        name: candidate.name,
        email: candidate.email,
        role: candidate.role,
      },
      token,
      profile: candidateProfile, // Send the profile data back
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

// Candidate Registration
export const CandidateRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCandidate = new Candidate({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newCandidate.save();

    const token = await newCandidate.generateToken();

    res.cookie("jwttoken", token, { httpOnly: true });

    res.status(201).json({
      message: "Candidate registered successfully",
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

// Additional Candidate operations (e.g., Forgot Password, Reset Password, etc.)
export const CandidateForgotPassword = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ email: req.body.email });
    const resetToken = await candidate.generateForgetPassToken();

    res.status(200).json({ success: true, resetToken });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ message: "Error processing request." });
  }
};
