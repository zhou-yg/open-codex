import fs from 'fs';
import os from 'os';
import path from 'path';

// 获取 home 目录路径
const homeDir = os.homedir();
// 构建完整文件路径
const filePath = path.join(homeDir, 'open-codex', 'deepseek_api_key');

let apiKey = ''
try {
  // 读取文件内容
  apiKey = fs.readFileSync(filePath, 'utf8').trim();
} catch (error: any) {
  console.error('读取文件失败:', error.message);
}


export const deepseek_api_key = process.env.deepseek_api_key || apiKey;

if (!deepseek_api_key) {
  console.warn('警告: deepseek_api_key 未设置');
}