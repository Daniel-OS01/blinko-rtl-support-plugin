## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2024-05-18 - [Text Processing Iteration Performance]
**Learning:** For high-frequency text-processing hot paths (like RTL detection sampling), using a standard \`for\` loop with \`charCodeAt()\` and direct integer evaluation for numeric boundaries is drastically faster than iterating via \`for...of\` (which allocates a new string for each character) and checking via \`RegExp.test\` or array iteration (\`Array.some\`).
**Action:** Next time there is heavy text iteration, avoid object/string allocation where possible and utilize \`charCodeAt()\` integer bounds checking.
