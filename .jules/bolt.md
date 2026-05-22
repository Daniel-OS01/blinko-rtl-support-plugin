## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-05-22 - NodeList Iteration Optimization
**Learning:** Converting `NodeList` objects (returned by `querySelectorAll`) to arrays using `Array.from()` before iterating or using array methods like `.find()` incurs significant memory allocation overhead, which degrades performance especially during repetitive operations like DOM event handling.
**Action:** Use direct `for...of` loops over `NodeList` objects instead of converting them to arrays. This prevents unnecessary array allocations and often allows for early exits (using `break`), which provides a measurable performance improvement and aligns with the codebase's performance patterns.
