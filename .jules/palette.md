## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-10-24 - Hiding Emojis in Icon-Only Buttons
**Learning:** Raw emojis inside buttons are announced by screen readers (e.g., "Counterclockwise arrows button"), causing confusion when the button already has an `aria-label`.
**Action:** Always wrap emojis in `<span aria-hidden="true">` inside buttons and ensure the button has a clear `aria-label`. Added to `src/app.tsx` and `src/setting.tsx`.
