# Testing Guide — Blinko RTL Support Plugin

> **Document type:** Test execution, architecture, and authoring guide
> **Version:** 1.0
> **Last updated:** 2026-03-26

---

## Running Tests

### Prerequisites

```bash
bun install   # must be run before any test command
```

### Commands

```bash
# Run all service tests (the primary test suite)
bun test tests/services/

# Run the full CI suite (same as GitHub Actions)
bun test \
  tests/unit/ \
  tests/integration/ \
  tests/services/ \
  tests/utils/ \
  tests/components/ \
  tests/strategies.test.ts \
  tests/strategies_extra.test.ts \
  tests/regex_config.test.ts \
  tests/verify_dynamic_rtl.test.ts

# Run a single test file
bun test tests/services/uiuxService.test.ts

# Run with verbose output
bun test tests/services/ --verbose

# Run with timeout (milliseconds per test)
bun test tests/services/ --timeout 30000
```

### What Is Excluded and Why

| File | Excluded From | Reason |
|------|--------------|--------|
| `tests/renderer.test.ts` | All CI runs | Imports `src/renderer.ts` and `src/config.ts` which were removed as orphan files |

---

## Test Architecture

### Environment

Tests run in **Bun's test runner** with **happy-dom** providing the DOM environment:

```typescript
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch {
  // Already registered — ignore (safe for multiple test file imports)
}
```

The `try/catch` guard prevents errors when multiple test files in the same Bun worker process call `GlobalRegistrator.register()`.

### Test File Layout

```
tests/
├── services/
│   └── uiuxService.test.ts    UIUXService — all 6 phases of testing
├── unit/                      Pure function / utility tests
├── integration/               Multi-service interaction tests
├── utils/                     Utility function tests
└── components/                Preact component tests
```

---

## UIUXService Test Phases

`tests/services/uiuxService.test.ts` is organized in phases matching the implementation sessions:

| Phase | describe() block | Tests |
|-------|-----------------|-------|
| Phase 1 | Issue 1: Back button history guard | 5 tests — pushState once, no accumulation, overlay close, cleanup |
| Phase 1 | Issue 2: Single-tap on `<p>` text | 6 tests — redirect to heading, skip buttons/links, quick note fallback |
| Phase 1 | Issue 3A: Re-entry guard | 2 tests — exactly-once click, dataset.opening cleanup |
| Phase 1 | Issue 3B: CSS tag layout | 2 tests — no over-broad selector, no mismatched elements |
| Phase 2 | MutationObserver debounce | 3 tests — pre-existing cards, new cards via MO, disable cleanup |
| Phase 3 | tapOutsideClosesNote | 5 tests — outside click, inside click, disabled, destroy, Escape fallback |
| Phase 4 | reduceVerticalSpacing | 5 tests — body class, CSS var, slider, destroy |
| Phase 5 | AI 401 interceptor | 7 tests — 401 toast, non-AI endpoint, 200 no-toast, untouched response, off, destroy |
| General | Lifecycle: destroy() | 3 tests — all classes removed, localStorage persistence, load on construct |

---

## Common Test Patterns

### Helper Functions

```typescript
// Create a note card (Article type — has heading)
function makeCard(opts: { heading?: boolean; paragraph?: boolean } = {}): HTMLDivElement

// Create an overlay (for back button tests)
function makeOverlay(): HTMLDivElement

// Create an editor (for tap-outside tests)
function makeEditor(): { backdrop, editor, closeBtn }
```

### Standard beforeEach / afterEach

Every `describe` block uses:
```typescript
beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
  document.body.className = '';
  jest.clearAllMocks();
  service = new UIUXService();
});

afterEach(() => {
  service.destroy();
});
```

This ensures:
- No localStorage state bleeds between tests
- DOM is clean (no stale cards, overlays, editors)
- Body classes are reset
- Mock call counts are reset
- Service is freshly instantiated and properly destroyed

### Testing DOM Manipulation

```typescript
// Check body class was added
expect(document.body.classList.contains('blinko-xyz')).toBe(true);

// Check CSS custom property
const val = document.documentElement.style.getPropertyValue('--blinko-xyz');
expect(val).toBe('6px');

// Check element attribute
expect(card.getAttribute('data-single-tap')).toBe('true');
```

