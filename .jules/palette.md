## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Dynamic Disabled Tooltips and Accessible Emojis
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying. Furthermore, raw emojis used as icons should be wrapped in `<span aria-hidden="true">` with the `aria-label` applied to the button to prevent screen readers from announcing raw emojis unnecessarily.
**Action:** Enhance conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute to explicitly explain the reason for the disabled state on hover. Always wrap decorative/standalone emojis in `<span aria-hidden="true">` elements.
