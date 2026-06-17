## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-06-17 - Dynamic Toast Accessibility
**Learning:** Dynamically created toasts that interrupt user flow (like the PasteInterceptor's mixed content warning) require explicit ARIA roles (role="alert", aria-live="assertive") and accessible labels for close buttons, as they bypass standard JSX/Preact a11y linters and are not inherently announced by screen readers when appended to the DOM.
**Action:** Always manually enforce ARIA attributes when injecting raw HTML strings or constructing DOM elements programmatically for notifications or alerts.
