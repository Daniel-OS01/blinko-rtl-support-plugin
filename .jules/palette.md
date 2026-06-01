## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-06-01 - Contextual Disabled States
**Learning:** Conditionally disabled buttons (like "Load/Delete Preset") without tooltips leave users guessing why the action is unavailable, and lacking 'not-allowed' cursor styles breaks expected visual interaction patterns.
**Action:** Always provide dynamic `title` attributes that explain *why* a button is disabled, apply `cursor: 'not-allowed'`, and ensure emoji contents are properly hidden from screen readers via `aria-hidden` with an overarching `aria-label` on the button.
