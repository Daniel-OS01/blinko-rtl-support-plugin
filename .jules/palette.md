## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-06-14 - Accessible Disabled States for Interactive Controls
**Learning:** Native `disabled` attributes completely swallow pointer events on elements, which prevents any `title` tooltips from displaying to the user to explain *why* the element is disabled. Emojis inside buttons can also be read aloud verbosely by screen readers, creating poor experiences.
**Action:** For disabled controls that require explanatory tooltips, replace the native `disabled` attribute with `aria-disabled`. Implement an explicit `onClick` guard to prevent action execution, and apply a dynamic CSS `cursor: not-allowed` alongside the `title`. Hide emojis inside buttons with `<span aria-hidden="true">`.
