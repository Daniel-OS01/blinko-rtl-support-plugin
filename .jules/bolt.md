## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2024-05-18 - Optimize Text Processing loops
**Learning:** Using regex for whitespace checking (`!/\s/.test(char)`) and array iteration (`some`) with string iterators (`for...of`) creates massive memory overhead due to constant string allocation. `charCodeAt(i)` with explicit bounds checking evaluates characters ~15x faster without GC pauses.
**Action:** Replace `for (const char of string)` with `for (let i = 0; i < len; i++) { const code = text.charCodeAt(i); }` in high-frequency string processing, substituting regex or `.some()` calls with direct integer (`code`) conditionals.
