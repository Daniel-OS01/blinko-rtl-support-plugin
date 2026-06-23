## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-23 - Optimize NodeList Iteration
**Learning:** Iterating over `NodeList` objects (from `querySelectorAll`) by converting them to arrays using `Array.from()` is an anti-pattern that creates unnecessary memory allocations and iteration overhead, especially during frequent DOM events like mutations or popstate.
**Action:** Always iterate over `NodeList` directly using native `for...of` loops, and replace array methods like `.find()` with inline `break` or `return` logic to achieve the same result without intermediate array creation.
