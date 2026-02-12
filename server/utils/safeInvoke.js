import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { llm } from "../chatbot/services/llmService.js";

export async function safeInvoke(input) {

    console.log('input here:',input)

  // If string → safest path
  if (typeof input === "string") {
    return llm.invoke(input);
  }

  if (!Array.isArray(input)) {
    throw new Error("safeInvoke expects string or array");
  }

 const messages = input
  .filter((msg) => msg !== null && msg !== undefined)
  .map((msg) => {
    if (
      msg instanceof HumanMessage ||
      msg instanceof SystemMessage ||
      msg instanceof AIMessage
    ) {
      return msg;
    }

    if (typeof msg === "string") {
      return new HumanMessage(msg);
    }

    if (typeof msg === "object") {
      if (msg.role === "system") {
        return new SystemMessage(msg.content ?? "");
      }
      if (msg.role === "user") {
        return new HumanMessage(msg.content ?? "");
      }
      if (msg.role === "assistant") {
        return new AIMessage(msg.content ?? "");
      }
    }

    console.error("🚨 Dropping invalid LLM message:", msg);
    throw new Error("Invalid message passed to LLM");
  });

  return llm.invoke(messages);
}
