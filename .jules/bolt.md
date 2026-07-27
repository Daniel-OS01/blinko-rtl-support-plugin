## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2025-02-17 - Optimize Text Parsing Loop Overheads
**Learning:** Using `Array.some()` closures, `String.substring()` memory allocations, and regex `.test()` operations inside character parsing loops causes significant execution overhead in hot paths like RTL detection.
**Action:** Replace functional array iteration and regex tests inside parsing loops with inline bounds-checks using direct integer comparisons (e.g., `code >= 0x0590 && code <= 0x05FF`), direct string character codes (`charCodeAt(i)`), and cache common ASCII check conditions to yield measurable speedups.
