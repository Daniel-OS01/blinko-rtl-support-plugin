## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-05-05 - Emoji Button Accessibility Pattern
**Learning:** When buttons contain emojis (either icon-only or with text), screen readers can announce raw emojis unpredictably, creating noise. Wrapping the emoji in `<span aria-hidden="true">`, using fragments, and applying a descriptive `aria-label` directly to the button provides a much cleaner accessible experience.
**Action:** Always wrap emojis in interactive elements with `aria-hidden="true"` and ensure the parent button has a static or conditionally correct `aria-label`.
