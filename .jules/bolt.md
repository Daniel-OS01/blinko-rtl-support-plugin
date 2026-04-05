## 2024-05-18 - Observer Bottleneck
**Learning:** Performing DOM validation (e.g., document.querySelector) and array filtering inside MutationObserver callbacks creates massive performance bottlenecks during frequent DOM updates.
**Action:** Always cache configuration-dependent calculations and safe selector lists outside of the MutationObserver callback.
