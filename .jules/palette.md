## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-07-03 - Explanatory Tooltips for Disabled States
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying. Users were unable to tell why action buttons (like preset Load/Delete) were unavailable.
**Action:** Replaced `disabled` with `aria-disabled`, added an `onClick` guard, applied `cursor: 'not-allowed'`, and provided dynamic `title` attributes to explicitly explain the disabled state reason on hover.
