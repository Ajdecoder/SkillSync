import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) throw new Error("GROQ_API_KEY is missing in .env");

export const llm = new ChatGroq({
  apiKey: groqApiKey,
  model: "llama-3.1-8b-instant",
  temperature: 0.3,
});