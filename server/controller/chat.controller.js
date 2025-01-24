import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

export const chatResponse = async (req, res) => {
  try {
    // Retrieve API key from environment variables
    const geminiApiKey = process.env.GEMINI_API;
    if (!geminiApiKey) {
      return res.status(400).json({ error: 'API key is missing in the environment variables' });
    }

    // Predefined responses for common questions
    const predefinedResponses = {
      "How to post a job?": "To post a job, go to the 'Add Opportunity' page and fill in the details.",
      "How to update my profile?": "Go to your dashboard, click on 'Edit Profile', and make changes.",
      "What is SkillSync?": "SkillSync connects businesses with skilled professionals for flexible work opportunities.",
    };

    // Extract the user message from the request body
    const userMessage = req.body.message || "Explain how AI works";

    // Check if the message has a predefined response
    if (predefinedResponses[userMessage]) {
      return res.status(200).json({ res: predefinedResponses[userMessage] });
    }

    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content using the AI model
    const result = await model.generateContent(userMessage);

    // Safely handle and extract the response text
    const finalResult =
      typeof result.response?.text === 'function'
        ? await result.response.text()
        : result.response?.text || 'No response text available';

    // Return the AI-generated response
    res.status(200).json({ res: finalResult });
  } catch (error) {
    console.error('Error during chat response generation:', error.message || error);

    // Handle errors gracefully
    res.status(500).json({
      error: 'Failed to process the request',
      details: error.response?.data || error.message || 'An unexpected error occurred',
    });
  }
};
