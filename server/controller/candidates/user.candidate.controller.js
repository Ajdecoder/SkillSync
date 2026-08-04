import bcrypt from "bcrypt";
import { Candidate, OpportunityCollection } from "../../db/database.js";
import { CandidateUserProfile } from "../../db/database.js";
import { loginCookieOptions } from "../../utils/cookiesConfig.js";

// Candidate Login
export const CandidateLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const candidate = await candidate?.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, candidate?.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password is incorrect" });
    }

    let candidateProfile = await CandidateUserProfile.findOne({
      candidateInfo: candidate?._id,
    });
    if (!candidateProfile) {
      candidateProfile = new CandidateUserProfile({
        candidateInfo: candidate?._id,
        email: candidate?.email,
        name: candidate?.name,
        role: candidate?.role,
      });

      await candidateProfile.save();
    }

    const token = await candidate?.generateToken();

    const refreshToken = await candidate?.generateRefreshToken();

    res.cookie("authToken", token, loginCookieOptions);


    return res.status(200).json({
      success: true,
      message: "Login successful",
      id: candidate?._id,
      accountInfo: {
        name: candidate?.name,
        email: candidate?.email,
        role: candidate?.role,
      },
      token,
      refreshToken,
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

  console.log('ceandi reg')
  const { name, email, password, role } = req.body;

  try {
    const existingCandidate = await CandidateUserProfile.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate already exists. Please log in instead of signing up." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newCandidate = new Candidate({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newcandidate?.save();

    let candidateProfile = await CandidateUserProfile.findOne({
      candidateInfo: newcandidate?._id,
    });

    if (!candidateProfile) {
      candidateProfile = new CandidateUserProfile({
        candidateInfo: newcandidate?._id,
        email,
        name,
        role,
      });

      await candidateProfile.save();
    }

    const token = await newcandidate?.generateToken();

    res.cookie("authToken", token, loginCookieOptions);


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
    const candidate = await candidate?.findOne({ email: req.body.email });
    if (!candidate) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = await candidate?.generateForgetPassToken();

    res.status(200).json({ success: true, resetToken });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ message: "Error processing request." });
  }
};

export const JobApply = async (req, res) => {
  const { userId, opportunityId } = req.body.payload;



  if (!userId || !opportunityId) {
    return res.status(400).json({ message: "User ID and Opportunity ID are required." });
  }

  try {
    const opportunity = await OpportunityCollection.findById(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found." });
    }

    if (opportunity?.candidatesApplied.includes(userId)) {
      return res.status(400).json({ message: "User has already applied for this opportunity?." });
    }

    opportunity?.candidatesApplied.push(userId);
    await opportunity?.save();

    res.status(200).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const RevertApplication = async (req, res) => {
  const { userId, opportunityId } = req.body;

  if (!userId || !opportunityId) {
    return res.status(400).json({ message: "User ID and Opportunity ID are required." });
  }

  try {
    const opportunity = await OpportunityCollection.findById(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found." });
    }

    const getIndexofId = opportunity?.candidatesApplied.indexOf(userId);
    opportunity?.candidatesApplied.splice(getIndexofId);
    await opportunity?.save();

    res.status(200).json({ message: "Application cancelled successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};