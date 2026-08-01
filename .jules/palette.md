## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-08-01 - Disabled Button Tooltip Accessibility
**Learning:** Native `disabled` attributes swallow pointer events, preventing informative `title` tooltips from displaying when users hover over unclickable buttons. This hides why an action (like deleting a preset) is unavailable.
**Action:** Replace `disabled` with `aria-disabled="true"`, add an `onClick` guard to prevent action execution, set `cursor: not-allowed` along with appropriate `opacity`, and provide a dynamic `title` attribute to explicitly explain the current disabled state reason on hover.
