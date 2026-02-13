import { llm } from "../services/llmService.js";
import parseJSON from "../helpers/parseJSON.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { safeInvoke } from "../../utils/safeInvoke.js";

export const decideAction = async (userMessage) => {
  const messages = [
    new SystemMessage(`
You are a decision-making AI for SkillSync.

Detect intent and extract filters.

Actions:
- find_jobs_by_role → when role/title is mentioned
- find_jobs_by_skill → when skills/tech is mentioned
- find_candidates
- general

Return ONLY JSON.
    `),
    new HumanMessage(userMessage),
  ];

  try {
    const result = await safeInvoke(messages);
    return parseJSON(result.content, { action: "general" });
  } catch (err) {
    console.error("Decision error:", err);
    return { action: "general" };
  }
};


export const decideActionWithRole = async (userMessage, userProfile) => {
  const decision = await decideAction(userMessage);

  if (
    decision.action.startsWith("find_jobs") &&
    userProfile.role !== "candidate"
  ) {
    return {
      action: "unauthorized",
      message: "Only candidates can search for jobs."
    };
  }

  if (
    decision.action === "find_candidates" &&
    userProfile.role !== "recruiter"
  ) {
    return {
      action: "unauthorized",
      message: "Only recruiters can search candidates."
    };
  }

  return decision;
};
