## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-26 - Improving Icon-Only Buttons Accessibility
**Learning:** Icon-only buttons (using emojis like 🗑️) are often read confusingly by screen readers (e.g., reading out the literal unicode description "wastebasket"). Combining this with disabled states requires clear communication to the user about *why* the button cannot be interacted with.
**Action:** When working with emoji-based icon buttons, wrap the emoji in `<span aria-hidden="true">` to silence the unicode announcement, and apply a clear `aria-label` directly to the `<button>`. For conditionally disabled buttons, add a dynamic `title` attribute that explicitly states the condition preventing interaction, rather than a static label.
