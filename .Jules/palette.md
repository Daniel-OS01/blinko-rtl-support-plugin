## 2026-04-03 - Accessible Floating Action Button and Icon Controls
**Learning:** The primary floating action button (FAB) for the RTL toggle and various icon-only buttons relied solely on `title` attributes or visual cues (CSS classes/emojis) for context. Screen readers might misinterpret or not announce the pressed state changes correctly without explicit ARIA labels.
**Action:** Always pair `title` attributes with explicit `aria-label`s on dynamically created icon buttons, and use `aria-pressed` to communicate active toggle states programmatically.
