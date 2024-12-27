import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

export const chatResponse = async (req, res) => {
  try {
    const gemini_api_key = process.env.GEMINI_API;
    if (!gemini_api_key) {
      return res.status(400).json({ error: 'API key is missing in the environment variables' });
    }

    const genAI = new GoogleGenerativeAI(gemini_api_key);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = req.body.message || "Explain how AI works";

  
    const result = await model.generateContent(prompt);

  
    console.log("Full API response:", result);

  
    const finalResult = typeof result.response.text === 'function'
      ? await result.response.text()
      : result.response.text || 'No response text available';

  
    res.status(200).json({ res: finalResult });
  } catch (error) {
    console.error('Error during chat response generation:', error.response || error.message || error);
    res.status(500).json({ error: 'Failed to process the request', details: error.message });
  }
};
  