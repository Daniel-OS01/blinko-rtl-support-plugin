## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-13 - Optimize NodeList Iteration by Replacing Array.from
**Learning:** Converting `NodeList` objects (returned by methods like `querySelectorAll`) to arrays using `Array.from()` introduces unnecessary memory allocation overhead and slows down iteration. Modern JS supports direct iteration over `NodeList`.
**Action:** Iterate directly over `NodeList` objects using a `for...of` loop instead of converting them to arrays. For searches, use a `for...of` loop with an early `break` instead of chaining `.find()` on an array.
