## 2024-05-24 - Initial Palette Journal
**Learning:** Creating initial journal file as requested in prompt.
**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Improve Emoji Accessibility
**Learning:** Emoji icons without semantic wrapper (e.g. `<span>`) and `aria-hidden` are read by screen readers. Toggle buttons should not use dynamic `aria-label` combined with `aria-pressed`, as it causes confusing dual announcements. A static `aria-label` like "Toggle API Token Visibility" with `aria-pressed` is preferred.
**Action:** Wrap emoji icons in `<span aria-hidden="true">`, add a static descriptive `aria-label` to toggle buttons, and use `aria-pressed` for the toggle state. In Preact/React, use fragments (`<>`) to wrap text and nodes.
