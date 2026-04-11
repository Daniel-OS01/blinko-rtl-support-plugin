const fs = require('fs');

let content = fs.readFileSync('tests/services/uiuxService.test.ts', 'utf8');

content = content.replaceAll(
  "closeBtn.click();",
  "closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));"
);

content = content.replaceAll(
  "backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));",
  "backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: 10, clientY: 10 }));"
);

fs.writeFileSync('tests/services/uiuxService.test.ts', content);
