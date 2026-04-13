## 2024-05-18 - Type checking improvement
**Learning:** Type `typeof window.onpopstate` matches exactly what TypeScript expects for window.onpopstate rather than redefining it.
**Action:** Use `typeof window.property` instead of manually trying to align type definitions.
