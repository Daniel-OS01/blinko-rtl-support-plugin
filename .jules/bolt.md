## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-07-24 - Optimize NodeList Iteration
**Learning:** Using `Array.from()` to convert `NodeList`s returned by `document.querySelectorAll()` into arrays before iterating or finding elements forces an immediate memory allocation and full traversal, creating unnecessary overhead. `NodeList` is naturally iterable in modern environments.
**Action:** Always iterate directly over `NodeList`s using `for...of` loops and implement early exits (`break` or `return`) instead of using array conversion methods like `Array.from(nodelist).find(...)`.
