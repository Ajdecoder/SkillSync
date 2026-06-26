import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";


export const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["recruiter", "candidate", "admin"],
  },
  recruiterProfile: { type: mongoose.Schema.ObjectId, ref: "RecruiterUserProfile" },
  candidateProfile: { type: mongoose.Schema.ObjectId, ref: "CandidateUserProfile" },
});

// Define a method to generate and return JWT token for a user
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        name: this.name,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
  } catch (err) {
    console.error("JWT token generation error:", err);
    throw err;
  }
};

userSchema.methods.generateRefreshToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );
  } catch (err) {
    console.error("Refresh token generation error:", err);
    throw err;
  }
};

userSchema.methods.generateForgetPassToken = function (req, res) {
  const Resettoken = crypto.randomBytes(140).toString("hex");
  return Resettoken;
}
