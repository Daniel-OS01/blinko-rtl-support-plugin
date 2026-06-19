## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-24 - Semantic disabled buttons vs native disabled buttons
**Learning:** Relying on the native `disabled` attribute for UI buttons removes them from the tab sequence and blocks pointer events, making it impossible to surface a `title` tooltip to explain *why* the button is disabled to either keyboard or mouse users.
**Action:** When creating conditionally disabled actionable buttons, prefer `aria-disabled` combined with explicit pointer and focus styling (`cursor: not-allowed`, `opacity`), conditional `onClick` guards, and an explanatory `title` attribute.
