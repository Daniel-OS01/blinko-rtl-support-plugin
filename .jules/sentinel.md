## 2024-05-24 - Prevent Prompt Injection via regex match patterns
**Vulnerability:** User-controlled content inserted into AI prompt templates could include regex special replacement patterns (like `$&` or `$'`), leading to unintended or malicious prompt structure manipulation.
**Learning:** Using `String.prototype.replace()` with a direct string replacement is vulnerable to regex special character injection. The replacer uses those patterns to reference parts of the match.
**Prevention:** Always use a replacer function (e.g., `() => userContent`) instead of a string literal when inserting user data into templates via regex.
