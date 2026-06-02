## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-06-02 - Dynamic ARIA and Tooltips for Icon-Only Buttons
**Learning:** When using raw emojis (like 🗑️) in buttons, screen readers announce the unicode character directly which can be confusing or verbose. Wrapping the emoji in `<span aria-hidden="true">`, adding an explicit `aria-label`, and using dynamic `title` and `cursor: not-allowed` properties dramatically improves both accessibility and visual feedback for disabled states in React/Preact applications.
**Action:** When adding or auditing icon-only buttons, always ensure an `aria-label` is set, the raw icon/emoji is hidden from screen readers, and dynamic tooltips clearly explain why a button might be disabled.
