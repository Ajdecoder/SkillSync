import bcrypt from "bcrypt";
import { Candidate } from "../db/database.js";
import { CandidateUserProfile } from "../db/database.js";

// Candidate Login
export const CandidateLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, candidate.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    let candidateProfile = await CandidateUserProfile.findOne({
      candidateInfo: candidate._id,
    });
    if (!candidateProfile) {
      candidateProfile = new CandidateUserProfile({
        candidateInfo: candidate._id,
        email: candidate.email,
        name: candidate.name,
        role: candidate.role,
      });

      await candidateProfile.save();
    }

    const token = await candidate.generateToken();

    res.cookie("jwttoken", token, { httpOnly: true });

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
      profile: candidateProfile,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

// Candidate Register
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

    let candidateProfile = await CandidateUserProfile.findOne({
      candidateInfo: newCandidate._id,
    });

    if (!candidateProfile) {
      candidateProfile = new CandidateUserProfile({
        candidateInfo: newCandidate._id,
        email,
        name,
        role,
      });

      await candidateProfile.save();
    }

    const token = await newCandidate.generateToken();

    res.cookie("jwttoken", token, { httpOnly: true });

    return res.status(201).json({
      message: "Candidate registered successfully",
      token,
      profile: candidateProfile,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

// Candidate Forgot Password
export const CandidateForgotPassword = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ email: req.body.email });
    if (!candidate) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = await candidate.generateForgetPassToken();

    res.status(200).json({ success: true, resetToken });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ message: "Error processing request." });
  }
};
