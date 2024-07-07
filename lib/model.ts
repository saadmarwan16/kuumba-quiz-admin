import { ChatOpenAI } from "@langchain/openai";
import { env } from "./env";

export const model = new ChatOpenAI({
  apiKey: env.OPENAI_API_KEY,
  temperature: 0.8,
});
