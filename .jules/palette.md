## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Disabled Button Tooltips
**Learning:** Using the native `disabled` attribute prevents users from interacting with the button and stops them from seeing tooltips explaining *why* the button is disabled.
**Action:** Replace `disabled` with `aria-disabled`, add `cursor: 'not-allowed'` styles, early-return click events, and bind dynamic `title` texts to clarify required states or waiting times for complex or disabled buttons.
