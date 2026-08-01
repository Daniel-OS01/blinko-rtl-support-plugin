# Change Log — Blinko RTL Support Plugin

> **Document type:** Chronological change record
> **Format:** Most recent changes first
> **Scope:** All sessions — latest branch `main`
> **Last updated:** 2026-08-01

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

## Session 7 Changes — 2026-08-01 (branch: `main`, commit `fa9a136`)

---

### [CL-S7-001] Open the editor through Blinko's own preview-to-edit handler, not a `dblclick` on the card

**Date:** 2026-08-01
**Branch:** `main`
**Commit:** `fa9a136`

**Files modified:**
- `src/services/blinkoDom.ts` — added `DETAIL_OVERLAY_SELECTOR`, `DETAIL_PREVIEW_PANE_SELECTOR`, `findDetailPreviewPane()`, `isEditorOpen()`
- `src/services/uiuxService.ts` — added `openEditorWhenDetailAppears()`, `pendingEditorOpen`/`editorOpenFrame` state, cancellation in `destroy()`
- `tests/services/uiuxService.test.ts` — replaced card-`dblclick` tests with overlay/preview-pane tests

**Root cause:** `cardClickOpensEditor` previously dispatched a synthetic `dblclick` directly on the note card to jump straight to the editor. Reading the app bundle (`assets/index-xZ6CcJO7.js`) showed that clicking a card only opens a read-only detail overlay (`div.fixed.inset-0[class*="z-[9999]"]`); the preview-to-edit toggle is bound to `onDoubleClick` on the overlay's content pane (`.flex-1.overflow-y-auto.min-h-0.py-4`), the same handler as the header's pencil button. No handler is bound to the card itself, so the previous `dblclick` was a no-op and the editor never opened.

**Changes:**
```typescript
// Before — dblclick dispatched on the card itself (nothing listens there):
if (this.settings.cardClickOpensEditor) {
  card.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true, composed: true }));
  requestAnimationFrame(() => { delete card.dataset.opening; });
  return;
}

// After — let the card's own click open the overlay, then poll for the
// preview pane (mounts asynchronously) and dblclick it once, up to 1.5s:
if (this.settings.cardClickOpensEditor) {
  this.openEditorWhenDetailAppears();
  // Fall through: the card's own click still opens the overlay.
}
```

`openEditorWhenDetailAppears()` polls on `requestAnimationFrame`, skips work when `isEditorOpen()` is already true, gives up quietly after 1.5s if no overlay appears, and guards against stacking polls from rapid clicks via `pendingEditorOpen`. `destroy()` now cancels any in-flight `editorOpenFrame`.

**Rationale:** Supersedes the fix attempted for the same symptom in PR #356, which dispatched `dblclick` on the card and consequently did nothing. This change derives the target element and event from the app's own source rather than from an assumption about where the toggle is bound. See `DECISION_LOG.md DEC-017`.

---

## Session 6 Changes — 2026-03-27 (branch: `claude/fix-hebrew-text-note-focus-ddReT`)

---

### [CL-S6-001] Add v1→v2 settings migration to UIUXService and RTLService

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`

**Files modified:**
- `src/types.ts` — `UIUXSettings` interface, `DEFAULT_UIUX_SETTINGS`
- `src/services/uiuxService.ts` — `load()`
- `src/services/rtlService.ts` — `loadSettings()`

**Changes:**

```typescript
// types.ts: added version field
export interface UIUXSettings {
  // ... existing fields ...
  _settingsVersion?: number;   // NEW
}
export const DEFAULT_UIUX_SETTINGS = {
  // ...
  _settingsVersion: 2,   // NEW
};

