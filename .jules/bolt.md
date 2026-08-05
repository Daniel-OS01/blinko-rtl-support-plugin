## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Safe Selector Validations Are Only Safe When Filtered
**Learning:** The `try...catch` block around `target.matches(s)` in a `MutationObserver` is ostensibly there to prevent `SyntaxError` from invalid selectors. However, if the array of selectors (`safeSelectors`) is explicitly pre-filtered and validated earlier using a dummy element, the `try...catch` is redundant and safe to remove, provided the combined selector string is built strictly from these pre-validated items.
**Action:** Always ensure selector strings are pre-validated before optimizing DOM selector matching by combining selectors or stripping error boundaries to avoid introducing fatal regression bugs in DOM operations.
