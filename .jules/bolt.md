## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-19 - Optimize NodeList Iteration in DOM Searches
**Learning:** Using `Array.from(nodeList).find(...)` on DOM queries is highly inefficient because `Array.from()` forces a complete synchronous iteration and memory allocation of the entire `NodeList` before `find()` can even start its search. In large DOM trees, this causes unnecessary garbage collection and CPU overhead.
**Action:** Replace `Array.from(nodeList)` chains with direct `for...of` loops and `break` statements. `NodeList`s are natively iterable, and `for...of` allows for immediate short-circuiting as soon as a match is found, bypassing the array allocation entirely.
