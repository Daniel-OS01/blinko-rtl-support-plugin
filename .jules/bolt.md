## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-04-30 - Optimize processElement Selector Validation
**Learning:** High-frequency event paths like `processElement` (especially via `MutationObserver`) can experience significant execution time overhead due to array iteration and multiple JS-to-C++ DOM bindings for individual `element.matches(selector)` calls.
**Action:** Pre-combine CSS selectors into a single comma-separated string during configuration setup to allow for an O(1) DOM check, reducing the number of JS-to-C++ boundary crossings.
