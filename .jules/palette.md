## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2026-06-15 - Accessible Toast Notifications
**Learning:** Dynamically injected toast notifications using raw DOM APIs need explicit `role="alert"` and `aria-live="assertive"` attributes to be announced by screen readers upon injection. Icon-only buttons within them require `aria-label`.
**Action:** Always add ARIA roles, live regions, and labels when programmatically building and injecting custom alert dialogs or toasts.
