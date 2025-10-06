import { llm } from "../services/llmService.js";

export const generateAIResponse = async (userMessage) => {
  const prompt = `Answer this user query conversationally with emojis and a friendly tone: "${userMessage}"`;
  try {
    const result = await llm.invoke(prompt);
    return result.content || "No response";
  } catch (err) {
    console.error("Error in AI response:", err);
    return "Error generating response.";
  }
};
