import { OpportunityCollection } from "../../db/database.js";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const findJobsTool = tool(
  async ({ skills }) => {
    const query =
      skills && skills.length
        ? { "skills.skillName": { $in: skills } }
        : { "skills.skillName": { $in: ["React.js"] } };

    try {
      const jobs = await OpportunityCollection.find(query)
        .limit(5)
        .lean();

      if (!jobs.length) {
        return "No relevant jobs found. Try expanding your search criteria!";
      }

      return jobs
        .map(
          (job) =>
            `🔹 ${job.title} at ${job.company_name} (${job.location})`
        )
        .join("\n");
    } catch (err) {
      console.error("Error fetching jobs:", err);
      return "Failed to fetch jobs.";
    }
  },
  {
    name: "find_jobs",
    description:
      "Find relevant job opportunities based on a list of skills",
    schema: z.object({
      skills: z
        .array(z.string())
        .optional()
        .describe("List of all skills to search jobs for")
    })
  }
);

export const findJobsByRoleTool = tool(
  async (input) => {
    
    console.log('input: ', input)

    let role = "";
    let skills = [];

    if (typeof input === "string") {
      try {
        const parsed = JSON.parse(input);
        role = parsed.role || "";
        skills = parsed.skills || [];
      } catch {
        // fallback: treat plain string as role
        role = input;
      }
    } else {
      role = input.role || "";
      skills = input.skills || [];
    }

    console.log("role:", role, "skills:", skills);

    let query = {};
    if (skills.length) {
      query = { "skills.skillName": { $in: skills } };
    } else if (role) {
      query = { title: { $regex: role, $options: "i" } };
    } else {
      return "No role or skills provided.";
    }

    const jobs = await OpportunityCollection.find(query).limit(5).lean();
    console.log('all retrieved jobs from db:',jobs)
    if (!jobs.length) return "No relevant jobs found.";

    return jobs.map(j => `🔹 ${j.title} at ${j.company_name} (${j.location})`).join("\n");
  },
  {
    name: "find_jobs_by_role",
    description: "Find jobs by role or skills",
    schema: z.object({
      role: z.string().optional(),
      skills: z.array(z.string()).optional().describe("List of skills to search for, optional if role is provided")
    })
  }
);
