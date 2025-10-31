import { commonSysPrompts } from "../constants/prompts";
import BaseFlow from "./BaseFlow";
import { CreateFile, LoadReadMe } from "./BaseStep";


export const createFileFlow = new BaseFlow(
  {
    prompts: [],
    systemPrompts: [
      ...commonSysPrompts,
    ],
  },
  [
    new LoadReadMe(),
    new CreateFile(),
  ],
)