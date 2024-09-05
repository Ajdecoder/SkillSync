import bcrypt from "bcrypt";
import {
  CompanyPostCollection,
  CompanyGetCollection,
  User,
} from "../db/database.js";

export const getRequirement = async (req, res) => {
  const {
    company_name,
    company_website,
    email,
    ph_no,
    available_expert,
    from,
    to,
    desc_requirement,
    address,
  } = req.body;

  const documents = req.files["documents"]
    ? req.files["documents"][0].path.replace("public\\", "")
    : null;
  const cover_Img = req.files["cover_Img"]
    ? req.files["cover_Img"][0].path.replace("public\\", "")
    : null;

  try {
    const newReq = new CompanyGetCollection({
      company_name,
      company_website,
      email,
      ph_no,
      available_expert,
      from,
      to,
      desc_requirement,
      address,
      documents,
      cover_Img,
    });

    await newReq.save();
    res
      .status(201)
      .json({ message: "Get Post created successfully", hiring: true });
  } catch (err) {
    console.error("Error:", err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to create post. Please try again later." });
  }
};

export const postRequirement = async (req, res) => {
  const {
    company_name,
    company_website,
    email,
    ph_no,
    available_expert,
    from,
    to,
    desc_requirement,
    address,
    Status,
  } = req.body;

  const documents = req.files["documents"]
    ? req.files["documents"][0].path.replace("public\\", "")
    : null;
  const cover_Img = req.files["cover_Img"]
    ? req.files["cover_Img"][0].path.replace("public\\", "")
    : null;

  try {
    const newPost = new CompanyPostCollection({
      company_name,
      company_website,
      email,
      ph_no,
      available_expert,
      from,
      to,
      desc_requirement,
      address,
      documents,
      cover_Img,
      Status,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", required: true });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Failed to create post. Please try again later." });
  }
};

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

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed. Please try again later." });
  }
};

export const greeting = (req, res) => {
  res.json({ msg: "hello world" });
};

export const allRequirements = async (req, res) => {
  try {
    const data1 = await CompanyGetCollection.find();

    const data2 = await CompanyPostCollection.find();

    const data = [...data1, ...data2];

    res.json({ data });
  } catch (error) {
    console.error(error.message);
  }
};
