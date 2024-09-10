import bcrypt from "bcrypt";
import { User } from "../db/database.js";

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = await user.generateToken();

    res.cookie("jwttoken", token, {
      httpOnly: true,
    });

    // Send response with login details and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      id: user._id,
      user: { name: user.name, email: user.email },
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

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

    const token = await newUser.generateToken();

    res.cookie("jwttoken", token, {
      httpOnly: true,
    });

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
};

export const Delete = async (req, res) => {
  try {
    const { user } = req.body;
    const DeleteUser = await User.deleteOne({ user });

    res.status(200).json({ message: "User Deleted Successfully", deleted_user : DeleteUser });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed. Please try again later." });
  }
};

