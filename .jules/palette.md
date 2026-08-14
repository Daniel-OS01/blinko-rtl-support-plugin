## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-25 - Enhanced Disabled Button States
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying. Enhancing conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute explicitly explains the reason for the disabled state on hover. Wrapping emojis in `<span aria-hidden="true">` prevents screen readers from announcing raw emojis.
**Action:** Enhance disabled buttons by using `aria-disabled` and dynamic `title`s instead of native `disabled` to improve usability and accessibility.
## 2024-05-26 - Accessible Custom Tab Navigation
**Learning:** When building custom tabbed navigation in Preact/React, relying solely on visual cues (like borders and colors) leaves screen reader users without context. Applying `role="tablist"` to the container, `role="tab"` to each button, and managing the `aria-selected` attribute ensures screen readers correctly announce the number of tabs, their names, and the currently active selection. Additionally, wrapping decorative emojis in `<span aria-hidden="true">` prevents verbose or confusing announcements.
**Action:** Always pair visual tab active states with semantic ARIA roles (`tablist`, `tab`) and dynamic `aria-selected` properties in custom navigation components, and hide decorative emojis from screen readers.
