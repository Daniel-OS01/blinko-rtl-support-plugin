## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2026-04-24 - Text iteration charCodeAt() vs for...of surrogate pair caveat
**Learning:** When optimizing text iteration using a standard `for` loop and `charCodeAt(i)` instead of `for (const char of string)`, `charCodeAt` evaluates UTF-16 code units (splitting surrogate pairs and emojis), while `for...of` iterates by full code points.
**Action:** Ensure target character ranges fall within the Basic Multilingual Plane (< 0xFFFF) when using `charCodeAt()`, or use `codePointAt()` and manual index increments if full unicode support is required on the hot path.
