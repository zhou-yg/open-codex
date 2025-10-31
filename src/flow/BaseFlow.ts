import * as fs from 'fs';
import * as path from 'path';
import { BaseStep } from './BaseStep';
import { call } from '../models/deepseek';
import { getTokenCount } from '../utils';

export type Options = {
  prompts?: string[];
  systemPrompts?: string[];
}

export interface RunArgs {
  dir?: string;
}

class BaseFlow {
  public options: Options;

  public steps: BaseStep[] = [];

  constructor(options: Options, steps: BaseStep[]) {
    this.options = options;
    this.steps = steps;

  }

  public setSteps(steps: BaseStep[]) {
    this.steps = steps;
  }

  async process(args: RunArgs) {
    let index = 0;

    this.steps.forEach(step => {
      step.setArgs(args);
    })

    let prompts = this.options.prompts || [];

    for (const step of this.steps) {
      console.log(`${index}.step prepare ${step.name} start`);
      prompts = await step.prepare(prompts);
      // console.log(`${index}.step prepare ${step.name} end`);
    }

    console.log('prepare end:', prompts);

    const response = await call({
      systemPrompt: (this.options.systemPrompts || []).join('\n'),
      prompts,
      tools: [],
    })

    if (response) {
      for (const step of this.steps) {
        console.log(`${index}.step handle ${step.name} start`);
        await step.handle(response);
        // console.log(`${index}.step handle ${step.name} end`);
      }
    } else {
      console.log('No response from model', `r=${response}`);
    }

    console.log('end. cost tokens')
  }

  printTokens (prompts: string[]) {
    const r = getTokenCount(
      prompts.join('\n') + (this.options.systemPrompts?.join('') || '')
    )

    console.log('Total tokens:', r);
  }
}

export default BaseFlow;
