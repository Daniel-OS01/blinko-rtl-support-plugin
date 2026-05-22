## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-24 - Accessibility aria-labels on icon-only buttons
**Learning:** Found icon-only buttons like 'Delete preset' (🗑️) and 'Clear CSS' (🗑️) lacking `aria-label`. Screen readers will read the emoji out loud, which can be verbose or confusing.
**Action:** Add `aria-label` wrapping text around emojis or using `aria-hidden='true'` inside icon buttons for accessibility in settings.
