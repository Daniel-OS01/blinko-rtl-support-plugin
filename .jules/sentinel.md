## 2025-04-06 - Unsafe string replacement in AI prompt generation
**Vulnerability:** Unsafe string replacement using `String.prototype.replace` with user input.
**Learning:** `String.prototype.replace` with a string replacement argument evaluates special patterns like `$&`. If user input contains these patterns, it can lead to template injection or unintended prompt modification when building AI prompts.
**Prevention:** Use an arrow function as the replacement argument (e.g., `() => input`) so the input is treated strictly as a literal string.
