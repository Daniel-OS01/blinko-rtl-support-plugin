## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-04-27 - Screen Reader Emoji Annoyance in Buttons
**Learning:** When buttons contain emojis alongside text or as icons (e.g., `👁️ Show`), screen readers will audibly announce the raw emoji names which can be jarring and confusing to users. The `title` attribute alone is insufficient for proper accessibility context.
**Action:** Always add a clear, descriptive `aria-label` directly to the `<button>` element and wrap any visual emojis/icons inside a `<span aria-hidden="true">`. Note: In JSX/Preact conditional renders, make sure to wrap the `span` and text node in a fragment `<>` to satisfy type checking.
