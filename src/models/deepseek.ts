
import OpenAI from "openai";
import { ChatCompletionTool } from "openai/resources/index";
import * as config from '../constants/config'

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: config.deepseek_api_key,
});

export async function call (args: {
  prompts: string[],
  systemPrompt: string,
  tools?: ChatCompletionTool[],
}) {

  const completion = await openai.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: args.systemPrompt, 
      },
      ...args.prompts.map(prompt => ({ role: "user", content: prompt }) as const),
    ],
    model: "deepseek-chat",

    tools: [],
  });

  console.log(completion.usage);

  return completion.choices[0].message.content;
}