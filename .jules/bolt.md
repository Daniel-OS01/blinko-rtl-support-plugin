## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-07-29 - Optimize Character Code Parsing
**Learning:** Using higher-order array methods (like `.some()`) with callback closures, inline regular expression instantiation, and string slicing (`.substring()`) inside hot text processing loops (like `CharacterCodeStrategy.detect()`) incurs significant memory allocation and execution overhead.
**Action:** Replace them with a flat `for` loop, direct integer range bounds checking using `charCodeAt()`, a cached static regex, and limit calculations via `Math.min()` to yield >3x performance speedups in text parsing bottlenecks.
