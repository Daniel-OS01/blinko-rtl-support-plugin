## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-07-26 - Enhancing Conditionally Disabled Icon Buttons
**Learning:** Native `disabled` attributes swallow pointer events, preventing `title` tooltips from displaying, and screen readers can announce raw emojis awkwardly.
**Action:** When a button is conditionally disabled, replace the `disabled` attribute with `aria-disabled`, add an `onClick` guard to prevent action execution, set `cursor: not-allowed` dynamically, and provide a dynamic `title` to explicitly explain the reason for the disabled state on hover. Wrap emoji contents in `<span aria-hidden="true">` with an explicit `aria-label` on the button itself.
