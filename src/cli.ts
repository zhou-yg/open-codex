#!/usr/bin/env node

import { Command } from 'commander';
import { version, description } from '../package.json';
import * as fs from 'fs';
import { createInDir } from './run';

const program = new Command();

program
  .name('open-codex')
  .description(description || 'A CLI tool built with TypeScript')
  .version(version || '1.0.0')
  .option('-d, --debug', 'enable debug mode')
  .option('-c, --config <path>', 'set config file path', './config.json');

program
  .command('create')
  .option('-p, --path <path>', 'set dir path')
  .description('run in a dir')
  .action((options) => {
    const targetPath = options.path;
    
    // 检查路径是否存在
    if (!fs.existsSync(targetPath)) {
      console.error(`错误：路径 "${targetPath}" 不存在`);
      process.exit(1);
    }

    // 检查是否是目录
    const stats = fs.statSync(targetPath);
    if (!stats.isDirectory()) {
      console.error(`错误："${targetPath}" 不是一个目录`);
      process.exit(1);
    }
      

    createInDir({ dir: targetPath })
  });

// 错误处理
program.showHelpAfterError('(使用 --help 查看可用命令)');

// 解析命令行参数
program.parse(process.argv);
