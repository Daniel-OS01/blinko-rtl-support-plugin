## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-18 - Prevent NodeList Array Allocation Overhead
**Learning:** Iterating over `NodeList` objects (returned by `querySelectorAll`) using `Array.from().find()` allocates unnecessary intermediary `Array` instances in memory. Modern JS environments support direct iteration over `NodeList` via `for...of` loops.
**Action:** Replace `Array.from(nodeList).find()` with direct `for...of` iteration over the `nodeList`, implementing standard `if/break` patterns where early exit logic is needed to minimize memory allocations and iterate efficiently.
