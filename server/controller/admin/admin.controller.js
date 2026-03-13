export const AdminLogin = async (req, res) => {
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

    const refreshToken = await candidate.generateRefreshToken();

    res.cookie("jwttoken", token, {
      httpOnly: true,
      secure: true, // only over HTTPS
      sameSite: "None", // allow cross-site cookie sharing
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


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