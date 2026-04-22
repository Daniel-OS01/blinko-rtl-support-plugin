## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-10-27 - Disabled State Tooltips & Emoji Masking
**Learning:** For icon-only buttons that have complex disabled states (e.g., presets that cannot be deleted), providing a dynamic `title` attribute greatly improves user understanding of why an action is blocked. Furthermore, when using raw emojis as button icons, wrapping them in `<span aria-hidden="true">` while providing a clear `aria-label` prevents screen readers from making confusing announcements like "wastebasket".
**Action:** When creating icon-only buttons with conditional disabled states, always include an `aria-label`, an `aria-hidden` wrapper for the icon/emoji, and a dynamic `title` tooltip that explicitly explains the disabled reason.
