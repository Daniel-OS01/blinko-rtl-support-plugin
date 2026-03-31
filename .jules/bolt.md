## 2024-03-31 - Cache Safe Selector Calculations outside MutationObserver
**Learning:** Performing DOM selector validation (`document.querySelector`) and configuration array manipulations (`Array.filter`, `Array.join`) directly inside frequent callbacks like `MutationObserver` creates a massive performance bottleneck, especially when evaluating 40+ selectors on every single DOM mutation.
**Action:** Always cache configuration-dependent calculations outside of `MutationObserver` callbacks (e.g., in `setupObserver`) to avoid unnecessary and expensive re-evaluations during frequent DOM updates.
