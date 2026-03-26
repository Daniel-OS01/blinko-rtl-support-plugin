# Change Log — Blinko RTL Support Plugin

> **Document type:** Chronological change record
> **Format:** Most recent changes first
> **Scope:** All sessions on branch `claude/review-rtl-plugin-prs-OMCOM`

---

## Format

Each entry follows this structure:

```
### [CL-NNN] Short title
Date | Branch | Commit SHA (if known)
Files: list of modified files
Rationale: why the change was made
```

---

## Change Log

---

### [CL-009] Add API Connection settings section to AI Post tab

**Date:** 2026-03-26
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Commit:** `874f07f`

**Files modified:**
- `src/setting.tsx` — Added "🔗 API Connection (Optional)" section between prompt test and "How It Works" box; added three new `useState` hooks (`apiConnTestResult`, `apiConnTesting`, `showApiToken`)

**Changes:**
- New section rendered inside the AI Post tab conditional block
- **URL input:** `type="text"`, placeholder `"https://blink.psy-tech.link"`, persisted via `aiPostService.save({ blinkoApiUrl })` on every keystroke
- **Token input:** `type="password"` by default; `showApiToken` state toggles between `password` and `text`; Show/Hide button adjacent
- **Test Connection button:** disabled when either field is empty; on click POSTs `{ id: -99999, content: '__connection_test__' }` to `${blinkoApiUrl}/api/v1/note/upsert` with Bearer auth; treats 200/400/404 as auth-success (note not found is OK); treats 401/403 as auth failure; network errors caught and shown
- Inline result span uses green color for ✅ and red for ❌

**Rationale:** Users had no way to configure REST API v1 credentials without editing localStorage directly. The UI section provides self-contained credential management without requiring developer tools access.

---

### [CL-008] Improve AI 401 error messages in runAutoTag()

**Date:** 2026-03-26
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Commit:** `874f07f`

**Files modified:**
- `src/services/aiPostService.ts` — `runAutoTag()` now wraps `trpcMutate` in try/catch; detects 401 / "unauthorized" in error message string; rethrows with actionable guidance

**Changes:**
```typescript
// Before
const result = await trpcMutate<string[]>('ai.autoTag', { content });
return Array.isArray(result) ? result : [];

// After — wraps in try/catch to intercept auth errors
try {
  const result = await trpcMutate<string[]>('ai.autoTag', { content });
  return Array.isArray(result) ? result : [];
} catch (err: any) {
  if (err?.message?.includes('401') || err?.message?.toLowerCase().includes('unauthorized')) {
    throw new Error('AI auto-tag requires an API key. In Blinko → Settings → AI...');
  }
  throw err;
}
```

**Rationale:** Raw `tRPC ai.autoTag failed: 401` provides no guidance. Detection via string matching (`'401'` or `'unauthorized'`) is necessary because tRPC wraps errors without preserving HTTP status code as a numeric property.

---

### [CL-007] Add REST API v1 note update path to aiPostService

**Date:** 2026-03-26
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Commit:** `874f07f`

**Files modified:**
- `src/services/aiPostService.ts` — `updateNoteContent()` expanded from 1 line to 22 lines

**Changes:**
```typescript
// Before — tRPC only
async updateNoteContent(noteId: number, content: string): Promise<void> {
  await trpcMutate('note.upsert', { id: noteId, content });
}

// After — REST v1 with Bearer token when configured; tRPC fallback
async updateNoteContent(noteId: number, content: string): Promise<void> {
  const s = this.getSettings();
  if (s.blinkoApiUrl && s.blinkoApiToken) {
    const url = `${s.blinkoApiUrl.replace(/\/$/, '')}/api/v1/note/upsert`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${s.blinkoApiToken}`,
      },
      body: JSON.stringify({ id: noteId, content }),
    });
    if (!res.ok) throw new Error(`REST API note update failed: ${res.status} ${res.statusText}`);
    return;
  }
  await trpcMutate('note.upsert', { id: noteId, content });
}
```

**Rationale:** tRPC uses session-cookie auth which can fail in certain deployment configurations. Bearer token via REST v1 is more robust and explicit.

---

### [CL-006] Improve AI 401 error message in collectWritingStream()

**Date:** 2026-03-26
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Commit:** `874f07f`

**Files modified:**
- `src/services/aiPostService.ts` — `collectWritingStream()` 401 branch

**Changes:**
```typescript
// Before
if (!res.ok) {
  throw new Error(`AI writing API error: ${res.status} ${res.statusText}`);
}

