## 2024-06-26 - Improved disabled button accessibility
**Learning:** Native `disabled` attributes swallow pointer events, which prevents informative tooltips (`title`) from showing up to explain *why* the button is disabled. This is poor UX for complex states (like trying to delete a built-in preset vs having nothing selected).
**Action:** Replace `disabled` with `aria-disabled`, add an `onClick` guard, apply `cursor: not-allowed` when disabled, and use dynamic `title` attributes to explain the exact reason for the disabled state on hover.

## 2024-06-26 - Maintainability of complex disabled conditions in JSX
**Learning:** Repeating complex state conditions like `!settings.enabled || !selectedPresetId || BUILT_IN_PRESETS.some(...)` across multiple JSX attributes (`onClick`, `aria-disabled`, `cursor`, `opacity`, `title`) is prone to errors and harder to read.
**Action:** Extract complex disabled conditions into an explicit `const isDisabled = ...` boolean near the top of the component or within an IIFE immediately surrounding the element if needed for scoped variable access, making the code much cleaner and easier to maintain.
