import type { RunArgs } from "./BaseFlow";
import * as path from 'path'
import * as fs from 'fs/promises'
import { pickCodeFromMarkdown } from "../utils";

export class BaseStep {

  public name: string = '';

  public runArgs: RunArgs = {};

  setArgs (args: RunArgs) {
    this.runArgs = args;
  }

  async prepare (prompts: string[]): Promise<string[]> {
    throw new Error('Not implemented');
  }  

  async handle (response: string): Promise<void> {
  }
}



export class LoadReadMe extends BaseStep {
  public name: string = 'loadReadMe';

  public keyFile: string = 'codex.md';

  override async prepare (prompts: string[]): Promise<string[]> {
    if (!this.runArgs.dir) {
      return prompts;
    }
    const readmeFile = path.join(this.runArgs.dir, this.keyFile);
    const readme = await fs.readFile(readmeFile, 'utf8');
    
    return prompts.concat(readme);
  }
}

export class CreateFile extends BaseStep {
  public name: string = 'createFile';

  public keyFile: string = 'index.tsx';

  override async prepare (prompts: string[]): Promise<string[]> {
    
    return prompts.concat('just return file code content, without markdown, no need any other');
  }

  override async handle (response: string): Promise<void> {
    if (!this.runArgs.dir) {
      return;
    }
    fs.writeFile(
      path.join(this.runArgs.dir, this.keyFile),
      pickCodeFromMarkdown(response),
    )
  }
}
