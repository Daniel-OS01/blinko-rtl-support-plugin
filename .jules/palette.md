## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-11-28 - Accessible Disabled States and Hidden Emojis
**Learning:** Native `disabled` attributes swallow mouse events, preventing tooltips (via `title`) from explaining why an action is unavailable. Additionally, naked emojis in icon-only buttons can be read inconsistently by screen readers.
**Action:** When conditionally disabling buttons, use `aria-disabled="true"`, an `onClick` guard, and `cursor: not-allowed` instead of the native `disabled` attribute to maintain hover interactions for explanatory tooltips. Wrap emojis in `<span aria-hidden="true">` and provide explicit `aria-label`s directly on the `<button>`.
