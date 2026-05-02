## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-24 - Dynamic ARIA Label with Hidden Emoji
**Learning:** For toggle buttons containing emojis and text (like "🙈 Hide" / "👁 Show"), wrapping the text content in `<span aria-hidden="true">` and placing a dynamic `aria-label` directly on the `<button>` ensures a clean screen reader announcement ("Hide API token") without the raw emoji descriptions being announced alongside it.
**Action:** Always wrap text and emojis in `<span aria-hidden="true">` when providing an explicit `aria-label` to avoid redundant or confusing double-announcements.
