import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CandidateUserProfile, OpportunityCollection, RecruiterUserProfile } from '../db/database.js';

// Initialize Gemini AI globally
const geminiApiKey = process.env.GEMINI_API;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Fetch user profile by ID
const getUserProfile = async (userId) => {
  if (!userId) {
    console.log("Invalid or missing User ID:", userId);
    return null;
  }
  try {
    let profile = await CandidateUserProfile.findById(userId).lean();
    if (!profile) {
      profile = await RecruiterUserProfile.findById(userId).lean();
    }
    return profile || null;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
};

// Find job opportunities based on user profile
const findJobs = async (userProfile) => {
  const defaultQuery = { "skills.skillName": { $in: ["React.js"] } };
  const jobQuery = userProfile?.skills?.length
    ? { "skills.skillName": { $in: userProfile.skills } }
    : defaultQuery;

  try {
    const jobs = await OpportunityCollection.find(jobQuery).limit(5);
    if (jobs.length === 0) {
      return "No relevant jobs found. Try expanding your search criteria!";
    }
    return `Here are some job listings that match your profile:\n` +
      jobs.map(job => `🔹 ${job.title} at ${job.company_name} (${job.location})`).join("\n") +
      "\nWould you like to refine your search?";
  } catch (err) {
    console.error("Error fetching jobs:", err);
    throw new Error("Failed to fetch job listings");
  }
};

// Find candidates based on hiring criteria
const findCandidates = async (skills, experience) => {
  console.log(experience);
  if (!skills?.length) {
    return "No relevant candidates found. Try expanding your search criteria!";
  }

  const hireQuery = {
    skills: { $in: skills },
  };

  try {
    const candidates = await CandidateUserProfile.find(hireQuery).limit(5);
    if (candidates.length === 0) {
      return "No relevant candidates found. Try expanding your search criteria!";
    }
    return `Here are some candidates that match your hiring criteria:\n` +
      candidates.map(candidate =>
        `🔹 ${candidate.name} - ${candidate.skills.map(s => s.skillName).join(", ")}`
      ).join("\n") +
      "\nWould you like to refine your search?";
  } catch (err) {
    console.error("Error fetching candidates:", err);
    throw new Error("Failed to fetch candidate listings");
  }
};

// Extract skills from user message
const extractSkillsFromMessage = async (userMessage) => {
  if (!model) return [];

  const extractPrompt = `
You are a skill extraction AI. Given a sentence like "Find me a Python developer" or "I want to hire someone with React and Node.js experience",
extract and return only the relevant technical skills as a clean JSON array. For example:
Input: "Find me a Python developer."
Output: ["Python"]

Input: "Looking for someone skilled in React, Node.js, and MongoDB."
Output: ["React", "Node.js", "MongoDB"]

If the input contains typos or misspellings in skill names, correct them and include the corrected skills in the output.
Now extract skills from: "${userMessage}"
Return only the JSON array.`;

  try {
    const result = await model.generateContent(extractPrompt);
    let rawText = result?.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") || "[]";

    rawText = rawText.trim();
    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    }

    const extractedSkills = JSON.parse(rawText);
    return Array.isArray(extractedSkills) ? extractedSkills : [];
  } catch (err) {
    console.error("Failed to extract skills:", err);
    return [];
  }
};

const extractExperienceFromMessage = async (userMessage) => {

  if (!model) return 0;

  const extractPrompt = 'Your are an AI that extracts experience from a user message. Given a sentence like "I have 5 years of experience in React and Node.js", extract the number of years of experience as an integer. If no experience is mentioned, return 0.';
}

// Generate AI response for general queries
const generateAIResponse = async (userMessage) => {
  if (!model) return "AI model not initialized. Please check your API key.";

  const aiPrompt = `You are an AI assistant for a job platform called SkillSync. SkillSync connects freelancers with recruiters for short-term or contract work.

Answer questions related to job searches, skill improvement, hiring, resume optimization, and freelance opportunities.

User's question: "${userMessage}"

Important: Do not use asterisks (*, **, ***) in your response. Instead, use visually appealing emojis to enhance formatting.`;

  try {
    const result = await model.generateContent(aiPrompt);
    return result?.response?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "No response available.";
  } catch (err) {
    console.error("Error generating AI response:", err);
    return "Failed to generate a response. Please try again later.";
  }
};

// Main SkillSync AI handler
export const skillSyncAI = async (req, res) => {
  try {
    if (!geminiApiKey) {
      return res.status(400).json({ error: 'API key is missing in the environment variables' });
    }

    const userMessage = req.body.text || 'Say Greetings! How can I assist you today?';
    const userId = req.body.id;

    const userProfile = await getUserProfile(userId);

    if (userMessage.toLowerCase().includes("job")) {
      const jobResponse = await findJobs(userProfile);
      return res.status(200).json({ response: jobResponse });
    }

 
    if (["hire", "developer", "candidate"].some(k => userMessage.toLowerCase().includes(k))) {
      const extractedSkills = await extractSkillsFromMessage(userMessage);

      if (!extractedSkills.length) {
        return res.status(200).json({
          response: "Couldn't detect any specific skill requirements. Please specify the skills you're looking for."
        });
      }

      const candidateResponse = await findCandidates(extractedSkills);
      return res.status(200).json({ response: candidateResponse });
    }


    const aiResponse = await generateAIResponse(userMessage);
    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Error in AI agent:', error.message || error);
    res.status(500).json({ error: 'Failed to process the request', details: error.message || 'An unexpected error occurred' });
  }
};
