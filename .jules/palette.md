## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-06-07 - Dynamic Titles for Disabled Buttons
**Learning:** Enhancing conditionally disabled buttons by adding dynamic `title` attributes that explain the specific reason for the disabled state, along with applying `cursor: 'not-allowed'`, provides immediate contextual and visual feedback to the user, significantly improving accessibility and UX context.
**Action:** Always add dynamic `title` tags explaining the disabled state to conditionally disabled buttons, and apply a 'not-allowed' cursor style to reinforce the visual feedback.
