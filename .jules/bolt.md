## 2024-04-10 - Cache Config Selectors outside MutationObserver
**Learning:** Performing array filtering, validating DOM elements using `document.querySelector`, and `try/catch` checks inside a `MutationObserver` is a significant architectural bottleneck during heavy DOM edits.
**Action:** Always cache configuration-dependent static sets (like list of active valid selectors) during observer initialization rather than computing them per-mutation.
