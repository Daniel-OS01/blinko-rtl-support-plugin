## 2024-04-14 - Optimize MutationObserver Configuration Calculations
**Learning:** Computing configurations (like array filtering and `document.querySelector` testing) inside a `MutationObserver` callback is an anti-pattern that causes massive performance bottlenecks during frequent DOM updates.
**Action:** Cache static or configuration-dependent values outside of the `MutationObserver` callback (e.g., in `setupObserver`) to significantly improve rendering performance.
## 2024-05-18 - Optimize Selector Validation with dummyElement matches
**Learning:** Validating selectors using `document.querySelector(s)` is extremely slow because it traverses the live document DOM, whereas `document.createElement('div').matches(s)` achieves the same syntax validation ~25x faster by skipping the DOM entirely.
**Action:** Always prefer a dummy element's `.matches()` for validating CSS selectors, and cache the validation results in a Map or Set to completely eliminate repeated validation overhead during configuration setups like `setupObserver()`.

## 2024-11-11 - Combined CSS Selectors for MutationObserver
**Learning:** Checking `element.matches(selector)` inside a loop over multiple CSS selectors in a high-frequency path like a `MutationObserver` callback introduces significant execution overhead.
**Action:** Always combine validated selectors into a single comma-separated string (`selectors.join(', ')`) and evaluate it with a single `.matches(joinedSelectors)` call to leverage native browser optimizations.

## 2024-11-11 - EventTarget Recursion Fix in tests
**Learning:** Calling `element.click()` when simulating `pointerdown` via manual dispatch can trigger infinite recursion if a React/Preact synthetic handler attempts to forward the event to a parent that has already processed it, specifically inside `happy-dom`.
**Action:** When manually testing pointer events in a DOM simulation (e.g. `activate` simulating `closeModalEditor`), if the click dispatch is causing recursion issues and isn't strictly required for the simulated flow, ensure the simulated event path only triggers the necessary sequence without relying on recursive fallbacks.
