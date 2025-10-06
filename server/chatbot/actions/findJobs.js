import { OpportunityCollection } from "../../db/database.js";

export const findJobs = async (skills) => {
  const query = skills?.length
    ? { "skills.skillName": { $in: skills } }
    : { "skills.skillName": { $in: ["React.js"] } };

  try {
    const jobs = await OpportunityCollection.find(query).limit(5).lean();
    if (!jobs.length) return "No relevant jobs found. Try expanding your search criteria!";
    return jobs
      .map((job) => `🔹 ${job.title} at ${job.company_name} (${job.location})`)
      .join("\n");
  } catch (err) {
    console.error("Error fetching jobs:", err);
    throw new Error("Failed to fetch jobs");
  }
};
