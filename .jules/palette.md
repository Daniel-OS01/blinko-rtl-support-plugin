## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-06-13 - [Disabled buttons and tooltips]
**Learning:** Native `disabled` attributes on interactive elements suppress all pointer events, preventing dynamic `title` tooltips from functioning and confusing users. Using `aria-disabled` combined with explicit cursor styles (like `not-allowed`) allows tooltips to render correctly while still maintaining semantic disabled states for screen readers.
**Action:** Use `aria-disabled` + `onClick` guards + `cursor: not-allowed` + `title` instead of native `disabled` attributes when context needs to be provided about *why* the element is disabled.
