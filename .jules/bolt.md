## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-18 - Optimize Element Matching in High-Frequency Observers
**Learning:** Checking `element.matches(selector)` inside a `for` loop over multiple CSS selectors during high-frequency events (like `MutationObserver` childList and characterData mutations) causes significant CPU overhead and layout thrashing.
**Action:** Combine valid selectors into a single comma-separated string (e.g., `selectors.join(', ')`) and evaluate it with a single `.matches(joinedSelectors)` call to leverage native browser optimizations. Pre-validate selectors earlier to avoid the need for `try/catch` inside the observer.
