## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-05-23 - Optimize NodeList Iteration
**Learning:** Converting `NodeList` objects (returned by `querySelectorAll`) to arrays using `Array.from()` just to iterate or use `.find()` is a common anti-pattern that introduces unnecessary memory allocations and garbage collection overhead, especially in frequent DOM queries or event handlers. Modern environments support the Iterable protocol on `NodeList`.
**Action:** Iterate directly over `NodeList` objects using `for...of` loops to minimize memory allocation and improve performance. Use a variable to track the found element and `break` early instead of relying on `Array.from(...).find(...)`.