// uiuxService.ts — load(): added migration block
if (!stored._settingsVersion || stored._settingsVersion < 2) {
  merged.compactDatetime = true;
  merged.singleTapOpenNote = true;
  merged.backButtonClosesNote = true;
  merged.tapOutsideClosesNote = true;
  merged.reduceMotion = true;
  merged.interceptAIErrors = true;
  merged._settingsVersion = 2;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

// rtlService.ts — loadSettings(): added migration block
const storedVersion = (loadedSettings as any)._settingsVersion ?? 0;
if (storedVersion < 2) {
  this.settings.minRTLChars = 1;
  this.settings.darkMode = true;
  (this.settings as any)._settingsVersion = 2;
  this.storageManager.save(this.settings);
}
```

**Rationale:** `load()` used `{ ...DEFAULT_UIUX_SETTINGS, ...stored }` where stored JSON always won. Existing users had `singleTapOpenNote: false` (old default) stored, which overrode the new `true` default. The v1→v2 migration force-applies corrected defaults and persists the updated version stamp. Addresses ERR-013. See `DECISION_LOG.md DEC-015`.

---

### [CL-S6-002] Add childList editor-focus guard to RTL MutationObserver

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`

**Files modified:**
- `src/services/rtlService.ts` — `setupObserver()` childList mutation handler

**Changes:**

```typescript
// Before — childList mutations inside an active editor triggered RTL re-classification:
if (node.nodeType === Node.ELEMENT_NODE) {
  // process element ...
}

// After — added early return if mutation is inside a focused editable:
if (node.nodeType === Node.ELEMENT_NODE) {
  const activeEl = document.activeElement as HTMLElement | null;
  if (activeEl) {
    const editingRoot =
      activeEl.isContentEditable
        ? (activeEl.closest('[contenteditable]') ?? activeEl)
        : activeEl.closest('[contenteditable]') ??
          (activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'INPUT' ? activeEl : null);
    if (editingRoot && editingRoot.contains(element)) return;
  }
  // process element ...
}
```

**Rationale:** Vditor WYSIWYG mode generates `childList` mutations on every keypress (adds/removes formatting spans). These bypassed the existing `characterData` guard, re-classified direction, and toggled `rtl-force`/`ltr-force` classes — causing visible LTR↔RTL flicker. The editor-focus guard suppresses re-classification while an editable area is active.

---

### [CL-S6-003] Fix single-tap IGNORE_SELECTOR false-positive and heading double-fire

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`

**Files modified:**
- `src/services/uiuxService.ts` — `applySingleTap()` handler logic

**Root cause:** Two bugs in the single-tap click handler:
1. `IGNORE_SELECTOR` included `[class*="icon"]` which matched `document.body` (body has `blinko-custom-icons` from `applyBodyClasses()`). `target.closest(IGNORE_SELECTOR)` walked up to body, matched, and bailed out — meaning NO card tap was ever processed.
2. When the user clicked directly on the heading element (opener), the handler found the same element as opener and dispatched a second synthetic click, firing the heading handler twice.

**Changes:**

```typescript
// Before — IGNORE check walked all the way up to document/body:
if (target.closest(IGNORE_SELECTOR)) return;

// After — scoped to card descendants only; anchor links skipped:
// IGNORE_SELECTOR now includes a[href]
const ignoreMatch = target.closest(IGNORE_SELECTOR);
if (ignoreMatch && card.contains(ignoreMatch)) return;

// Before — no check; dispatched on opener even when user tapped it directly:
if (opener) {
  opener.dispatchEvent(new MouseEvent('click', ...));
}

// After — skip re-dispatch when target is the opener itself:
if (opener && opener.contains(target)) {
  requestAnimationFrame(() => { delete card.dataset.opening; });
  return;
}
if (opener) {
  opener.dispatchEvent(new MouseEvent('click', ...));
}
```

Also replaced CSS `:not([data-single-tap])` in `querySelectorAll` with a JS `_uiuxClickHandler` property check (avoiding happy-dom compound attribute pseudo-class issues). Replaced `opener.click()` with `opener.dispatchEvent(new MouseEvent('click', ...))` for reliable dispatch in test environments. Addresses ERR-014. See `DECISION_LOG.md DEC-016`.

---

## Session 5 Changes — 2026-03-27 (branch: `claude/fix-hebrew-text-note-focus-ddReT`)

---

### [CL-S5-001] Fix RTL typing flicker — skip characterData mutations on editable elements

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
**Commit:** `95afdc4`

**Files modified:**
- `src/services/rtlService.ts` — `setupObserver()` characterData branch

**Changes:**

```typescript
// Before — characterData mutations on editable elements were processed like any other:
} else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
  const target = ...;
  if (target) {
    let matched = false;
    for (const s of safeSelectors) { ... }
    if (matched) {
      this.pendingElements.add(target);
      hasRelevantMutation = true;
    }
  }
}

