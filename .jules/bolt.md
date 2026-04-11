## 2026-04-11 - [DOM Observation Optimization]
**Learning:** Performance Pattern: Configuration-dependent calculations, such as array filtering and safe selector DOM validation (`document.querySelector`), must be cached outside of `MutationObserver` callbacks (e.g., in `setupObserver`) to avoid massive performance bottlenecks during frequent DOM updates.
**Action:** Extract loop-invariant validation logic away from high-frequency observers.
