## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.
## 2024-05-24 - Dynamic ARIA Title Attributes
**Learning:** Enhanced accessibility by using span tags with aria-hidden for emojis and replacing static titles with dynamic ones based on button state, alongside explicit ARIA labels and appropriate pointer changes.
**Action:** Apply this pattern to button elements that combine icons/emojis with conditional logic.
