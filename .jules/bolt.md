## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-28 - Iterate NodeList Directly over Array.from
**Learning:** Converting a `NodeList` (returned by `querySelectorAll`) to an array using `Array.from()` just to use array methods like `.find()` or `.forEach()` is an anti-pattern. It incurs immediate memory allocation overhead O(N) by creating a new array.
**Action:** Iterate directly over the `NodeList` using a `for...of` loop and implement `break` or `return` logic to mimic short-circuiting array methods like `.find()`, minimizing allocations and loop overhead.
