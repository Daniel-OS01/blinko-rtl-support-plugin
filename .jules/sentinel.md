## 2025-04-04 - Security Theater innerHTML Update
**Vulnerability:** Found a hardcoded `innerHTML` assignment. While it did not introduce an immediate XSS vulnerability because the content wasn't user-supplied, it was converted to direct DOM element creation for defense-in-depth and general best practices.
**Learning:** Found that sometimes what seems like an XSS is actually secure, but changing it provides defense-in-depth and reduces attack surface.
**Prevention:** Avoid `innerHTML` even for static strings. Build the DOM iteratively.