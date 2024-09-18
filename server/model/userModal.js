import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from 'crypto'

dotenv.config();

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define a method to generate and return JWT token for a user
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        name: this.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  } catch (err) {
    console.error("JWT token generation error:", err);
    throw err;
  }
};

userSchema.methods.generateForgetPassToken = async function() {

  const Resettoken = crypto.randomBytes(140).toString('hex');
  return Resettoken

};
