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

const findCandidates = async () => {
  let hireQuery = { "skills": { $in: ["Java"] } };
  try {
    const candidates = await CandidateUserProfile.find(hireQuery).limit(5);
    if (candidates.length > 0) {
      return `Here are some candidates that match your hiring criteria:\n` +
        candidates.map(candidate => `🔹 ${candidate.name} - ${candidate.skills.map(s => s.skillName).join(", ")}`).join("\n") +
        "\nWould you like to refine your search?";
    }
    return "No relevant candidates found. Try expanding your search criteria!";
  } catch (err) {
    console.error("Error fetching candidates:", err);
    throw new Error("Failed to fetch candidate listings");
  }
};

const generateAIResponse = async (userMessage, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  let aiPrompt = `You are an AI assistant for a job platform called SkillSync.\nSkillSync connects freelancers with recruiters for short-term or contract work.\nAnswer questions related to job searches, skill improvement, hiring, resume optimization, and freelance opportunities.\nHere is the user's question: "${userMessage}"`;
  
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
    console.log('User ID:', userId);
    const userProfile = await getUserProfile(userId);
    
    if (userMessage.toLowerCase().includes("job")) {
      const jobResponse = await findJobs(userProfile);
      return res.status(200).json({ response: jobResponse });
    }
    
    if (userMessage.toLowerCase().includes("hire")) {
      const candidateResponse = await findCandidates();
      return res.status(200).json({ response: candidateResponse });
    }
    
    const aiResponse = await generateAIResponse(userMessage, geminiApiKey);
    res.status(200).json({ response: aiResponse });
    
  } catch (error) {
    console.error('Error in AI agent:', error.message || error);
    res.status(500).json({ error: 'Failed to process the request', details: error.message || 'An unexpected error occurred' });
  }
};
