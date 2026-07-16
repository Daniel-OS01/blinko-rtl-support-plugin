## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2024-05-19 - Optimize regex text scanning with character code loop and early exit
**Learning:** Using `text.match(/.../g)` for character counting inside text processing utilities (like a paste interceptor) allocates new memory for every match and scans the entire string unconditionally. On large inputs (e.g., massive text pastes), this causes a significant performance bottleneck due to regex engine evaluation and lack of an early return when thresholds are met.
**Action:** Replace `text.match()` regex character counting with a flat `for` loop, integer bounds checking via `charCodeAt`, and an early `return` condition to immediately halt execution when limits are reached, yielding orders-of-magnitude faster processing.
