## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-05-27 - Dynamic Tooltips for Disabled Buttons
**Learning:** Providing specific reasons for why a button is disabled via a dynamic `title` attribute improves accessibility and reduces user confusion, especially for buttons with multiple conditions for being active.
**Action:** Always include a contextual `title` attribute on complex conditionally disabled buttons to explain the missing requirements.