### Testing Event Handlers

```typescript
const clickSpy = jest.fn();
element.addEventListener('click', clickSpy);

element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

expect(clickSpy).toHaveBeenCalledTimes(1);
```

### Testing Async Behavior (rAF + setTimeout)

```typescript
// Wait for requestAnimationFrame callback
await new Promise(resolve => requestAnimationFrame(resolve));

// Wait for setTimeout(0) in AI interceptor
await new Promise(resolve => setTimeout(resolve, 10));

// Wait for debounce timer (150ms) + buffer
await new Promise(resolve => setTimeout(resolve, 300));
```

### Testing window.fetch Interception

```typescript
// Save original fetch
const originalFetch = window.fetch;

// Install mock BEFORE updateSettings so interceptor wraps the mock
window.fetch = jest.fn().mockResolvedValue({ status: 401, ok: false }) as any;
service.updateSettings({ interceptAIErrors: true });

await window.fetch('https://blinko.app/api/trpc/ai.autoTag');

// Verify restore
service.destroy();
expect(window.fetch).toBe(originalFetch);
```

---

## Known Limitations and Workarounds

### happy-dom CSS Selector Compatibility

**Issue:** happy-dom (as of v14–v16) does not reliably support complex `:not([attr*="..."])` pseudo-class selectors, particularly those combining `:not()` with substring attribute selectors.

**Example of broken pattern:**
```typescript
// This FAILS in happy-dom — returns null even when matching elements exist
document.querySelector('[class*="expanded"]:not([style*="display: none"])');
```

**Workaround:** Split the query into a `querySelectorAll` + JavaScript filter:
```typescript
const candidates = document.querySelectorAll<HTMLElement>('[class*="expanded"]');
const overlay = Array.from(candidates).find(el => el.style.display !== 'none') ?? null;
```

This pattern is now used in `applyBackButton()` and `applyTapOutsideClose()` in the service.

---

### Case-Insensitive Attribute Selectors

**Issue:** The `[attr*="value" i]` case-insensitive flag may have limited support in some happy-dom versions.

**Workaround:** Use `[attr*="value"]` (lowercase only) or filter in JavaScript for case-insensitive matching.

---

### MutationObserver Timing

Tests that rely on the MutationObserver debounce (150ms) must wait at least 300ms:
```typescript
await new Promise(resolve => setTimeout(resolve, 300));
```
Shorter waits may be flaky — the debounce timer fires after 150ms but timer precision in test environments varies.

---

## Writing New Tests

### Checklist for New Service Tests

```
□ Use GlobalRegistrator.register() at the top of the file (with try/catch)
□ beforeEach: clear localStorage, clear DOM, clear className, clearAllMocks
□ afterEach: service.destroy()
□ Test both enabled and disabled states for every toggle setting
□ Test that destroy() removes all side effects (body classes, event listeners, CSS vars)
□ For async tests: await the specific async event (rAF, setTimeout, MO debounce)
□ Do NOT use `:not([style*="..."])` in querySelector calls — use JS filter instead
□ For fetch mocking: set mock BEFORE updateSettings() so interceptor wraps the mock
```

### Checklist for New Feature Tests

When a new UIUXService feature is implemented, add tests covering:
1. Feature is inactive by default (no side effects without `updateSettings`)
2. Enabling the feature produces the expected DOM change
3. Disabling the feature reverts the DOM change
4. `destroy()` cleans up everything even if the feature is still enabled
5. Multiple `updateSettings()` calls do not accumulate side effects

---

## CI Integration

Tests run in GitHub Actions via `.github/workflows/test-comprehensive.yml`.

The workflow is organized into 4 jobs:
1. **typecheck** — `tsc --noEmit` (fast gate before running tests)
2. **test** (depends on typecheck) — full test suite with 30s per-test timeout
3. **build** (depends on typecheck) — production build + bundle size check (≤400 kB)
4. **visual** (depends on build, non-blocking) — Playwright visual verification

On test failure, logs are uploaded as artifacts named `test-failure-logs-<run-id>`.

---

*Document version: 1.0 — Created 2026-03-26*
