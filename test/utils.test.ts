import { pickCodeFromMarkdown } from "../src/utils"


describe('Utility Functions', () => {


  it('pickCodeFromMarkdown', () => {
    const markdown = `
我将为您创建一个使用React、TypeScript和Antd的Modal组件，包含姓名和密码两个输入字段，并在取消时显示二次确认。

\`\`\`typescript
import React, { useState } from 'react';

export default MyModal;
\`\`\`
    `

    const rows = pickCodeFromMarkdown(markdown);

    expect(rows.length).toBe(1);
  })
})