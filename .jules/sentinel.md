
## 2025-02-14 - Prevent Prompt Injection via String Replacement
**Vulnerability:** User content could inject regex replacement tokens (e.g., `$&`, `$1`) into AI prompts when using `String.prototype.replace()`.
**Learning:** `replace(regex, string)` interprets special tokens in the replacement string, which can cause prompt corruption or potential injection if the replacement text comes from user input.
**Prevention:** Always use a replacer function (e.g., `replace(regex, () => content)`) when injecting dynamic or user-supplied content.

## 2025-02-14 - Secure `window.fetch` Interception URL Validation
**Vulnerability:** `window.fetch` interceptor used a naive `url.includes()` check to identify AI API endpoints, which could accidentally match external URLs if they contained those strings (e.g. `https://attacker.com/?q=/trpc/ai`).
**Learning:** Broad string matching for URLs in global interceptors creates risks of sending sensitive data or unexpected behaviors to third-party domains.
**Prevention:** Always parse the URL using `new URL(urlStr, window.location.origin)` and strictly validate `url.origin === window.location.origin` and `url.pathname` rather than the entire URL string.
## 2026-06-14 - Prevent DoS from Large RegEx Processing
**Vulnerability:** Processing arbitrarily large inputs via regular expressions (like checking for mixed RTL/LTR content on paste) can lead to a Denial of Service (DoS) due to high CPU utilization.
**Learning:** In a security-focused environment, always enforce bounds on input data length before executing expensive operations, such as regex matches, on that data.
**Prevention:** Introduce early exits by adding simple `text.length > MAX_ALLOWED` validations prior to passing inputs to text processors or parsers.
