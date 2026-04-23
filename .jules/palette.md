## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Emoji Buttons Accessibility Pattern
**Learning:** Raw emojis in buttons (e.g., `🗑️`, `🙈`, `👁`) are announced poorly or confusingly by screen readers (e.g. "wastebasket", "see-no-evil monkey"). Adding an `aria-label` to the button is not always sufficient if the raw emoji is still readable by the screen reader.
**Action:** When adding or fixing buttons containing emojis alongside text or as icons, wrap the emoji in `<span aria-hidden="true">` and apply a clean, descriptive `aria-label` to the parent `<button>`. For toggle buttons, also use the `aria-pressed` attribute to reflect state.
