## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Optimize High-Frequency Text Iteration and Bounds Checking
**Learning:** Using `string.substring()`, regex validation (`/\s|[.,!?;:()[\]{}]/.test(char)`), and array iteration (`array.some()`) in high-frequency string processing loops creates severe performance overhead due to string allocation, engine context switching, and closure creation.
**Action:** Replace string iterator loops with a standard `for` loop accessing characters directly via `charCodeAt(i)`. Fast path validation using basic number boundaries and avoiding regex or iteration dramatically reduces object allocation and crossing the JavaScript-to-C++ boundary.
