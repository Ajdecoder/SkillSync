import { CandidateUserProfile, RecruiterUserProfile } from "../../db/database.js";

export const getUserProfile = async (userId) => {
  if (!userId) return null;
  try {
    let profile = await CandidateUserProfile.findById(userId).lean();
    if (profile) return { ...profile, role: "candidate" };

    profile = await RecruiterUserProfile.findById(userId).lean();
    if (profile) return { ...profile, role: "recruiter" };

    return null;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
};
