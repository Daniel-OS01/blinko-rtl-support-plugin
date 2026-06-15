## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2025-06-15 - Optimizing DOM NodeList Iterations
**Learning:** Iterating directly over `NodeList` returned by `querySelectorAll` via `for...of` avoids creating an intermediate array array entirely, contrasting with using `Array.from(nodeList).find()`, which allocates an entire array in memory even if the matching element is near the beginning.
**Action:** Always prefer native `for...of` looping over `NodeList` constructs over `Array.from()` conversions unless array-specific methods (like `.map` or `.reduce`) are strictly required. Use a simple `break` statement to replicate the early-exit benefit of `.find()`.
