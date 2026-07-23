## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-05-24 - Enhancing Disabled Buttons with ARIA and Tooltips
**Learning:** Native `disabled` attributes swallow pointer events, which prevents tooltips (`title` or custom) from showing on hover, leading to poor user feedback on why a button cannot be clicked.
**Action:** Replace `disabled` with `aria-disabled`, add an explicit `onClick` early return guard, style it visually with `cursor: 'not-allowed'` and `opacity: 0.65`, and add a clear `title` to explain the state to users. Also, wrap interactive emojis inside `<span aria-hidden="true">` to prevent screen reader noise.
