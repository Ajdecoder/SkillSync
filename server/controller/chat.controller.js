import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

export const chatResponse = async (req, res) => {
  try {
    
    console.log('req:-------',req.body)
    const geminiApiKey = process.env.GEMINI_API;
    if (!geminiApiKey) {
      return res.status(400).json({ error: 'API key is missing in the environment variables' });
    }

    const userMessage = req.body.message || "Explain how AI works";

  
    
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    
    const result = await model.generateContent(userMessage);

    console.log('res:-----',result)

    
    const finalResult =
      typeof result.response?.text === 'function'
        ? await result.response.text()
        : result.response?.text || 'No response text available';

    
    res.status(200).json({ res: finalResult });
  } catch (error) {
    console.error('Error during chat response generation:', error.message || error);

    
    res.status(500).json({
      error: 'Failed to process the request',
      details: error.response?.data || error.message || 'An unexpected error occurred',
    });
  }
};
