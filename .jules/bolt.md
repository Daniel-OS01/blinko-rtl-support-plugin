## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2024-05-19 - Optimize High-Frequency Text Iteration via charCodeAt
**Learning:** For high-frequency text processing tasks (like RTL detection strategies), allocating sub-strings via `substring()`, evaluating characters via arrays/closures with `.some()`, and applying regex patterns via `RegExp.test()` inside tight loops creates immense object creation and execution overhead.
**Action:** Use raw `charCodeAt()` integer evaluations with early ASCII bound filters and manual surrogate pair handling (skipping low surrogates for emojis) to drastically cut object allocations and speed up processing loops.
