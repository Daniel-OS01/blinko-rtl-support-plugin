## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-30 - Emoji announcements in buttons
**Learning:** When buttons contain emojis alongside text or as icons (e.g., 👁 Show), screen readers may announce the raw emoji unicode name, cluttering the experience. The UIUXService and setting panel elements were missing appropriate semantic boundaries.
**Action:** Always wrap emoji text content in a `<span aria-hidden="true">`, or apply a clean `aria-label` directly to the `<button>` to override verbose emoji descriptions, ensuring proper JSX fragment wrapping if conditional.
