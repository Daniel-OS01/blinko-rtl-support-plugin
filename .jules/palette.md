## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-06-18 - Disabled Button Tooltips
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from appearing. This hides critical context about *why* an action is unavailable.
**Action:** Use `aria-disabled`, a dynamic `title`, `cursor: 'not-allowed'`, and an `onClick` guard instead of `disabled` for buttons that need explanation.
