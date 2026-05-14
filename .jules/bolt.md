## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2026-05-14 - Avoid Array.from on NodeLists
**Learning:** Iterating directly over NodeList objects from querySelectorAll using for...of avoids unnecessary array allocations. In high-frequency UI event handlers, allocating arrays for large sets of DOM nodes causes memory churn and reduces execution speed.
**Action:** Replace Array.from(nodeList) and chained .find() calls with direct for (const el of nodeList) loops.
