import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // デフォルトはprocess.env["ANTHROPIC_API_KEY"]
});
