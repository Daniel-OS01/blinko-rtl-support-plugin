## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-06-03 - Dynamic Titles on Disabled Buttons
**Learning:** Providing dynamic `title` attributes on disabled buttons, paired with `cursor: 'not-allowed'`, offers immediate contextual feedback explaining why an action is unavailable, significantly improving the user experience for conditional operations like deleting presets.
**Action:** Always include a contextual `title` and `cursor: 'not-allowed'` on conditionally disabled buttons to clarify constraints rather than leaving users guessing why an action failed.
