## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2025-02-23 - Optimize CharacterCodeStrategy loop logic
**Learning:** For performance-critical text analysis methods (like `CharacterCodeStrategy.detect`), iterating through text using `substring()`, `RegExp.test()`, and array `.some()` creates massive overhead due to constant string and regex object allocation and function call overhead.
**Action:** Replace string matching, array iterations, and heavy regex with direct `charCodeAt()` evaluation and integer comparisons in hot loops. This skips object creation and speeds up execution by >10x.
