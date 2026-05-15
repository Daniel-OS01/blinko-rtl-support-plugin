## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2026-05-15 - Dynamic Tooltips for Disabled States
**Learning:** Providing specific reasons for why a button is disabled via dynamic `title` attributes significantly improves usability over static labels or no feedback, especially for complex conditional states (e.g., built-in presets vs user presets).
**Action:** Apply dynamic `title` attributes to disabled buttons where the condition for disabling has multiple possible failure states.