// After
if (!res.ok) {
  if (res.status === 401) {
    throw new Error(
      'AI feature requires an API key. In Blinko → Settings → AI, configure your ' +
      'AI provider (OpenAI, Anthropic, Ollama, etc.) and save. Then retry this action.'
    );
  }
  throw new Error(`AI writing API error: ${res.status} ${res.statusText}`);
}
```

**Rationale:** The 401 on `ai.writing` is a known and actionable situation — user needs to configure an AI provider. The previous message gave no path to resolution.

---

### [CL-005] Add blinkoApiUrl + blinkoApiToken fields to AIPostSettings

**Date:** 2026-03-26
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Commit:** `874f07f`

**Files modified:**
- `src/types.ts` — `AIPostSettings` interface and `DEFAULT_AI_POST_SETTINGS` constant

**Changes:**
```typescript
// Added to interface
blinkoApiUrl: string;    // e.g. "https://blink.psy-tech.link" — no trailing slash
blinkoApiToken: string;  // Bearer token from Blinko Settings → API Keys

// Added to defaults
blinkoApiUrl: '',
blinkoApiToken: '',
```

**Rationale:** Prerequisite for CL-007 and CL-009. Empty string defaults mean existing installations gracefully fall back to tRPC behavior without any migration.

---

### [CL-004] Fix single-tap for Blinko quick notes (NoteType=0)

**Date:** 2026-03-26
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Commit:** `874f07f`

**Files modified:**
- `src/services/uiuxService.ts` — `applySingleTap()` inner handler closure

**Changes:**
```typescript
// Before — only handled Article notes (has h1/h2/h3)
const openBtn = card.querySelector<HTMLElement>(
  '[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3'
);
if (openBtn && openBtn !== target && !openBtn.contains(target as Node)) {
  card.dataset.opening = 'true';
  openBtn.click();
  requestAnimationFrame(() => { delete card.dataset.opening; });
}
// Quick notes: openBtn === null → nothing happened

