import { ChatGroq } from "@langchain/groq";
import { findJobsByRoleTool, findJobsTool } from "./tools/findJobs.js";
import { findCandidatesTool } from "./tools/findCandidates.js";
import { messages } from "./services/prompt.js";

export const llmWithTools = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.2,
  prompt: messages
}).bindTools([
  findJobsTool,
  findJobsByRoleTool,
  findCandidatesTool,
]);