// After — added early-return guard for editable elements on characterData:
} else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
  const target = ...;
  if (target) {
    if (mutation.type === 'characterData') {
      const isEditable =
        target.isContentEditable ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'INPUT' ||
        !!target.closest('[contenteditable="true"], [contenteditable]');
      if (isEditable) return; // browser handles BiDi via unicode-bidi:plaintext
    }
    // ... rest unchanged
  }
}
```

**Rationale:** The mutation observer was re-processing editable elements on every keypress, toggling `rtl-force`/`ltr-force` CSS classes which caused a visible LTR↔RTL jump. Editable elements already carry `unicode-bidi: plaintext` via injected CSS, so per-character BiDi is handled by the browser natively. Addresses REQ-07. See also `DECISION_LOG.md DEC-011`.

---

### [CL-S5-002] Improve single-tap card selectors and click dispatch

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
**Commit:** `95afdc4`

**Files modified:**
- `src/services/uiuxService.ts` — `applySingleTap()` / `markAndListen()`

**Changes:**

```typescript
// Before — narrow selectors, fragile openBtn heuristic:
const cards = document.querySelectorAll<HTMLElement>(
  '[class*="note-card"]:not([data-single-tap]), ' +
  '[class*="blinko-card"]:not([data-single-tap]), ' +
  '.card-masonry-grid > div > div:not([data-single-tap])'
);
// handler: find openBtn (a, heading, [class*=open]) → click it OR dispatch on card

// After — broadened selectors, direct click on tapped element:
const cards = document.querySelectorAll<HTMLElement>(
  '[class*="note-card"]:not([data-single-tap]), ' +
  '[class*="blinko-card"]:not([data-single-tap]), ' +
  '[class*="blinko-note"]:not([data-single-tap]), ' +
  '[class*="note-item"]:not([data-single-tap]), ' +
  '.card-masonry-grid > div > div:not([data-single-tap]), ' +
  '.blog-masonry-grid > div > div:not([data-single-tap])'
);
// handler: skip interactive controls; dispatch click on tapped element (bubbles to React onClick)
```

**Rationale:** The previous `openBtn`-search heuristic failed when body text (`<p>`) was tapped in a card that also had a heading — it redirected the click to the heading, which might not be the React-managed opener. The new approach dispatches directly on the tapped element, relying on React event bubbling to reach the card's onClick. Addresses REQ-08. See `DECISION_LOG.md DEC-012`.

---

### [CL-S5-003] Update default settings (minRTLChars, darkMode, UIUX flags)

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
**Commit:** `95afdc4`

**Files modified:**
- `src/services/constants.ts` — `DEFAULT_SETTINGS`
- `src/types.ts` — `DEFAULT_UIUX_SETTINGS`

**Changes:**

```typescript
// constants.ts — DEFAULT_SETTINGS:
// Before: minRTLChars: 2, darkMode: false
// After:  minRTLChars: 1, darkMode: true

