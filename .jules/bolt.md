## 2026-04-02 - [MutationObserver Bottleneck]
**Learning:** Computing safe selectors using `document.querySelector` inside a `MutationObserver` callback causes massive performance degradation because the callback is triggered frequently during DOM updates.
**Action:** Always compute configuration-dependent state and DOM validations outside of high-frequency callbacks like `MutationObserver`.
