## 2026-04-05 - Security fix: Prompt Injection via string replacement
**Vulnerability:** `String.prototype.replace()` can cause unintended string substitutions (prompt injection) when user content is substituted via string replace. If a user inputs special tokens like `$&`, `$'`, it changes the replacement output in unpredictable ways.
**Learning:** Using an arrow function (e.g. `() => content`) correctly injects literal text, mitigating the injection risk.
**Prevention:** Use a replacer function instead of a replacement string.
