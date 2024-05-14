import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { testRequirement } from "./controller/user.controller.js";
import userRoutes from './routes/user.Routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9002;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const route = express.Router();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
});

// Define a method to generate and return JWT token for a user
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
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

const User = mongoose.model("User", userSchema);

app.use('/requirements',userRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token using the user's generateToken method
    const token = await user.generateToken();

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token: token, // Send token back to the client
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token for the newly registered user
    const token = await newUser.generateToken();

    res.status(201).json({
      message: "User registered successfully",
      token: token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
