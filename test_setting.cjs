const fs = require('fs');
const content = fs.readFileSync('src/setting.tsx', 'utf8');
const lines = content.split('\n');

const disabledLines = lines.reduce((acc, line, i) => {
  if (line.includes('disabled={')) {
    acc.push(i + 1);
  }
  return acc;
}, []);

disabledLines.forEach(lineNum => {
  let btnStart = lineNum;
  while (btnStart > 0 && !lines[btnStart - 1].includes('<button') && !lines[btnStart - 1].includes('<input') && !lines[btnStart - 1].includes('<select') && !lines[btnStart - 1].includes('<textarea')) {
    btnStart--;
  }
  let btnEnd = lineNum;
  while (btnEnd < lines.length && !lines[btnEnd - 1].includes('>')) {
    btnEnd++;
  }
  console.log(`Line ${lineNum}:`);
  console.log(lines.slice(Math.max(0, btnStart - 1), Math.min(lines.length, btnEnd)).join('\n'));
  console.log('-'.repeat(40));
});
