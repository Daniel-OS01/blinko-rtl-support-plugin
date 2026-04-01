## 2024-05-23 - Performance Bottleneck in MutationObserver

**Learning:** Performing DOM validation (`document.querySelector`) and array filtering inside `MutationObserver` callbacks creates a massive performance bottleneck. The `MutationObserver` triggers frequently on every DOM update, and running these expensive configuration-dependent calculations on every mutation blocks the main thread.

**Action:** Cache these configuration-dependent calculations (`activeSelectors`, `safeSelectors`, and `joinedSelectors`) outside of the `MutationObserver` callback.
