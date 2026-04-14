## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Optimize MutationObserver selector matching with combined selectors
**Learning:** Iterating over multiple selectors and calling `element.matches(s)` inside high-frequency `MutationObserver` callbacks (like during text entry) introduces repeated JavaScript-to-C++ boundary crossings, which creates a noticeable latency bottleneck.
**Action:** When validating elements against multiple CSS selectors inside an observer, join the selectors using commas (e.g., `s1, s2`) and evaluate them all at once using a single `element.matches(joinedSelectors)` call. Always include a `catch` block with fallback iteration in case the combined selector contains invalid syntax.
