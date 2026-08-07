## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-25 - Enhanced Disabled Button States
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying. Enhancing conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute explicitly explains the reason for the disabled state on hover. Wrapping emojis in `<span aria-hidden="true">` prevents screen readers from announcing raw emojis.
**Action:** Enhance disabled buttons by using `aria-disabled` and dynamic `title`s instead of native `disabled` to improve usability and accessibility.
## 2024-05-25 - Hiding decorative emojis
**Learning:** Emojis used as decorative icons alongside text in settings menus (like AI Post Processing toggles) are read aloud by screen readers, creating noisy and repetitive announcements.
**Action:** Always wrap inline decorative emojis in `<span aria-hidden="true">` to prevent screen readers from announcing them, ensuring cleaner navigation for assistive technology users.
