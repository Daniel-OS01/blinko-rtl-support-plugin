## 2024-05-24 - Batch CSS selectors in MutationObservers
**Learning:** Checking multiple CSS selectors individually via `element.matches` inside a MutationObserver creates significant JavaScript-to-C++ boundary crossing overhead during high-frequency DOM updates.
**Action:** Always combine CSS selectors into a single comma-separated string (`joinedSelectors`) and evaluate them with a single `element.matches(joinedSelectors)` call. Provide a try-catch block with a loop-based fallback for safety against invalid selectors.
