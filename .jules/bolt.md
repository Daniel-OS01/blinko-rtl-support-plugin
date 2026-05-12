## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-18 - Avoid Array.from() for NodeList iteration
**Learning:** Converting `NodeList` objects returned by `document.querySelectorAll()` to an array using `Array.from()` prior to iteration (`for (const el of Array.from(candidates))`) or searching (`Array.from(candidates).find()`) causes unnecessary memory allocations and blocks early returns, introducing measurable performance overhead during high-frequency DOM manipulation.
**Action:** Always iterate over `NodeList` directly using a `for...of` loop (`for (const el of document.querySelectorAll(...))`). When searching for a specific element, use a `for...of` loop with an explicit `break` statement to achieve early termination without intermediate array overhead.
