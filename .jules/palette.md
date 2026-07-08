## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Disabled Attribute Pointer Event Swallowing
**Learning:** Native `disabled` attributes on interactive elements (like buttons) swallow pointer events, which prevents informative `title` tooltips from displaying when hovered. This makes it impossible to explain *why* an action is disabled.
**Action:** When creating conditionally disabled UI actions that need explanation, replace `disabled` with `aria-disabled="true"`, enforce un-interactability via an `onClick` guard, apply `cursor: 'not-allowed'`, and use a dynamic `title` attribute to provide context.
