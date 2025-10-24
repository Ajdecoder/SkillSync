import { llm } from "../services/llmService.js";

const generateAIResponse = async (userMessage) => {
  const prompt = `
Answer conversationally with emojis and friendly tone:
"${userMessage}"
  `;
  const result = await llm.invoke(prompt);
  return result.content || "No response";
};

export default generateAIResponse