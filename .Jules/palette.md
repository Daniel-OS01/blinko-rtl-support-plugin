## 2024-05-18 - [Add ARIA label to icon-only Delete Preset button]
**Learning:** Raw emojis in icon-only buttons (`<button>🗑️</button>`) should be wrapped in `<span aria-hidden="true">` to prevent screen readers from reading the literal emoji name, and the `<button>` itself should receive an `aria-label` describing the action.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s and that any inner emojis/SVGs are hidden from accessibility trees via `aria-hidden="true"`.
