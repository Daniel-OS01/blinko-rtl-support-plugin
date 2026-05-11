## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-05-11 - ARIA labels for dynamic Toasts\n**Learning:** Creating toast elements using innerHTML requires explicit ARIA roles (like role="alert" and aria-live="assertive") for screen reader announcements, and any icon-only buttons within the toast need explicit aria-labels.\n**Action:** Always add appropriate ARIA roles and labels to elements created via innerHTML or document.createElement to ensure screen reader accessibility.
