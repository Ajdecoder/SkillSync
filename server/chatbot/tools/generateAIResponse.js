import { safeInvoke } from "../../utils/safeInvoke.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const generateAIResponse = async (userMessage) => {
  console.log('userMessage',userMessage)
  const messages = [
    new SystemMessage("Answer conversationally with emojis and friendly tone."),
    new HumanMessage(userMessage),
  ];

  const result = await safeInvoke(messages);
  return result.content || "No response";
};

export default generateAIResponse;
