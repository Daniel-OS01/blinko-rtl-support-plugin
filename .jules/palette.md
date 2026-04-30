## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-04-30 - [Destructive Actions Missing Confirmations]
**Learning:** In the settings panel, actions that clear or delete user data (like clearing custom CSS) lacked a confirmation dialog and disabled state when empty. This can lead to accidental data loss and confusing interactions.
**Action:** Always add a `window.confirm` dialog to destructive actions to prevent accidental loss, and dynamically disable the button if the data is already empty to provide immediate visual feedback.
