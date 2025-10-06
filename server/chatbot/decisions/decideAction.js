import { llm } from "../services/llmService.js";
import parseJSON from "../helpers/parseJSON.js";

export const decideAction = async (userMessage) => {
  const prompt = `
You are a decision-making AI for SkillSync.
Classify this user message into one of:
- "find_jobs" → if user wants jobs
- "find_candidates" → if user wants to hire
- "general" → all other queries

Also extract relevant skills if action = "find_candidates".

Return ONLY a JSON object like:
{ "action": "find_jobs" }
or
{ "action": "find_candidates" }
or
{ "action": "general" }

User message: "${userMessage}"
  `;
  try {
    const result = await llm.invoke(prompt);
    return parseJSON(result.content, { action: "general", skills: [] });
  } catch (err) {
    console.error("Decision error:", err);
    return { action: "general", skills: [] };
  }
};

export const decideActionWithRole = async (userMessage, userProfile) => {
  const decision = await decideAction(userMessage);

  let finalDecision = { action: "general", message: "Your request could not be processed." };

  if (decision.action === "find_jobs") {
    finalDecision =
      userProfile.role === "candidate"
        ? decision
        : { action: "unauthorized", message: "Only candidates can search for jobs." };
  } else if (decision.action === "find_candidates") {
    finalDecision =
      userProfile.role === "recruiter"
        ? decision
        : { action: "unauthorized", message: "Only employers can hire candidates." };
  }

  return finalDecision;
};
