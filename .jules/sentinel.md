
## 2024-04-02 - Prompt Injection via Regex Backreferences
**Vulnerability:** Replacing `{note}` template parameters with raw user content using `String.prototype.replace(regex, string)` directly exposes the prompt to manipulation. A user can input text containing regex backreferences (e.g. `$&`, `$1`) which alters the injected text structure instead of rendering exactly as intended.
**Learning:** `String.prototype.replace` evaluates special characters like `$&` in the replacement string unless a replacer function is used instead. This could allow for Prompt Injection attacks by disrupting the expected prompt logic when user input isn't sanitized.
**Prevention:** Whenever injecting uncontrolled user input into a string template using `.replace()`, always pass a replacer arrow function `() => input` as the second argument rather than a direct string.
