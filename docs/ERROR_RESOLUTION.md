# Error Resolution — Blinko RTL Support Plugin

> **Document type:** Comprehensive error catalog with root cause analysis and resolutions
> **Version:** 1.0
> **Branch:** `claude/review-rtl-plugin-prs-OMCOM`
> **Last updated:** 2026-03-26
>
> **Note:** Issues 001–008 are also tracked in `ERROR_LOGS.md` with full reproduction details.
> This document adds root-cause analysis depth, unsuccessful approaches, and lessons learned.

---

## Error Index

| ID | Title | Severity | Status | Session |
|----|-------|----------|--------|---------|
| [ERR-001](#err-001) | `vite: command not found` on `bun run build` | Blocker | Resolved | 2026-03-25 |
| [ERR-002](#err-002) | `tsc: Cannot find type definition file for 'node'` | High | Resolved | 2026-03-25 |
| [ERR-003](#err-003) | Single-tap silently does nothing on Blinko quick notes | Critical | Resolved | 2026-03-26 |
| [ERR-004](#err-004) | AI writing/autotag fails with opaque 401 error | High | Resolved | 2026-03-26 |
| [ERR-005](#err-005) | AI error interceptor one-way install bug | Medium | Resolved | 2026-03-25 |
| [ERR-006](#err-006) | MutationObserver feedback loop with browser extensions | Medium | Resolved | 2026-03-25 |
| [ERR-007](#err-007) | Back button history entry accumulation | Critical | Resolved | 2026-03-24 |
| [ERR-008](#err-008) | Single-tap double-fires: opens note AND context menu | High | Resolved | 2026-03-24 |
| [ERR-009](#err-009) | CSS tag displacement in compact-datetime mode | High | Resolved | 2026-03-24 |

---

## ERR-001

### `vite: command not found` when running `bun run build`

**Date:** 2026-03-25
**Severity:** Blocker (prevents all builds)
**Component:** Build system

#### Error Message
```
$ bun run build
$ vite build --mode development
vite: command not found
```

#### Root Cause
`node_modules` directory was empty (0 packages installed). The repository was cloned or checked out but `bun install` had not been run. Bun does not automatically install dependencies — they must be explicitly installed before any `bun run` script that references local binaries from `node_modules/.bin/`.

#### Resolution
```bash
bun install
# Installed 252 packages in 14.3s
bun run build
# ✓ built in 559ms
```

#### Why It Happened
The working environment was freshly initialized. No prior session had run `bun install`. The error message from Bun is the same as a missing global command, which obscures the actual cause (missing local packages).

#### Prevention
- Always run `bun install` (or check `node_modules/.bin/vite` exists) before attempting builds in a new environment
- CI should include `bun install` as the first build step
- Consider adding a `preinstall` / `prepare` guard in `package.json`

#### Unsuccessful Attempts
- Running `bun run build` directly → `vite: command not found`
- Checking for global vite install → not present

---

## ERR-002

### `tsc: Cannot find type definition file for 'node'`

**Date:** 2026-03-25
**Severity:** High (TypeScript compilation fails)
**Component:** TypeScript / `@types/node`

#### Error Message
```
error TS2688: Cannot find type definition file for 'node'.
  The file is in the program because:
    Entry point of type library 'node' specified in compilerOptions
```

#### Root Cause
Same as ERR-001 — `@types/node` is in `devDependencies` but `node_modules` was empty. TypeScript cannot find the package without it being installed.

#### Resolution
Resolved as a side-effect of `bun install` (see ERR-001). `@types/node` was installed along with all other packages.

#### Lesson Learned
TypeScript errors about missing type definitions are almost always a missing `bun install` / `npm install` issue rather than a code problem. Always check `node_modules` exists and is populated before diagnosing TypeScript errors.

---

## ERR-003

### Single-tap silently does nothing on Blinko quick notes (NoteType=0)

**Date:** 2026-03-26
**Severity:** Critical (primary feature does not work for the most common note type)
**Component:** `uiuxService.ts` → `applySingleTap()`

#### Error Message
No error in console. Feature silently does nothing when user taps a quick note.

#### Root Cause Analysis

Blinko has two note types:
- **NoteType=1 (Article):** Has `h1`, `h2`, or `h3` heading elements plus a dedicated "open" button element
- **NoteType=0 (Blinko/Quick):** Has only `<p>` text content — no heading elements, no dedicated "open" button

The opener selector:
```typescript
card.querySelector('[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3')
```

Returns `null` for quick notes. The handler then fell through without executing any action:

```typescript
// openBtn === null for quick notes
if (openBtn && openBtn !== target && !openBtn.contains(target as Node)) {
  // This branch never executes when openBtn is null
}
// No else branch — silent return
```

The user's tap was consumed by the handler and no navigation occurred.

#### Why This Was Missed in Earlier Sessions
The initial single-tap fix (session 2026-03-24) focused on Article notes because the research assumed notes have title/heading elements. Quick notes (the **default** note type) were overlooked during the opener selector design.

#### Unsuccessful Approaches
1. **Add `p` to opener selector** (rejected): If `openBtn = card.querySelector('p')`, then when user taps a `<p>`, `target === openBtn`, making the guard `openBtn !== target` false. No click fires. Explored in an earlier session; removed because it created a dead-end condition.
2. **Expand class name substrings** (insufficient): Added more class name patterns (`"open"`, `"expand"`, `"title"`) but Blinko quick note cards genuinely have none of these.

#### Successful Resolution
Added `a[href]:not([href="#"])` to the opener selector (catches Next.js `<Link>` components that render as anchor tags) AND added an `else if (!openBtn)` fallback branch that dispatches a synthetic `MouseEvent('click', { bubbles: true, cancelable: true })` directly on the card:

```typescript
} else if (!openBtn) {
  card.dataset.opening = 'true';
  card.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  requestAnimationFrame(() => { delete card.dataset.opening; });
}
```

The re-entry guard (`card.dataset.opening`) prevents this handler from recursively processing its own synthetic event.

#### Key Insight
The correct mental model: Blinko's React component has an `onClick` prop on the card element. For Article notes, the plugin can delegate to a child element's click. For quick notes, the plugin must fire on the card itself — which is what Blinko's own click handler is watching.

---

## ERR-004

### AI writing/autotag fails with opaque 401 error

**Date:** 2026-03-26 (reported as ongoing issue from earlier sessions)
**Severity:** High (AI features completely non-functional)
**Component:** `aiPostService.ts` → `collectWritingStream()`, `runAutoTag()`

#### Error Messages
```
AI processing failed: AI writing API error: 401
Auto-tag failed: tRPC ai.autoTag failed: 401
```

#### Root Cause Analysis

**Primary cause (server-side):** Blinko's tRPC AI endpoints (`ai.writing`, `ai.autoTag`) return HTTP 401 when no AI provider API key is configured in Blinko server settings. This is **not a plugin bug** — it is Blinko's normal behavior when AI features are unconfigured.

**Secondary cause (plugin responsibility):** The plugin threw the raw HTTP error message without any guidance. Users saw `401` with no explanation of what to do.

**Why REST API v1 was also needed:** The user also reported that note saves via `note.upsert` (tRPC) were failing in some cases. The provided Bearer token suggests a deployment where Blinko's REST API v1 is the preferred auth mechanism.

#### Resolution — Error Message Improvement

`collectWritingStream()`:
```typescript
if (res.status === 401) {
  throw new Error(
    'AI feature requires an API key. In Blinko → Settings → AI, configure your ' +
    'AI provider (OpenAI, Anthropic, Ollama, etc.) and save. Then retry this action.'
  );
}
```

`runAutoTag()` — tRPC wraps HTTP errors, so detection must use string matching:
```typescript
if (err?.message?.includes('401') || err?.message?.toLowerCase().includes('unauthorized')) {
  throw new Error('AI auto-tag requires an API key. In Blinko → Settings → AI...');
}
```

#### Resolution — REST API v1 Path

When `blinkoApiUrl` and `blinkoApiToken` are configured, `updateNoteContent()` uses the Blinko REST API v1 instead of tRPC, bypassing the session-cookie auth requirement.

#### Lesson Learned
When an error is caused by server misconfiguration rather than a bug, the best plugin response is a clear, actionable error message. The plugin cannot fix the server-side issue but can eliminate user confusion.

---

## ERR-005

### AI error interceptor one-way install bug

**Date:** 2026-03-25
**Severity:** Medium (setting toggle had no effect; feature was sticky-on)
**Component:** `uiuxService.ts` → `applyAIErrorInterceptor()`

#### Error Message
No error. Silent behavioral defect: toggling `interceptAIErrors` from ON to OFF did not remove the `fetch` wrapper.

#### Root Cause Analysis

Original code in `apply()`:
```typescript
// Unconditionally called regardless of setting value
this.applyAIErrorInterceptor();
```

Original `applyAIErrorInterceptor()`:
```typescript
if (this.aiInterceptorCleanup) return;  // Guard: skip if already installed
if (!this.settings.interceptAIErrors) return;  // Guard: skip if disabled
// ... install interceptor
```

**The bug:** The first guard `if (this.aiInterceptorCleanup) return` prevented reinstallation. Combined with `apply()` always calling the function, once the interceptor was installed, changing `interceptAIErrors` to `false` would call `applyAIErrorInterceptor()` which immediately returned due to the first guard, never reaching the setting check. The interceptor stayed installed permanently until page reload.

#### Resolution

1. `apply()` made conditional:
```typescript
if (this.settings.interceptAIErrors) {
  this.applyAIErrorInterceptor();
} else {
  this.restoreAIErrorInterceptor();
}
```

2. Added `restoreAIErrorInterceptor()`:
```typescript
private restoreAIErrorInterceptor(): void {
  if (this.aiInterceptorCleanup) {
    this.aiInterceptorCleanup();
    this.aiInterceptorCleanup = null;
  }
}
```

3. Removed the redundant `if (!this.settings.interceptAIErrors) return` guard from `applyAIErrorInterceptor()` since the caller now handles the branching.

#### Lesson Learned
Guard patterns (`if (already_installed) return`) combined with unconditional callers create one-way latches. The caller must own the conditional logic for install/uninstall, not the callee.

---

## ERR-006

### MutationObserver feedback loop with browser extensions

**Date:** 2026-03-25
**Severity:** Medium (console noise; potential performance impact)
**Component:** `uiuxService.ts` → `applySingleTap()` → `MutationObserver`

#### Error Message
```
TypeError: ... (in __bootstrap-autofill-overlay.js)
  at MutationObserver callback
  [React call stack ~40 frames deep]
```

#### Root Cause Analysis

The `MutationObserver` watched `document.body` with `{ childList: true, subtree: true }`. The callback `markAndListen()` wrote `data-single-tap="true"` attributes to DOM nodes. These attribute writes are DOM mutations, which triggered the observer again, calling `markAndListen()` again, in a cascade.

Browser extensions (Bitwarden, 1Password) attach their own `MutationObserver` to watch for form field changes. The plugin's mutation cascade triggered these extensions' observers, causing them to fire their React-backed autofill overlay logic in a loop.

#### Resolution
Applied a 150ms debounce to the `MutationObserver` callback using the upgraded `debounce()` utility (see CL-003). This collapses all mutations within a 150ms window into a single `markAndListen()` call. The `DebouncedFn.cancel()` method is called during cleanup to drop any inflight pending call.

#### Unsuccessful Approaches
- Using `attributeFilter` in observer options: Would not prevent the cascade since `markAndListen()` writes `data-*` attributes which are always in the attribute mutation category
- Synchronous guard flag: A boolean `isRunning` guard would prevent re-entrance within a single synchronous call but not across the async mutation event queue

#### Lesson Learned
Any `MutationObserver` that modifies the DOM in its callback must be debounced. The observer's own writes will re-trigger it; debouncing collapses the cascade into a single call per user interaction window.

---

## ERR-007

### Back button history entry accumulation (from earlier session, archived)

**Date:** 2026-03-24
**Severity:** Critical
**Status:** Resolved — see `ERROR_LOGS.md ISSUE-001` for full details

**Summary:** `history.pushState` was called unconditionally on every `apply()` invocation, accumulating duplicate history entries on every settings change. Each settings update required an additional back-press to exit the app.

**Fix:** Added `private backButtonInitialized = false` guard; `history.pushState` now executes exactly once per enable-cycle.

---

## ERR-008

### Single-tap double-fires: opens note AND context menu (from earlier session, archived)

**Date:** 2026-03-24
**Severity:** High
**Status:** Resolved — see `ERROR_LOGS.md ISSUE-003` for full details

**Summary:** `openBtn.click()` dispatched a synthetic event that bubbled through the card, triggering context menu handlers registered on the card or its ancestors.

**Fix:** Re-entry guard via `card.dataset.opening`; `requestAnimationFrame` defers cleanup until after the bubble phase.

---

## ERR-009

### CSS tag displacement in compact-datetime mode (from earlier session, archived)

**Date:** 2026-03-24
**Severity:** High
**Status:** Resolved — see `ERROR_LOGS.md ISSUE-004` for full details

**Summary:** Overly broad CSS selector `.blinko-compact-datetime .card-masonry-grid [class*="flex"][class*="col"]` matched the tags container (which uses `flex flex-col` Tailwind classes), forcing tags into a horizontal row.

**Fix:** Replaced with narrowly-scoped selectors targeting only date/time metadata elements.

---

## Lessons Learned Summary

| # | Lesson | Applicable Context |
|---|--------|--------------------|
| 1 | Always run `bun install` before building in a fresh environment | Any Node.js/Bun project |
| 2 | TypeScript "missing type definition" errors usually mean missing `node_modules` | Any TypeScript project |
| 3 | When a feature silently does nothing, check for null-check guard conditions that create dead-ends | Event handler design |
| 4 | Blinko quick notes (NoteType=0) have no heading elements — they are structurally different from Article notes | Blinko plugin development |
| 5 | MutationObservers that write to the DOM must be debounced | Any DOM mutation callback |
| 6 | Install/uninstall logic should be owned by the caller, not hidden behind guards in the callee | Toggle/feature flag patterns |
| 7 | For server-side 401s that can't be fixed by the plugin, provide actionable error messages | Error handling UX |
| 8 | CSS substring selectors (`[class*="flex"]`) are dangerous with utility-class frameworks (Tailwind) | CSS architecture |
| 9 | tRPC wraps HTTP errors as strings; detect status codes via `err.message.includes('401')` | tRPC error handling |
| 10 | `history.pushState` guards must be tied to feature state, not call count | History API management |

---

*Document version: 1.0 — Created 2026-03-26*