// types.ts — DEFAULT_UIUX_SETTINGS:
// Before: compactDatetime: false, singleTapOpenNote: false,
//         backButtonClosesNote: false, tapOutsideClosesNote: false, reduceMotion: false
// After:  compactDatetime: true,  singleTapOpenNote: true,
//         backButtonClosesNote: true,  tapOutsideClosesNote: true,  reduceMotion: true
```

**Rationale:** User reported that defaults did not match expected behaviour. `minRTLChars: 1` ensures the first Hebrew character triggers RTL detection (with `minRTLChars: 2`, a single character produced no RTL class, contributing to flicker). Addresses REQ-09.

---

### [CL-S5-004] Add 🧪 Tools tab; move 4 sections out of always-visible position

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
**Commit:** `95afdc4`

**Files modified:**
- `src/setting.tsx` — tab type, tab button bar, section wrappers

**Changes:**

```typescript
// Tab type widened:
// Before: 'simple' | 'advanced' | 'uiux' | 'aipost'
// After:  'simple' | 'advanced' | 'uiux' | 'aipost' | 'testing'

// New tab button added (orange bottom-border colour #fd7e14).

// The following sections were previously always-rendered (no tab wrapper).
// They are now wrapped in {activeTab === 'testing' && (<div>...</div>)}:
//   - 🎨 Dynamic CSS Rules
//   - 📌 Permanent CSS Settings
//   - 🧪 Test RTL Detection
//   - 🔧 Advanced Actions (reset / export / import)
```

**Rationale:** The four sections were always rendered regardless of active tab, cluttering the panel and contributing to a long scroll. A dedicated Tools tab groups diagnostic and power-user controls in one place. Addresses REQ-10.

---

### [CL-S5-005] Fix AI SSE chunk extraction + add x-trpc-source header

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
**Commit:** `95afdc4`

**Files modified:**
- `src/services/aiPostService.ts` — `collectWritingStream()`, `trpcMutate()`

**Changes:**

```typescript
// collectWritingStream — chunk extraction:
// Before (wrong path — silently returns empty string):
const chunk =
  (data?.result as any)?.data?.json?.chunk ??
  (data?.result as any)?.data?.chunk ??
  (data as any)?.chunk ??
  (data as any)?.data?.chunk;
if (chunk?.type === 'text-delta' && typeof chunk.textDelta === 'string') {
  fullText += chunk.textDelta;
}

// After (matches API_REFERENCE.md documented format):
const chunk =
  (data?.result as any)?.data ??
  (data?.result as any)?.data?.json?.chunk ??
  (data as any)?.data ??
  (data as any)?.chunk;
if (chunk?.type === 'text_delta' && typeof chunk.value === 'string') {
  fullText += chunk.value;                            // primary path
} else if (chunk?.type === 'text-delta' && typeof chunk.textDelta === 'string') {
  fullText += chunk.textDelta;                        // legacy fallback
}

// Added x-trpc-source header to both collectWritingStream and trpcMutate:
headers: {
  'Content-Type': 'application/json',
  'x-trpc-source': 'blinko-rtl-plugin',
  // ...
}
```

**Rationale:** `API_REFERENCE.md` documents the SSE envelope as `{"result":{"data":{"type":"text_delta","value":"..."}}}`. The previous code was looking for `.data.json.chunk.textDelta` — a different path that silently matched nothing, returning empty strings for all AI responses. Addresses REQ-11.

---

### [CL-S5-006] Fix connection test: use GET /api/v1/note/list instead of POST id:-99999

**Date:** 2026-03-27
**Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
**Commit:** `95afdc4`

**Files modified:**
- `src/setting.tsx` — `onClick` handler of Test Connection button

**Changes:**

```typescript
// Before — POST to note/upsert with invalid ID:
const res = await fetch(`${baseUrl}/api/v1/note/upsert`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ id: -99999, content: '__connection_test__' }),
});
if (res.ok || res.status === 404 || res.status === 400) { /* success */ }

// After — GET to note/list (read-only):
const res = await fetch(`${baseUrl}/api/v1/note/list?page=1&pageSize=1`, {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` },
});
if (res.ok) { /* success */ }
```

**Rationale:** Blinko returns HTTP 500 for `id: -99999` (invalid negative ID), not 400 or 404 as expected. The test logic correctly identified 500 as unexpected and showed a warning. Switching to a read-only GET request eliminates the dependency on Blinko's write-path error handling and is safer (no accidental mutations). Addresses REQ-12. See `DECISION_LOG.md DEC-013`.

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
