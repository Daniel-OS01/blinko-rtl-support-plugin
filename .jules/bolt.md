## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.
## 2023-10-27 - [CharacterCodeStrategy string loop performance]
**Learning:** In high-frequency hot paths, replacing `String.substring` allocation, `RegExp.test` evaluations, and `for...of` string iterator objects with a raw `while` loop using `String.charCodeAt()` and direct integer bounds checking can yield up to a 10x performance improvement in Node/Bun engines. Crucially, when doing this, UTF-16 surrogate pairs (e.g. emojis) must be manually advanced via `i += 2` to maintain logic parity with `for...of` which iterates by code points.
**Action:** Always prefer `charCodeAt` and integer range checking for character inspection in tight loops, but remember to explicitly handle the `0xD800`–`0xDFFF` surrogate block.
