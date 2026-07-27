## 2024-05-24 - Initial Palette Journal\n**Learning:** Creating initial journal file as requested in prompt.\n**Action:** Starting UX review.

## 2024-05-24 - Dynamic ARIA Toggle Patterns
**Learning:** Adding `aria-label` to raw icon-only toggle buttons created via `document.createElement` prevents accessibility regressions in injected plugin overlays, while mapping the `aria-pressed` attribute accurately to the `isEnabled()` state.
**Action:** When creating injected floating tools or raw DOM overrides in this project, explicitly bind `aria-pressed` states to the plugin's underlying service store.

## 2024-11-20 - Accessible Icon-Only Buttons
**Learning:** Native `disabled` attribute swallows mouse events making `title` attributes (tooltips) not show up, leading to a poor UX for disabled buttons because users won't know *why* the button is disabled. Replacing the button contents with an emoji without `aria-hidden` could also cause screen readers to read the emoji string which is usually less descriptive.
**Action:** When working with disabled toggle states on icon-only buttons, use `aria-disabled` combined with `cursor: 'not-allowed'` rather than the native `disabled` attribute to retain tooltip hover capability. Wrap emojis in `<span aria-hidden="true">` to keep them decorative and explicitly label the `<button>` with a descriptive `aria-label`.
