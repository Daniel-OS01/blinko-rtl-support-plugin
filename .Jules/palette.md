## 2026-04-07 - Missing ARIA labels on raw DOM toggle buttons
**Learning:** Raw DOM elements created via `document.createElement` or injected via `innerHTML` often miss standard accessibility attributes like `aria-label` and `aria-pressed`. This is especially common for icon-only buttons (like the floating ع/א RTL toggle button or toast close buttons).
**Action:** Always check dynamically injected raw DOM components for missing ARIA attributes and apply them using standard DOM APIs like `setAttribute` or inline in the HTML strings.
