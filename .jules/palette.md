## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-25 - Enhanced Disabled Button States
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying. Enhancing conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute explicitly explains the reason for the disabled state on hover. Wrapping emojis in `<span aria-hidden="true">` prevents screen readers from announcing raw emojis.
**Action:** Enhance disabled buttons by using `aria-disabled` and dynamic `title`s instead of native `disabled` to improve usability and accessibility.
## 2024-05-26 - Quick Action Button Accessibility
**Learning:** Injected UI toggle buttons inside the settings panel were using a native `disabled={!settings.enabled}` which swallowed hover events and prevented tooltips from explaining why the action was unavailable. Replacing it with `aria-disabled` and providing conditional text and styling makes the UI more informative for keyboard and mouse users alike.
**Action:** Always prefer `aria-disabled` over `disabled` when you want a button to conditionally explain its inactive state via a `title` or tooltip. Wrap decorative emojis in `<span aria-hidden="true">` to prevent screen reader clutter.
