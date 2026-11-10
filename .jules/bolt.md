## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-20 - Fault Tolerance vs Speed in Bulk Selector Checks
**Learning:** Combining CSS selectors into a single string for a `.matches(joinedSelectors)` check is significantly faster than looping over an array. However, replacing the array iteration ENTIRELY inside a `try/catch` introduces a fatal logic regression: if *any* selector in the combined string is invalid, the entire check fails and swallows the error, causing elements that matched valid selectors to be missed. The loop iteration is required as a safe fallback.
**Action:** When implementing bulk selector checks for performance, ALWAYS retain the original loop iteration as a fallback inside the `catch` block to preserve fault tolerance.
