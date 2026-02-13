// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { llmWithTools } from "./llm.js";
import { getUserProfile } from "./helpers/getUserProfile.js";
import { findJobsByRoleTool, findJobsTool } from "./tools/findJobs.js";
import { findCandidatesTool } from "./tools/findCandidates.js";
import { messages } from "./services/prompt.js";

export const skillSyncAI = async (req, res) => {
  try {
    const userMessage = req.body?.text || "Hello!";
    const userId = req.body?.id;

    const userProfile =
      (await getUserProfile(userId)) || { role: "guest", skills: [] };

    console.log("bot got profile here:", userProfile)

    const userSkills = (userProfile?.skills || []).map(
      (s) => s.skillName || s
    );

    console.log("bot got skills here:", userSkills)

    const formattedMessages = await messages.formatMessages({
      usermessage: userMessage
    });

    const response = await llmWithTools.invoke(formattedMessages);
    console.log('RESPONSE:', response)

    if (response.tool_calls?.length) {
      const { name, args } = response.tool_calls[0];
      console.log(name, args)

      let toolResult = "";

      if (name === "find_jobs") {
        toolResult = await findJobsTool.invoke({
          skills: args?.skills?.length ? args.skills : userSkills,
        });
      }

      if (name === "find_jobs_by_role") {
        toolResult = await findJobsByRoleTool.invoke({
          skills: args?.skills?.length ? args.skills : userSkills,
        });
      }

      if (name === "find_candidates") {
        toolResult = await findCandidatesTool.invoke({
          skills: args?.skills || [],
        });
      }

      return res.status(200).json({
        response: toolResult,
        user_skills: userSkills,
      });
    }

    return res.status(200).json({
      response: response.content || "🙂",
      user_skills: userSkills,
    });

  } catch (err) {
    console.error("Agent error:", err);
    return res.status(500).json({
      error: "Agent failed",
      details: err.message,
    });
  }
};
