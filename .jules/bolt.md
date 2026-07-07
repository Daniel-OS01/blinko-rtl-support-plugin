## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Optimize Text Parsing Loops
**Learning:** Using inline regex literals (e.g., `/\s/`) and higher-order array closures like `.some()` or string allocations (`.substring()`) inside hot character-by-character iteration loops introduces massive execution overhead and garbage collection pauses.
**Action:** Replace string slicing with mathematical length limits, cache regex constants statically, and use flat `for` loops with direct character code integer bounds checking (`charCodeAt`) for measurable speedups (~5x faster) in frequent parsing paths like `CharacterCodeStrategy`.
