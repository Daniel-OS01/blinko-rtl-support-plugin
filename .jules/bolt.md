## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-06-16 - Optimize element.matches with joined selectors
**Learning:** In a MutationObserver, iterating through an array of CSS selectors and calling `element.matches(selector)` individually for each one introduces significant overhead due to multiple crossings of the boundary between JavaScript and the browser's C++ native CSS matching engine.
**Action:** Join the selectors into a single comma-separated string (`selectors.join(', ')`) and perform a single `element.matches(joinedSelectors)` call to leverage the native CSS engine's optimized multi-selector evaluation.
