const fs = require('fs');
const file = 'src/services/rtlService.ts';
let code = fs.readFileSync(file, 'utf8');

// Step 1: Add cache properties to RTLService
code = code.replace(
  '  private isRTLEnabled: boolean = false;',
  '  private isRTLEnabled: boolean = false;\n  private validSelectorsCache = new Map<string, boolean>();\n  private dummyElement = document.createElement(\'div\');'
);

// Step 2: Update setupObserver logic
const oldLogic = `      // Build a safe matching function or list
      // We can't check 'matches' with invalid selectors without try-catch
      const safeSelectors: string[] = [];
      activeSelectors.forEach(s => {
          try {
              document.querySelector(s); // Just to test validity, or trust the loop below
              safeSelectors.push(s);
          } catch (e) {
              // Ignore invalid
          }
      });`;

const newLogic = `      // Build a safe matching function or list
      // We use a dummy element and cache to safely and efficiently test selector validity without DOM traversal
      const safeSelectors: string[] = [];
      activeSelectors.forEach(s => {
          let isValid = this.validSelectorsCache.get(s);
          if (isValid === undefined) {
              try {
                  this.dummyElement.matches(s);
                  isValid = true;
              } catch (e) {
                  isValid = false;
              }
              this.validSelectorsCache.set(s, isValid);
          }
          if (isValid) {
              safeSelectors.push(s);
          }
      });`;

code = code.replace(oldLogic, newLogic);

fs.writeFileSync(file, code);
console.log("Updated RTLService successfully");
