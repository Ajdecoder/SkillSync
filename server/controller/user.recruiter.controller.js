import bcrypt from "bcrypt";
import { Recruiter, RecruiterUserProfile } from "../db/database.js";


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
    
    const recruiterProfile = new RecruiterUserProfile({
      recruiterInfo: newRecruiter._id ,
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
    
    delete recruiterProfile.recruiterInfo.password,
    await recruiterProfile.save();
    
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

export const RecruiterLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, recruiter.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "email or password is incorrect" });
    }

    let recruiterProfile = await RecruiterUserProfile.findOne({ email });
    if (!recruiterProfile) {
      const recruiterProfile = new RecruiterUserProfile({
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

    const token = await recruiter.generateToken();

    res.cookie("jwttoken", token, { httpOnly: true });

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
      profile: recruiterProfile,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};