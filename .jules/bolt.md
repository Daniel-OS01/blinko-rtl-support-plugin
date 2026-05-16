## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2025-02-19 - Optimize CharacterCodeStrategy Execution
**Learning:** In high-frequency text-processing hot paths (like RTL detection run on every DOM mutation), object allocations (e.g. `substring()`), string iterators (`for(const char of text)`), array `.some()` generation, and regex tests (`.test()`) create substantial overhead. Bypassing them with raw `for` loops, direct `charCodeAt()` evaluations, and manual integer bounds checks provides ~20x performance improvement.
**Action:** Use direct `charCodeAt()` and manual surrogate pair skipping instead of high-level string operations in text analysis algorithms.
