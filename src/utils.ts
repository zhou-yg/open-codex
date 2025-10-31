export function getTokenCount(text: string) {
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
  const otherChars = text.length - chineseChars.length;
  
  return Math.ceil(chineseChars.length / 2 + otherChars / 4);
}

export function pickCodeFromMarkdown (text: string) {

  const lines = text.split('\n');
  const codeBlocks: string[] = [];

  let currentLineNumber = 0;

  let startRowIndex = undefined;

  while (currentLineNumber < lines.length) {
    const line = lines[currentLineNumber];
    
    if (isCodeBlockStart(line)) {

      if (startRowIndex === undefined) {
        startRowIndex = currentLineNumber;
      } else {
        const codeBlock = lines.slice(startRowIndex + 1, currentLineNumber).join('\n');
        codeBlocks.push(codeBlock);
        startRowIndex = undefined;
      }
    }
    
    currentLineNumber++;
  }

  return codeBlocks;
}

function isCodeBlockStart(line: string): boolean {
  return line.trim().startsWith('```');
}
