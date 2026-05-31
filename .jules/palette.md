## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-05-31 - Preact ARIA Pattern
**Learning:** In Preact, wrapping emojis in `<span aria-hidden="true">⚛️</span>` within an icon-only button alongside a static `aria-label` effectively silences verbose unicode announcements across screen readers, without needing complex fragments when rendering purely structural HTML/JSX elements.
**Action:** Continue applying this pattern to all interactive buttons containing only visual emojis in the React/Preact UI settings panels.
