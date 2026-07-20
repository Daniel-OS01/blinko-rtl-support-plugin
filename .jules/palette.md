## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Tooltips and Accessible Emojis on Disabled Buttons
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying to explain *why* a button is disabled. Additionally, raw emojis inside buttons can be misread by screen readers.
**Action:** Enhance conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard to block execution when disabled, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute to explicitly explain the disabled state on hover. Furthermore, wrap emojis inside buttons with `<span aria-hidden="true">` to improve screen reader accessibility.
