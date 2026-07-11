## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Enhancing disabled buttons
**Learning:** Native disabled attributes on buttons swallow pointer events, preventing tooltips (like the title attribute) from showing. This can confuse users who don't know why a button is disabled.
**Action:** Replace `disabled` with `aria-disabled`, add an `onClick` guard, apply `cursor: not-allowed`, and provide a dynamic `title` attribute to explain the disabled state on hover.
