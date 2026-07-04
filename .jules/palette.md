## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-07-04 - Conditionally Disabled Button Tooltips
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying. Enhancing conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute explicitly explains the reason for the disabled state on hover.
**Action:** Use `aria-disabled` instead of `disabled` for buttons that need hover tooltips to explain their disabled state, ensuring to add an `onClick` guard to prevent execution.
