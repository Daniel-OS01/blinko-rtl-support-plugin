## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Optimize Multiple CSS Selector Matches
**Learning:** Looping through an array of CSS selectors and calling `element.matches(selector)` for each one inside a high-frequency function like a `MutationObserver` callback is inefficient. It crosses the JavaScript/C++ boundary multiple times.
**Action:** Join the validated selectors into a single comma-separated string (e.g., `selectors.join(', ')`) and call `element.matches(joinedSelectors)` once. This delegates the iteration logic entirely to the browser's highly optimized native CSS matching engine, significantly reducing overhead.
