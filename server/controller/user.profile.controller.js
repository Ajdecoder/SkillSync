import { CandidateUserProfile, RecruiterUserProfile } from "../db/database.js";

/**
 * Get User Profile by Email
 */
export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;

    // Check both candidate and recruiter profiles
    const candidateProfile = await CandidateUserProfile.findOne({ email });
    if (candidateProfile) {
      return res.status(200).json({ candidateProfile });
    }

    const recruiterProfile = await RecruiterUserProfile.findOne({ email });
    if (recruiterProfile) {
      return res.status(200).json({ recruiterProfile });
    }

    return res.status(404).json({ message: "User profile not found" });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

/**
 * Update User Profile by Email
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;


    // Check if the body contains data to update
    if (!Object.keys(updateData).length) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Update in both candidate and recruiter profiles
    const updatedCandidateProfile = await CandidateUserProfile.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );
    if (updatedCandidateProfile) {
      return res.status(200).json({
        message: "Candidate profile updated successfully",
        updatedProfile: updatedCandidateProfile,
      });
    }

    const updatedRecruiterProfile = await RecruiterUserProfile.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );
    if (updatedRecruiterProfile) {
      return res.status(200).json({
        message: "Recruiter profile updated successfully",
        updatedProfile: updatedRecruiterProfile,
      });
    }

    return res.status(404).json({ message: "User profile not found" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};
