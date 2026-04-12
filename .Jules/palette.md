## 2024-04-12 - ARIA Labels and Stateful Pressed Attributes for Icon-Only Buttons
**Learning:** Icon-only toggle controls in raw DOM and Preact components need explicit semantic labeling (`aria-label`) and dynamic state exposure (`aria-pressed`) to be fully accessible to screen readers, especially when the visual state is only indicated by color or icon changes.
**Action:** Always include `aria-label` and dynamically synchronize `aria-pressed` with the underlying boolean state when creating or reviewing custom toggle components or floating action buttons.
