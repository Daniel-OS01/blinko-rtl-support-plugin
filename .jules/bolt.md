## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-17 - Optimize MutationObserver selector matching loops
**Learning:** Iterating over an array of selectors and calling `element.matches(s)` individually within a `MutationObserver` callback creates excessive Javascript-to-C++ boundary crossings, causing performance bottlenecks during frequent DOM updates.
**Action:** Use a pre-joined string of valid selectors (`joinedSelectors`) and call `element.matches(joinedSelectors)` once. This leverages the browser's native CSS engine to test all selectors simultaneously, significantly reducing overhead.
