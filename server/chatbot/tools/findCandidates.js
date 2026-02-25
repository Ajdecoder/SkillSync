import { CandidateUserProfile } from "../../db/database.js";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const findCandidatesTool = tool(
  async ({ skills }) => {
    if (!skills || skills.length === 0) {
      return "No relevant candidates found.";
    }

    try {
      const candidates = await CandidateUserProfile.find({
        "skills.skillName": { $in: skills }
      })
        .limit(5)
        .lean();

        console.log("Candidates found:", candidates);

      if (!candidates.length) {
        return "No relevant candidates found. Try expanding your search criteria!";
      }

      return candidates
        .map(
          (c) =>
            `🔹 ${c.name} - ${c.skills
              .map((s) => s.skillName)
              .join(", ")}`
        )
        .join("\n");
    } catch (err) {
      console.error("Error fetching candidates:", err);
      return "Failed to fetch candidates.";
    }
  },
  {
    name: "find_candidates",
    description:
      "Find suitable candidates based on a list of required skills",
    schema: z.object({
      skills: z.array(z.string().toLowerCase()).describe("List of skills to search candidates for")
    })
  }
);
