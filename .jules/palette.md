## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-24 - Dynamic ARIA Labeling\n**Learning:** When adding ARIA labels to buttons that toggle text/emojis, using `aria-label` on the button while wrapping the visible text/emoji in an `aria-hidden` span provides the best screen reader experience without confusing mixed content announcements.\n**Action:** Apply this pattern consistently across all toggle buttons in the project.
