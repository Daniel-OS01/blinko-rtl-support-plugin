## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-08-02 - Optimize Selector Validation via Comma-Separated Strings in Loops
**Learning:** Checking elements against an array of CSS selectors inside high-frequency paths (like `MutationObserver` callbacks or document sweeps) by wrapping `el.matches()` in a `.some()` loop introduces massive overhead due to JS array iteration and repeated native binding crossings.
**Action:** Always map valid CSS selectors into a single comma-separated string (e.g. `selectors.join(', ')`) and evaluate them using a single `el.matches()` call to allow the browser's native query engine to efficiently evaluate all selectors simultaneously.
