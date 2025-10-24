import { CandidateUserProfile } from "../../db/database.js";

export const findCandidates = async (skills) => {
  if (!skills?.length) return "No relevant candidates found.";

  try {
    const candidates = await CandidateUserProfile.find({ "skills.skillName": { $in: skills } })
      .limit(5)
      .lean();

    if (!candidates.length) return "No relevant candidates found. Try expanding your search criteria!";

    return candidates
      .map((c) => `🔹 ${c.name} - ${c.skills.map((s) => s.skillName).join(", ")}`)
      .join("\n");
  } catch (err) {
    console.error("Error fetching candidates:", err);
    throw new Error("Failed to fetch candidates");
  }
};
