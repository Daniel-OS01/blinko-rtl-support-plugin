## 2025-04-08 - Prompt Injection via Regex Replacer Patterns
**Vulnerability:** User input containing regex replacement patterns (like `$&` or `$'`) was being directly passed as the replacement string in `String.prototype.replace()`, which evaluated those patterns instead of treating them as literal text.
**Learning:** When using `String.prototype.replace()` with user-controlled input as the replacement, special patterns can cause unintended string manipulation or information disclosure.
**Prevention:** Always use a replacer function (e.g., `() => content`) instead of a string when the replacement text comes from user input.
