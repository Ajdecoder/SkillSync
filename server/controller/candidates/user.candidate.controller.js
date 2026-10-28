import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Candidate, OpportunityCollection, Recruiter } from "../../db/database.js";
import { CandidateUserProfile } from "../../db/database.js";
import { loginCookieOptions } from "../../utils/cookiesConfig.js";

// Candidate Login
export const CandidateLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const candidate = await Candidate?.findOne({ email });
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
    await newCandidate?.save();

    let candidateProfile = await CandidateUserProfile.findOne({
      candidateInfo: newCandidate?._id,
    });

    if (!candidateProfile) {
      candidateProfile = new CandidateUserProfile({
        candidateInfo: newCandidate?._id,
        email,
        name,
        role,
      });

      await candidateProfile.save();
    }

    const token = await newCandidate?.generateToken();

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
    const email = req.body.email?.trim();
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user =
      (await Candidate.findOne({ email })) ||
      (await Recruiter.findOne({ email }));
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account exists for that email, a reset link has been sent.",
      });
    }

    const resetToken = user.generateForgetPassToken();
    await user.save();

    const resetUrl = new URL(
      "/reset-password",
      process.env.CLIENT_URL || "http://localhost:5173",
    );
    resetUrl.searchParams.set("token", resetToken);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset your SkillSync password",
      text: `Use this link to reset your password within one hour: ${resetUrl.toString()}`,
      html: `<p>We received a request to reset your SkillSync password.</p>
        <p><a href="${resetUrl.toString()}">Reset your password</a></p>
        <p>This link expires in one hour. If you did not request a reset, you can ignore this email.</p>`,
    });

    return res.status(200).json({
      success: true,
      message: "If an account exists for that email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot Password error:", error);
    return res.status(500).json({ message: "Unable to send a reset link. Please try again later." });
  }
};

export const CandidateResetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (
    typeof token !== "string" ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 30 ||
    !/^[a-zA-Z0-9]+$/.test(password)
  ) {
    return res.status(400).json({
      message: "Enter a valid reset token and a password of 8 to 30 letters or numbers.",
    });
  }

  try {
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const resetQuery = {
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    };
    const user =
      (await Candidate.findOne(resetQuery).select("+passwordResetToken +passwordResetExpires")) ||
      (await Recruiter.findOne(resetQuery).select("+passwordResetToken +passwordResetExpires"));

    if (!user) {
      return res.status(400).json({
        message: "This password reset link is invalid or has expired.",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Reset Password error:", error);
    return res.status(500).json({ message: "Unable to reset your password. Please try again later." });
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