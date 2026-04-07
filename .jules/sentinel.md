## 2026-04-07 - [MEDIUM] Regex Injection via String.prototype.replace()
**Vulnerability:** In `src/services/aiPostService.ts`, user-provided content (notes and tags) was injected into AI prompt templates using `.replace(/pattern/g, user_string)`.
**Learning:** If the user string contains regex replacement patterns like `$&`, ``, or `$\'`, `String.prototype.replace()` interprets them specially. This can result in unexpected replacement behavior, leaking of previous matched content, or corruption of the AI prompt, serving as a subtle injection vector.
**Prevention:** Always use a replacer function (e.g., `.replace(/pattern/g, () => user_string)`) instead of direct string replacement when the replacement string originates from untrusted or user-supplied input.
