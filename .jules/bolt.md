## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-05-19 - Combine matches checks
**Learning:** In a MutationObserver, executing `element.matches()` inside a JS loop for multiple valid selectors introduces high overhead due to repeated boundary crossing between JS and the browser's CSS engine. Combining valid selectors with `.join(', ')` and calling `matches()` once is significantly faster.
**Action:** Use a single comma-separated `matches(joinedSelectors)` whenever multiple valid target selectors must be checked against a single element, providing a `try-catch` fallback to individual checks for safety.
