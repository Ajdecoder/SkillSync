import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();
const geminiApiKey = process.env.GEMINI_API;
if (!geminiApiKey) throw new Error("GEMINI_API key is missing in .env");

export const llm = new ChatGoogleGenerativeAI({
  apiKey: geminiApiKey,
  model: "gemini-2.0-flash",
  temperature: 0.3,
});
