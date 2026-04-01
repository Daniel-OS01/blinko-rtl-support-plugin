## 2025-04-01 - Icon-only buttons lack ARIA labels
**Learning:** Several key interactive elements (like the RTL toggle `ع/א`, refresh/sync `🔄`, and preset delete `🗑️`) are icon-only but lacked `aria-label` attributes. This is a common accessibility pattern that needs consistent attention across settings and floating components.
**Action:** Added `aria-label` attributes to these icon-only buttons (`src/index.tsx`, `src/app.tsx`, `src/setting.tsx`) to improve screen reader accessibility. I will consistently check for icon-only buttons across all interactive elements in the future.
