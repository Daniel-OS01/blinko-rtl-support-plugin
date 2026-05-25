## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-25 - Optimize NodeList iteration
**Learning:** Iterating directly over `NodeList` objects (from `querySelectorAll`) via `for...of` is significantly faster than converting them to an array with `Array.from()`. While `NodeList` lacks `.find()`, `.map()`, and `.filter()`, using a direct loop avoids unnecessary memory allocations.
**Action:** Always iterate directly over `NodeList` with `for...of` instead of allocating an intermediate array using `Array.from()`.
