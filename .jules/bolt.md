## 2024-05-18 - [MutationObserver Array Filtering Optimization]
**Learning:** Moving configuration-dependent calculations and DOM validations (e.g. `document.querySelector` checking validity) outside of `MutationObserver` callbacks avoids severe performance bottlenecks during frequent DOM updates.
**Action:** When working with MutationObservers, cache any computed selectors, array operations, or DOM validations in the setup scope, then only execute matching checks (`element.matches`) inside the observer callback.
