import { safeInvoke } from "../../utils/safeInvoke.js";
import { llm } from "../services/llmService.js";
import parseJSON from "./parseJSON.js";

export const extractSkillsFromMessage = async (userMessage) => {
  const prompt = `Extract skills as a JSON array from this text: "${userMessage}" Return only the JSON array.`;
  try {
    const result = await safeInvoke(prompt);
    return parseJSON(result.content, []);
  } catch (err) {
    console.error("Skill extraction failed:", err);
    return [];
  }
};
