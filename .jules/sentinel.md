## 2025-02-23 - Prevent Regex Special Pattern Injection in Replace
**Vulnerability:** AI Prompt template substitution using `.replace(/{note}/g, content)` is vulnerable to string replacement pattern injection (e.g., if user content contains `$&`, it will incorrectly inject the matched string `{note}` into the text). This corrupts the generated AI prompt.
**Learning:** `String.prototype.replace(regex, string)` processes special token patterns like `$&`, `$``, `$'`, `$n` in the replacement string, causing unexpected data mutation if the replacement string comes from unsanitized user input.
**Prevention:** Always use an arrow function `() => userInput` for the replacer argument when the replacement value originates from user input.
