import { createAgent } from "langchain";
import { tools } from "./llm";

const agent = createAgent({
  model: llmWithTools,
  tools: tools,
  systemPrompt: "You are a helpful assistant that can access job and candidate information.",
});
