## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2025-03-05 - Disabled Button Tooltips and Accessibility
**Learning:** Native `disabled` attributes swallow pointer events in many browsers, preventing `title` tooltips from displaying to explain why an action is blocked. This creates a frustrating experience where users don't know how to unblock themselves. Additionally, screen readers handle raw emojis poorly.
**Action:** Enhance conditionally disabled buttons by replacing `disabled` with `aria-disabled`, adding an `onClick` guard, applying `cursor: 'not-allowed'`, and providing a dynamic `title` attribute to explicitly explain the disabled state. Also, wrap emojis in `<span aria-hidden="true">` with a clear `aria-label` on the parent button.