// After — handles both types
const openBtn = card.querySelector<HTMLElement>(
  'a[href]:not([href="#"]), [class*="open"], [class*="expand"], [class*="title"], h1, h2, h3'
);
if (openBtn && openBtn !== target && !openBtn.contains(target as Node)) {
  card.dataset.opening = 'true';
  openBtn.click();
  requestAnimationFrame(() => { delete card.dataset.opening; });
} else if (!openBtn) {
  // Blinko quick note fallback
  card.dataset.opening = 'true';
  card.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  requestAnimationFrame(() => { delete card.dataset.opening; });
}
```

**Key decisions:**
- Added `a[href]:not([href="#"])` to opener selector — Next.js `<Link>` renders as `<a>`, and clicking it directly triggers React Router navigation
- `else if (!openBtn)` branch dispatches a **new** `MouseEvent` on the **card** (not `openBtn.click()`) so Blinko's React `onClick` prop fires
- Re-entry guard (`card.dataset.opening`) prevents this handler from processing its own synthetic event

**Rationale:** Blinko quick notes (the default note type, NoteType=0) have no heading elements. The opener selector returned `null`, causing single-tap to silently do nothing. This fix is the primary reason single-tap was reported as "not working."

---

### [CL-003] Upgrade debounce utility with DebouncedFn type + cancel()

**Date:** 2026-03-25
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

**Files modified:**
- `src/utils/debounce.ts` — Added `DebouncedFn<T>` generic type with `.cancel()` method

**Changes:**
```typescript
type DebouncedFn<T extends (...args: any[]) => void> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
};
// debounced.cancel() added: clears pending timeout and sets to null
```

**Rationale:** `applySingleTap()` cleanup needed to cancel inflight debounce timers when the feature is disabled or the component is destroyed. Without `cancel()`, a queued `markAndListen()` could fire after cleanup, re-attaching event listeners to already-cleaned-up cards.

---

### [CL-002] Make AI error interceptor reactive to setting changes

**Date:** 2026-03-25
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

**Files modified:**
- `src/services/uiuxService.ts` — `apply()`, `applyAIErrorInterceptor()`, new `restoreAIErrorInterceptor()`

**Changes:**
- `apply()` now conditionally calls `applyAIErrorInterceptor()` or `restoreAIErrorInterceptor()` based on `this.settings.interceptAIErrors`
- Added `restoreAIErrorInterceptor()` which checks for `this.aiInterceptorCleanup` and calls it if present
- Removed the early-return guard `if (this.aiInterceptorCleanup) return` from `applyAIErrorInterceptor()` that prevented re-installation after toggle-off/on cycles

**Rationale:** The original interceptor had a one-way install bug. Once installed, toggling `interceptAIErrors` off had no effect because `apply()` called `applyAIErrorInterceptor()` unconditionally and the guard blocked re-execution. The feature was effectively sticky-on.

---

### [CL-001] Archive all 13 open PRs (#65–#77)

**Date:** 2026-03-25
**Branch:** `main` (PR operations)

**PRs affected:** #65, #66, #67, #68, #69, #70, #71, #72, #73, #74, #75, #76, #77

**Action:** Each PR was closed via GitHub API with a comment explaining that all changes were already incorporated in PR #78 (merged into `claude/blinko-ui-ux-enhancements-gfN4H`).

**Rationale:** PR #78 was identified as a comprehensive merge that included all features proposed in PRs #65–#77. Leaving 13 identical/duplicate PRs open would create noise and risk re-merging already-applied changes.

---

---

## Session 2 Changes (2026-03-25) — branch `claude/review-rtl-plugin-prs-OMCOM`

These changes were made in session 2 following the initial PR archive and first bug-fix pass. They address issues discovered after PR #78 was merged.

---

### [CL-S2-004] Restructure applyTapOutsideClose() with helpers and body class

**Date:** 2026-03-25
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

**Files modified:**
- `src/services/uiuxService.ts` — `applyTapOutsideClose()` rewritten

**Changes:**
- Extracted `findActiveOverlay()` inner helper — returns the currently visible editor element using `querySelectorAll` + JS visibility filter (same pattern later applied to `applyBackButton()`)
- Extracted `closeViaButtonOrEscape()` inner helper — tries to click a `[class*="close"]` button first; falls back to dispatching `KeyboardEvent('keydown', { key: 'Escape' })` on the editor
- Added `blinko-tap-outside-close-active` body class on enable; removed on disable/destroy — allows CSS to suppress pointer-events on the backdrop if needed
- Uses capture-phase `mousedown` listener on `document` for reliable outside-click detection before React's synthetic event system can process it

**Rationale:** Original implementation was a single monolithic closure. Extracting helpers makes the logic independently testable and mirrors how `applyBackButton()` was restructured.

---

### [CL-S2-003] Integrate debounce() utility into applySingleTap()

**Date:** 2026-03-25
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

**Files modified:**
- `src/services/uiuxService.ts` — `applySingleTap()` observer callback

**Changes:**
```typescript
// Before — inline manual timer (no cancel support)
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedMarkAndListen = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(markAndListen, 150);
};
// cleanup: if (debounceTimer) clearTimeout(debounceTimer);

