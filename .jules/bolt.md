## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2026-06-26 - Optimize NodeList Iteration by eliminating Array.from
**Learning:** Converting NodeList objects from `querySelectorAll` to Arrays using `Array.from()` before iteration adds significant memory allocation and iteration overhead, especially in frequent DOM operations or event handlers.
**Action:** Iterate directly over NodeList objects using `for...of` loops and use standard `break` or `return` statements for find-like logic to eliminate array instantiation costs.
