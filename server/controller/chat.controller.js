import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CandidateUserProfile, OpportunityCollection } from '../db/database.js';

const getUserProfile = async (userId) => {
  if (userId) {
    return await CandidateUserProfile.findById(userId).lean();
  }
  console.log("Invalid or missing User ID:", userId);
  return null;
};

const findJobs = async (userProfile) => {
  let jobQuery = { "skills.skillName": { $in: ["React.js"] } };
  if (userProfile && Array.isArray(userProfile.skills)) {
    jobQuery = { "skills.skillName": { $in: userProfile.skills } };
  }
  try {
    const jobs = await OpportunityCollection.find(jobQuery).limit(5);
    if (jobs.length > 0) {
      return `Here are some job listings that match your profile:\n` +
        jobs.map(job => `🔹 ${job.title} at ${job.company_name} (${job.location})`).join("\n") +
        "\nWould you like to refine your search?";
    }
    return "No relevant jobs found. Try expanding your search criteria!";
  } catch (err) {
    console.error("Error fetching jobs:", err);
    throw new Error("Failed to fetch job listings");
  }
};

const findCandidates = async (hireQuery_candidate) => {
  // Build the query based on the input skills
  let hireQuery = { "skills": { $in: hireQuery_candidate } };
  if (hireQuery_candidate && Array.isArray(hireQuery_candidate)) {
    hireQuery = { "skills": { $in: hireQuery_candidate } };
  }

  try {
    const candidates = await CandidateUserProfile.find(hireQuery).limit(5);
    if (candidates.length > 0) {
      return `Here are some candidates that match your hiring criteria:\n` +
        candidates.map(candidate =>
          `🔹 ${candidate.name} - ${candidate.skills.map(s => s.skillName).join(", ")}`
        ).join("\n") +
        "\nWould you like to refine your search?";
    }
    return "No relevant candidates found. Try expanding your search criteria!";
  } catch (err) {
    console.error("Error fetching candidates:", err);
    throw new Error("Failed to fetch candidate listings");
  }
};

const extractSkillsFromMessage = async (userMessage, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const extractPrompt = `
You are a skill extraction AI. Given a sentence like "Find me a Python developer" or "I want to hire someone with React and Node.js experience",
extract and return only the relevant technical skills as a clean JSON array. For example:
Input: "Find me a Python developer"
Output: ["Python"]

Input: "Looking for someone skilled in React, Node.js, and MongoDB"
Output: ["React", "Node.js", "MongoDB"]

Now extract skills from: "${userMessage}"
Return only the JSON array.`;

  const result = await model.generateContent(extractPrompt);
  let rawText = result?.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") || "[]";

  // 🧼 Clean: Strip markdown code block (like ```json ... ```)
  rawText = rawText.trim();
  if (rawText.startsWith("```")) {
    rawText = rawText.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
  }

  try {
    const extractedSkills = JSON.parse(rawText);
    return Array.isArray(extractedSkills) ? extractedSkills : [];
  } catch (err) {
    console.error("Failed to parse skill extraction response:", rawText);
    return [];
  }
};




const generateAIResponse = async (userMessage, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  let aiPrompt = `You are an AI assistant for a job platform called SkillSync. SkillSync connects freelancers with recruiters for short-term or contract work.

  Answer questions related to job searches, skill improvement, hiring, resume optimization, and freelance opportunities.
  
  User's question: "${userMessage}"
  
  Important: Do not use asterisks (*, **, ***) in your response. Instead, use visually appealing emojis to enhance formatting.`;


  const result = await model.generateContent(aiPrompt);
  return result?.response?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "No response available.";
};

export const skillSyncAI = async (req, res) => {
  try {
    console.log('User Query:', req.body);
    const geminiApiKey = process.env.GEMINI_API;
    if (!geminiApiKey) {
      return res.status(400).json({ error: 'API key is missing in the environment variables' });
    }

    const userMessage = req.body.text || "Find me a React.js job.";
    const userId = req.body.id;
    const userProfile = await getUserProfile(userId);

    // If looking for a job
    if (userMessage.toLowerCase().includes("job")) {
      const jobResponse = await findJobs(userProfile);
      return res.status(200).json({ response: jobResponse });
    }

    // If looking to hire
    if (userMessage.toLowerCase().includes("hire") || userMessage.toLowerCase().includes("developer")) {
      const extractedSkills = await extractSkillsFromMessage(userMessage, geminiApiKey);
      if (extractedSkills.length === 0) {
        return res.status(200).json({ response: "Couldn't detect any specific skill. Please try being more specific." });
      }
      const candidateResponse = await findCandidates(extractedSkills);
      return res.status(200).json({ response: candidateResponse });
    }

    // Fallback: General chat AI
    const aiResponse = await generateAIResponse(userMessage, geminiApiKey);
    res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Error in AI agent:', error.message || error);
    res.status(500).json({ error: 'Failed to process the request', details: error.message || 'An unexpected error occurred' });
  }
};