// After — typed DebouncedFn with cancel()
const debouncedMarkAndListen = debounce(markAndListen, 150);
const observer = new MutationObserver(debouncedMarkAndListen);
// cleanup: debouncedMarkAndListen.cancel();
```

**Rationale:** The upgraded `debounce()` utility (CL-S2-002) provides a typed `.cancel()` method that is semantically clearer and cleaner than storing a raw timer reference in the surrounding closure.

---

### [CL-S2-002] Add DebouncedFn<T> type with cancel() to debounce utility

**Date:** 2026-03-25
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

**Files modified:**
- `src/utils/debounce.ts` — added `DebouncedFn<T>` generic type, added `debounced.cancel()` method

**Changes:**
```typescript
// Added type
type DebouncedFn<T extends (...args: any[]) => void> =
  ((...args: Parameters<T>) => void) & { cancel: () => void };

// Added method on returned function
debounced.cancel = () => {
  if (!timeout) return;
  clearTimeout(timeout);
  timeout = null;
};
```

**Rationale:** `applySingleTap()` cleanup needed to cancel any pending debounced `markAndListen()` call when the feature is disabled. Without `.cancel()`, a queued call could fire after cleanup, re-attaching event listeners to already-cleaned-up cards.

---

### [CL-S2-001] Fix AI error interceptor one-way install bug

**Date:** 2026-03-25
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

**Files modified:**
- `src/services/uiuxService.ts` — `apply()`, `applyAIErrorInterceptor()`, new `restoreAIErrorInterceptor()`

**Changes:**

```typescript
// Before — unconditional call; once installed, setting toggle had no effect
apply(): void {
  // ...
  this.applyAIErrorInterceptor();  // always called
}
applyAIErrorInterceptor(): void {
  if (this.aiInterceptorCleanup) return;  // guard prevented re-entry but also prevented uninstall
  if (!this.settings.interceptAIErrors) return;
  // ... install
}

// After — apply() owns install/uninstall branching
apply(): void {
  // ...
  if (this.settings.interceptAIErrors) {
    this.applyAIErrorInterceptor();
  } else {
    this.restoreAIErrorInterceptor();
  }
}
// New method: restoreAIErrorInterceptor() calls cleanup and nulls it
```

**Rationale:** The first guard `if (this.aiInterceptorCleanup) return` combined with an unconditional caller created a one-way latch. Once installed, toggling `interceptAIErrors` off never reached the setting check. Fix: move conditional logic to the caller; see `DECISION_LOG.md DEC-005`.

---

### [CL-S2-000] Fix back button, single-tap body text, dual-event, and tag CSS (session 1 follow-up)

**Date:** 2026-03-24 to 2026-03-25
**Branch:** `claude/blinko-ui-ux-enhancements-gfN4H` (earlier branch, context reference)

**Summary of changes in the earlier branch** (detailed in `IMPLEMENTATION_PLAN.md Part A` and `ERROR_LOGS.md ISSUE-001 through ISSUE-004`):

| Change | File | Root cause fixed |
|--------|------|-----------------|
| `history.pushState` one-time guard | `uiuxService.ts` | Logout blocked by accumulated history entries |
| Remove `p` from opener selector | `uiuxService.ts` | `<p>` tap created `target === openBtn` dead-end |
| Add `card.dataset.opening` re-entry guard | `uiuxService.ts` | Synthetic click triggered context menu |
| Narrow compact-datetime CSS selector | `Blinko-UIUX.css` | Tags displaced to right margin |

---

## Previous Session Changes (Reference)

Full detail for session 1 changes is in `IMPLEMENTATION_PLAN.md` (Part A Phase 2) and `ERROR_LOGS.md` (ISSUE-001 through ISSUE-008).

---

*Document version: 2.0 — Updated 2026-03-26 (added session 2 change entries CL-S2-000 through CL-S2-004)*
