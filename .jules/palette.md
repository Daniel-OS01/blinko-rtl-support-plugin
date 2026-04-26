## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Accessibility for Injected Toast Controls
**Learning:** Raw DOM elements (like the close `<button>`) injected dynamically for toast notifications (e.g., in `pasteInterceptor.ts`) are easily missed by standard JSX accessibility checks. Without an `aria-label`, these icon-only ("&times;") buttons are inaccessible to screen readers.
**Action:** Always include an explicit `aria-label` when programmatically generating icon-only close buttons via `innerHTML` or `document.createElement`.
