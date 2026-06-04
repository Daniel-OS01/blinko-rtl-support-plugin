## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-06-04 - Add aria-label and conditional title to delete preset button
**Learning:** When disabling a button (e.g. built-in presets cannot be deleted), replacing a simple 'cursor: pointer' with 'not-allowed' provides an immediate visual queue. Supplying a dynamic `title` that explains *why* the button is disabled improves UX compared to a generic title or no explanation. Additionally, placing raw emojis inside buttons requires an `aria-hidden='true'` span wrapper, and an explicit `aria-label` on the button.
**Action:** Next time I encounter a conditionally disabled button, I should look to replace standard cursors with `not-allowed` when disabled and consider providing conditional explanations in the `title`.
