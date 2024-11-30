import bcrypt from "bcrypt";
import { Candidate,Recruiter } from "../db/database.js";

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const accountType = await Candidate.findOne({ email }) || await Recruiter.findOne({ email });

    if (!accountType) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, accountType.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = await accountType.generateToken();

    res.cookie("jwttoken", token, {
      httpOnly: true,
    });


    return res.status(200).json({
      success: true,
      message: `Login successful`,
      id: accountType._id,
      accountInfo: { name: accountType.name, email: accountType.email, role:accountType.role },
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

export const CandidateRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: "email already registered" });
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

    res.cookie("jwttoken", token, {
      httpOnly: true,
    });

    res.status(201).json({
      message: "Candidate registered successfully",
      token: token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

export const RecruiterRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRecruiter = new Recruiter({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newRecruiter.save();

    const token = await newRecruiter.generateToken();

    res.cookie("jwttoken", token, {
      httpOnly: true,
    });

    res.status(201).json({
      message: "Recruiter registered successfully",
      token: token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

export const ForgotPass = async (req, res) => {
  try {
    const data = await Candidate.findOne({ email: req.body.email });
    const ResetPasswordToken = await data.generateForgetPassToken();
    res.status(200).send({
      success: true,
      ResetPasswordToken: ResetPasswordToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const Candidate = await Candidate.findOne(req.body.email);

    const password = Candidate.password;
    const password2 = req.body.password2;

    const changedPass = await Candidate.updateOne(
      { password: password },
      { $set: { password: password2 } }
    );

    console.log('pass changed', password)

    res.status(200).json({
      success: true,
      msg: "Password changed successfully",
      changedPass,
    });
  } catch (error) {
    console.error(error);
  }
};

export const Delete = async (req, res) => {
  try {
    const { _id } = req.body;
    const DeleteCandidate = await Candidate.deleteOne({ _id });

    res
      .status(200)
      .json({ message: "Candidate Deleted Successfully", deleted_Candidate: DeleteCandidate });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed. Please try again later." });
  }
};
