## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-05-03 - Dynamic ARIA Toggle Patterns
**Learning:** When creating raw icon-only toggle buttons or using emojis in JSX, explicit `aria-label` and `aria-pressed` states must be applied, and raw emojis should be wrapped in `<span aria-hidden="true">`. Avoid using dynamic `aria-label`s (e.g., 'Show'/'Hide') alongside `aria-pressed` to prevent screen reader confusion.
**Action:** Apply static `aria-label`s with `aria-pressed` for toggle buttons and wrap emojis in `aria-hidden` spans.
