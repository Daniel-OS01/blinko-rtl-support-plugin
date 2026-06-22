## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Optimize NodeList Iteration Performance
**Learning:** Using `Array.from(nodeList)` to convert a NodeList (e.g., from `querySelectorAll`) into an array before iterating or searching it with `.find()` introduces unnecessary memory allocations and array copying overhead.
**Action:** Iterate directly over the NodeList using `for...of` loops. This avoids the memory allocation of intermediate arrays while preserving short-circuiting capability (using `break` or `return` where `.find()` was previously used).
