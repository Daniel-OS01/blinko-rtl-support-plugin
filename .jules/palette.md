## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-05-24 - Icon-Only Emoji Buttons
**Learning:** Screen readers announce raw emoji characters in UI components, which can be verbose or confusing. For icon-only buttons using emojis in Preact/JSX, the emoji itself lacks semantic context.
**Action:** When using emoji icons within buttons, always wrap the emoji in a `<span aria-hidden="true">`, and provide an explicit descriptive `aria-label` directly on the `<button>` element to ensure clear and concise screen reader accessibility.
