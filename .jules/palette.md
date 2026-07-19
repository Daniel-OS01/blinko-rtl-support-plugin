## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-07-19 - Accessible Disabled Buttons
**Learning:** Native `disabled` attributes on buttons swallow pointer events, which prevents informative `title` tooltips from displaying to the user and removes the element from keyboard focus order for screen readers.
**Action:** When a button's disabled state requires explanation (like a complex settings form), replace `disabled` with `aria-disabled`, add an `onClick` guard, apply `cursor: 'not-allowed'`, and provide a dynamic `title` attribute to explain the disabled state clearly while maintaining keyboard navigability.
