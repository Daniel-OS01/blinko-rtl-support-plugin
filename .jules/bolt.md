## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2024-05-19 - Optimize DOM Selector Matching in MutationObservers
**Learning:** Checking multiple CSS selectors individually using `element.matches(s)` in a loop during high-frequency events (like a `MutationObserver` callback) creates excessive JavaScript-to-C++ boundary crossings, causing performance drops on heavy DOM insertions.
**Action:** Combine selectors into a single comma-separated string (`joinedSelectors = selectors.join(", ")`) and perform a single `element.matches(joinedSelectors)` call. Always wrap this in a try-catch block that falls back to the loop, in case the combined selector string throws an error.
