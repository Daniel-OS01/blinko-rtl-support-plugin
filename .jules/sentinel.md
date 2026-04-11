## 2024-05-18 - String.prototype.replace XSS via Regex Replacement Values
**Vulnerability:** Usage of string replacement in `aiPostService.ts` for user-controlled input. `this.settings.customPrompt.replace(/\{note\}/g, content)` allows an attacker to inject `$`, `$&`, `$1` patterns in `content` which gets parsed by `replace()` as regex instructions, potentially manipulating the AI prompt.
**Learning:** `String.prototype.replace(string|regexp, newSubstr)` treats `$` in `newSubstr` specially. This is a subtle form of injection that occurs when user-provided strings are directly passed as the replacement parameter.
**Prevention:** Always use a replacer function instead of a direct string when inserting user content via `replace()`: `.replace(/\{note\}/g, () => content)`.
