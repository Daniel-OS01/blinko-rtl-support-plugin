## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-03 - RTL Detection Hot Path Optimization
**Learning:** For high-frequency text-processing hot paths (like detecting RTL text via `CharacterCodeStrategy.detect`), string allocations (`substring`), `RegExp.test`, and array iteration (`some`) add immense overhead (over 20x slower).
**Action:** Replace `substring` with raw `charCodeAt()` bounds checking, use an early ASCII bounds check (`code <= 125`) for whitespace/punctuation, and replace `some()` array range lookups with manual code bound checks. Ensure to test bounds carefully, and note that `charCodeAt` evaluates UTF-16 units vs `for...of` true code points (acceptable for basic RTL detection in BMP).
