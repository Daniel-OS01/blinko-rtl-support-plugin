## 2024-05-20 - String Replace Injection Risk in AIPostService

**Vulnerability:** The `buildPrompt` method in `src/services/aiPostService.ts` uses direct string replacement to inject user-provided note content and tags into the custom prompt template. Specifically, `.replace(/\{note\}/g, content)` and `.replace(/\{tags\}/g, tags)`. If the `content` or `tags` contain regex replacement patterns like `$&`, `$'`, `$``, or `$1`, they will be evaluated during the replacement, potentially exposing fragments of the prompt template unexpectedly, corrupting the prompt structure, or acting as an injection vector.

**Learning:** `String.prototype.replace(pattern, replacementString)` processes special `$` tokens in `replacementString`. To treat `replacementString` strictly as literal text, a replacer function `() => replacementString` must be used instead. This is a common JavaScript trap when injecting user content into templates using `replace`.

**Prevention:** Whenever substituting untrusted user input into templates using `replace`, always use a callback function (`() => input`) rather than directly passing the string variable as the replacement.
