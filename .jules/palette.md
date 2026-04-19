## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Accessible Emoji Buttons
**Learning:** Raw emojis inside buttons can cause confusing screen reader readouts (e.g., "wastebasket button").
**Action:** Always wrap emojis in `<span aria-hidden="true">` inside icon-only buttons, and provide an explicit `aria-label` on the button itself.
