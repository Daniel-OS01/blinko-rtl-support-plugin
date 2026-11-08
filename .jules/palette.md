## 2025-01-20 - [ARIA Hidden on Emojis]
**Learning:** Using emojis standalone in UI buttons or text without proper screen reader handling makes them read out verbatim, which is confusing contextually (e.g. "down arrow").
**Action:** Wrap emojis in `<span aria-hidden="true">` when used for decorative UI purposes or alongside aria-labelled elements.
