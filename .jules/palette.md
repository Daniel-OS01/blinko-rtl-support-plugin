## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Preact Inline ARIA Logic
**Learning:** In Preact components like `src/setting.tsx`, simple ternary operators can safely manage dynamic `aria-label` values for toggle buttons (e.g., `aria-label={showApiToken ? 'Hide API Token' : 'Show API Token'}`) without requiring external state mappers.
**Action:** When adding accessible labels to toggle buttons that only use emojis or context-dependent text (like 'Hide' / 'Show'), use the component's existing boolean state to bind both `aria-pressed` and a descriptive `aria-label`.
