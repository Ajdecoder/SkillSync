import { Candidate, Recruiter } from "../db/database.js";

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = await Candidate.findById(userId);

    if (!user) {
      user = await Recruiter.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error finding user by ID:", err);
    res.status(500).json({ message: "Error finding user. Please try again later." });
  }
};
    
