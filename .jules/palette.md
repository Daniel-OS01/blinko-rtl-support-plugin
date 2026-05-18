## 2024-05-24 - Initial Palette Journal
**Learning:** Creating initial journal file as requested in prompt.
**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-05-18 - Added proper ARIA attributes to dynamically injected toast overlay
**Learning:** When injecting raw DOM string templates that act as alert overlays or dialogs via `innerHTML`, it's critical to manually specify `role="alert"` and `aria-live="assertive"` on the container, and give explicit `aria-label` attributes to icon-only buttons (e.g., `&times;`) so screen readers announce the alert immediately and interpret the dismiss button correctly.
**Action:** Ensure all dynamically generated toast/alert UI components constructed with raw HTML strings incorporate proper accessibility roles and screen-reader-friendly labels.
