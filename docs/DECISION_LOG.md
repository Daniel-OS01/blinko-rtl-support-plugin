# Decision Log — Blinko RTL Support Plugin

> **Document type:** Architectural decision record (ADR)
> **Version:** 1.2
> **Last updated:** 2026-08-01
>
> Each entry records a significant technical or design decision, the context that drove it, the alternatives considered, and the rationale for the chosen approach. Future developers can understand WHY things are the way they are, not just what they are.

---

## Decision Index

| ID | Title | Date | Status |
|----|-------|------|--------|
| [DEC-017](#dec-017) | Poll for the detail overlay's preview pane and dblclick it, instead of dblclick on the card | 2026-08-01 | Accepted |
| [DEC-015](#dec-015) | Version-stamped settings migration (v1→v2) instead of re-setting defaults | 2026-03-27 | Accepted |
| [DEC-016](#dec-016) | Scope IGNORE_SELECTOR check to card descendants; add opener-contains-target guard | 2026-03-27 | Accepted |
| [DEC-001](#dec-001) | Use JS visibility filter instead of CSS `:not()` pseudo-class | 2026-03-26 | Accepted |
| [DEC-011](#dec-011) | Skip characterData mutations for editable elements to prevent RTL flicker | 2026-03-27 | Accepted |
| [DEC-012](#dec-012) | Dispatch click on tapped element (not openBtn heuristic) for single-tap | 2026-03-27 | Accepted |
| [DEC-013](#dec-013) | Replace POST id:-99999 with GET /api/v1/note/list for connection test | 2026-03-27 | Accepted |
| [DEC-014](#dec-014) | Add x-trpc-source header to all plugin tRPC requests | 2026-03-27 | Accepted |
| [DEC-002](#dec-002) | Debounce MutationObserver callback to 150ms | 2026-03-25 | Accepted |
| [DEC-003](#dec-003) | Use `card.dispatchEvent` (not `openBtn.click`) for quick note fallback | 2026-03-26 | Accepted |
| [DEC-004](#dec-004) | REST API v1 opt-in via settings, tRPC remains default | 2026-03-26 | Accepted |
| [DEC-005](#dec-005) | Install/uninstall logic owned by `apply()` caller, not callee guard | 2026-03-25 | Accepted |
| [DEC-006](#dec-006) | `DebouncedFn<T>` type with `.cancel()` on the debounce utility | 2026-03-25 | Accepted |
| [DEC-007](#dec-007) | Re-entry guard via `card.dataset.opening` (not a boolean flag) | 2026-03-24 | Accepted |
| [DEC-008](#dec-008) | Use `requestAnimationFrame` for re-entry guard cleanup | 2026-03-24 | Accepted |
| [DEC-009](#dec-009) | Bearer token stored in localStorage (not sessionStorage) | 2026-03-26 | Accepted |
| [DEC-010](#dec-010) | `id: -99999` as Test Connection dry-run signal | 2026-03-26 | Accepted |

---

## DEC-001

### Use JS visibility filter instead of CSS `:not([style*="..."])` pseudo-class

**Date:** 2026-03-26
**Status:** Accepted

**Context:**
The `applyBackButton()` handler needs to find overlays that are currently visible (not hidden via `display: none`). The natural CSS expression is:
```css
[class*="expanded"]:not([style*="display: none"])
```

During test execution under happy-dom, this selector returned `null` even when a matching element was present, causing two test failures (L117, L152 in `uiuxService.test.ts`).

**Alternatives considered:**
1. **CSS `:not()` with substring attribute** — fails in happy-dom; would also be brittle if visibility is controlled via CSS class rather than inline style
2. **`offsetParent !== null` check** — checks computed visibility but is not reliable for `visibility: hidden` elements and has different behavior across DOM environments
3. **JS querySelectorAll + filter** — query without `:not()`, then filter in JavaScript

**Decision:**
Use approach 3. Replace all `:not([style*="..."])` patterns in querySelector calls with a two-step: `querySelectorAll(selector without :not)` + `Array.from(candidates).find(el => el.style.display !== 'none' && el.style.visibility !== 'hidden')`.

**Consequences:**
- Tests pass in happy-dom and production browser environments
- Code is slightly more verbose (4 lines vs 1) but more explicit
- Visibility check is limited to inline `style` attribute (same as the CSS approach) — elements hidden via CSS class still need class-based detection if required in future

---

## DEC-002

### Debounce MutationObserver callback to 150ms

**Date:** 2026-03-25
**Status:** Accepted

**Context:**
The `applySingleTap()` MutationObserver fires `markAndListen()` on every DOM mutation. `markAndListen()` writes `data-single-tap` attributes, which are themselves DOM mutations, creating a feedback loop. Browser extensions (Bitwarden, 1Password) detect this cascade via their own observers and log errors.

**Alternatives considered:**
1. **No debounce, synchronous guard** — a boolean `isRunning` guard prevents recursion within a synchronous call but not across the async event queue (mutations queue asynchronously)
2. **`attributeFilter` in ObserverInit** — filtering to specific attributes prevents `data-*` writes from triggering but still allows new card additions to cascade if those new cards contain the filtered attributes
3. **150ms debounce** — collapses all mutations within a 150ms window into a single `markAndListen()` call; sufficiently long to swallow cascades but short enough to feel instant

**Decision:** 150ms debounce using the upgraded `debounce()` utility with `cancel()` for cleanup.

**Consequences:**
- New cards added to the DOM take up to 150ms to become single-tap enabled — imperceptible to users
- Console noise from browser extensions eliminated
- `cancel()` must be called during cleanup to prevent post-cleanup fires

---

## DEC-003

### Use `card.dispatchEvent()` (not `openBtn.click()`) for quick note fallback

**Date:** 2026-03-26
**Status:** Accepted

**Context:**
For Blinko quick notes (NoteType=0), `card.querySelector(openerSelector)` returns `null` because there are no heading elements. A fallback click mechanism is needed.

**Alternatives considered:**
1. **Click a visible paragraph (`<p>`)** — would set `openBtn = p`, but when user taps the `<p>` element, `target === openBtn`, making the `openBtn !== target` guard false → no action. Circular dead-end.
2. **Click a fabricated anchor** — insert a fake `<a>` into the card and click it → invasive DOM modification, could break Blinko's own event handlers
3. **Dispatch click on card** — mirrors what Blinko's own "open note" click handler expects: a click on the card element itself

**Decision:** Dispatch `new MouseEvent('click', { bubbles: true, cancelable: true })` on the card element. Blinko's React `onClick` prop on the card will fire, triggering navigation.

**Consequences:**
- Re-entry guard is mandatory: without it, the synthetic card click bubbles to the card, triggering the handler again, causing an infinite dispatch loop
- The synthetic event has `target === card`, which is checked in the test to distinguish synthetic from original (original has `target === p`)

---

## DEC-004

### REST API v1 opt-in via settings, tRPC remains default

**Date:** 2026-03-26
**Status:** Accepted

**Context:**
User reported note save failures. Provided a Bearer token and REST API v1 endpoint as an alternative auth path. Decision: how to integrate this without breaking existing installations.

**Alternatives considered:**
1. **Always use REST v1** — requires all users to configure a token; breaks backwards compatibility
2. **Auto-detect auth method** — detect session cookie validity and switch automatically; complex and error-prone
3. **Opt-in via settings** — REST v1 is used when both `blinkoApiUrl` and `blinkoApiToken` are set; otherwise tRPC is used

**Decision:** Opt-in (option 3). Empty-string defaults ensure existing installations continue to work without any configuration change.

**Consequences:**
- Users who don't need Bearer token auth are unaffected
- Users experiencing tRPC 401s can enable REST v1 by configuring credentials in the plugin settings
- The settings UI provides a Test Connection button for immediate feedback

---

## DEC-005

### Install/uninstall logic owned by `apply()` caller, not callee guard

**Date:** 2026-03-25
**Status:** Accepted

**Context:**
The original `applyAIErrorInterceptor()` had dual guards:
```typescript
if (this.aiInterceptorCleanup) return;   // already installed
if (!this.settings.interceptAIErrors) return;  // disabled
```

`apply()` called `applyAIErrorInterceptor()` unconditionally. When the setting was toggled off, `apply()` called the function, hit the first guard (already installed), and returned — the interceptor was never removed. The feature was effectively sticky-on.

**Alternatives considered:**
1. **Remove the first guard, check setting in callee** — when called after setting change, `this.settings.interceptAIErrors` would be `false`, so it would call `restoreAIErrorInterceptor()`. But this conflates two responsibilities in one function.
2. **Check setting in `apply()`, call separate install/restore** — clean separation of concerns

**Decision:** Option 2. `apply()` owns the conditional logic:
```typescript
if (this.settings.interceptAIErrors) {
  this.applyAIErrorInterceptor();
} else {
  this.restoreAIErrorInterceptor();
}
```

**Lesson generalized:** Guard patterns (`if (already_installed) return`) + unconditional callers = one-way latches. The caller must own install/uninstall branching.

---

## DEC-006

### `DebouncedFn<T>` type with `.cancel()` on the debounce utility

**Date:** 2026-03-25
**Status:** Accepted

**Context:**
`applySingleTap()` cleanup needs to cancel any pending debounced `markAndListen()` call when the feature is disabled. The plain `debounce()` return type was `(...args) => void` with no cancel mechanism.

**Alternatives considered:**
1. **Store timeout reference in service field** — leaks implementation details; service class would need knowledge of debounce internals
2. **Extend `debounce()` return type** — add `.cancel()` as a first-class method on the returned function

**Decision:** Extend the return type with a generic `DebouncedFn<T>` interface that includes `cancel: () => void`. The debounce utility is the right place for this — it owns the timer.

---

## DEC-007

### Re-entry guard via `card.dataset.opening` (not a boolean flag)

**Date:** 2026-03-24
**Status:** Accepted

**Context:**
When the plugin dispatches `openBtn.click()`, the synthetic event bubbles back up through the card, re-triggering the plugin's click handler. A guard is needed.

**Alternatives considered:**
1. **Module-level boolean** — `let isHandling = false` — global state, breaks with multiple cards
2. **WeakMap per card** — cleaner but more verbose
3. **`card.dataset.opening` attribute** — self-documenting, per-card, readable in DevTools

**Decision:** `card.dataset.opening`. Setting it before the synthetic click and deleting it in a `requestAnimationFrame` callback provides exactly the right scope: open during the synthetic event's bubble phase, closed after.

---

## DEC-008

### Use `requestAnimationFrame` for re-entry guard cleanup

**Date:** 2026-03-24
**Status:** Accepted

**Context:**
The re-entry guard `card.dataset.opening` must remain set until all event handlers triggered by the synthetic click have completed. DOM event handlers are synchronous, but multiple handlers may be queued on different elements in the bubbling path.

**Alternatives considered:**
1. **`setTimeout(0)`** — also defers to next macrotask, but `requestAnimationFrame` is more semantically appropriate ("after this paint frame's event processing")
2. **`queueMicrotask()`** — runs after current microtask queue; too early if handlers use Promises internally
3. **`requestAnimationFrame()`** — fires after layout and paint, after all synchronous event propagation for the current frame has completed

**Decision:** `requestAnimationFrame()`. It guarantees the guard persists through the full synchronous bubble phase before being cleared.

---

## DEC-009

### Bearer token stored in localStorage (not sessionStorage)

**Date:** 2026-03-26
**Status:** Accepted

**Context:**
The user's API Bearer token needs to persist across browser sessions (the user should not need to re-enter it every time).

**Alternatives considered:**
1. **sessionStorage** — lost when browser tab is closed; poor UX for a persistent configuration
2. **localStorage** — survives browser close/reopen; same-origin scripts can read it
3. **Encrypted localStorage** — mitigates same-origin script access but adds complexity

**Decision:** localStorage (option 2), consistent with all other plugin settings.

**Security note (documented):** Any script running on the same origin (Blinko instance URL) can read localStorage. This is acceptable for the current threat model since: the user controls the Blinko instance, the token is a Blinko API key (not a payment credential), and encrypted storage is listed as a future improvement in `OUTCOME_SUMMARY.md`.

---

## DEC-010

### `id: -99999` as Test Connection dry-run signal

**Date:** 2026-03-26
**Status:** Accepted

**Context:**
The "Test Connection" button needs to verify that the provided URL and Bearer token are valid without modifying real note data.

**Alternatives considered:**
1. **GET request to a non-mutating endpoint** — Blinko REST v1 may not have a `GET /health` or equivalent; would require a different endpoint
2. **POST with `id: null`** — ambiguous; server may interpret differently
3. **POST with a nonexistent negative ID** — servers typically return 400 (invalid input) or 404 (not found), both of which confirm auth passed

**Decision:** `id: -99999`. Treat 200/400/404 as auth-success (credentials were accepted by the server even if the operation failed). Treat 401/403 as auth-failure.

**Consequence:** If the Blinko API ever changes to return 401 for invalid inputs before checking auth, this logic would produce false-negatives. Currently, auth is checked before input validation in standard REST API design.

---

## DEC-011

### Skip characterData mutations for editable elements to prevent RTL flicker

**Date:** 2026-03-27
**Status:** Accepted

**Context:**
The `MutationObserver` in `rtlService.ts` observed `characterData` mutations (every keypress) and added the target element to `pendingElements` for direction-class processing. Toggling `rtl-force`/`ltr-force` on every keypress caused a visible LTR↔RTL jump while typing Hebrew. The reporter described this as text "flickering" on every letter.

**Alternatives Considered:**
1. **Increase debounce time** — reduces frequency of jumps but doesn't prevent them; adds input lag
2. **Process on blur only** — direction is only set when user leaves the field; classes would be wrong while typing
3. **Apply `unicode-bidi: plaintext` inline via JS** — achieves the same goal but adds a JS path for what CSS already handles
4. **Chosen: Skip editable elements in `characterData` handler entirely** — no processing, no class toggle, no flicker. `unicode-bidi: plaintext` in the injected CSS already handles per-character BiDi in the browser natively.

**Consequences:**
- Positive: Zero flicker while typing; zero processing overhead on keystrokes
- Positive: Consistent with how browser-native BiDi is supposed to work
- Neutral: Editable element direction classes are updated on `childList` mutations (new paragraphs) and on the periodic `processAllElements()` interval, just not on every keypress
- Negative: If a user pastes a large block of text and immediately blurs, the direction may take up to `processInterval` (5 s) to update. Acceptable.

---

## DEC-012

### Dispatch click on tapped element (not openBtn heuristic) for single-tap

**Date:** 2026-03-27
**Status:** Accepted — supersedes DEC-003

**Context:**
The original single-tap handler searched for an "opener element" (`a[href]`, `h1–h3`, `[class*="open"]`) and redirected the click there. When the user tapped `<p>` body text in a card that also had a heading, the handler clicked the heading — which did not reliably navigate in all Blinko card variants. Users reported that clicking text in the note card did not open the note.

**Alternatives Considered:**
1. **Broaden the openBtn selector** — tried in DEC-003; still fragile across Blinko versions
2. **Use `card.click()` unconditionally** — ignores the specific element tapped; may not trigger React's synthetic event path correctly
3. **Chosen: Dispatch click on `e.target` (or its nearest element ancestor)** — the click bubbles up through the React tree naturally. React's `onClick` on the card's ancestor receives it regardless of where in the card the user tapped.

**Consequences:**
- Positive: Works for all card types without needing to know the opener element's selector
- Positive: React event bubbling is a stable, well-defined mechanism
- Neutral: The re-entry guard (`card.dataset.opening`) must still prevent infinite loops
- Negative: If Blinko stops propagation somewhere inside the card, the click won't reach the handler — but this is equally true of any click-dispatch strategy

---

## DEC-013

### Replace POST id:-99999 with GET /api/v1/note/list for connection test

**Date:** 2026-03-27
**Status:** Accepted — supersedes DEC-010

**Context:**
`DEC-010` chose `POST /api/v1/note/upsert` with `id: -99999` as a dry-run connection test. The expectation was that Blinko would return 400/404 (auth passes, note not found). In practice, Blinko returns HTTP 500 for negative IDs. The test logic treated 500 as unexpected, showing a warning even when credentials were valid.

**Alternatives Considered:**
1. **Add 500 to "auth valid" set** — ambiguous; a real server error also returns 500, making false positives undetectable
2. **Use a different nonexistent positive ID** — depends on Blinko server behavior; still a write-path request
3. **Chosen: GET /api/v1/note/list?page=1&pageSize=1** — read-only, no write path, predictable 200/401/403 responses

**Consequences:**
- Positive: No dependency on Blinko's write-path input validation behavior
- Positive: No accidental data mutations during testing
- Positive: Clean 200 = valid, 401/403 = invalid auth mapping
- Neutral: If Blinko changes the list endpoint path in a future version, this test would break — but that is equally true of any specific endpoint

---

## DEC-014

### Add x-trpc-source header to all plugin tRPC requests

**Date:** 2026-03-27
**Status:** Accepted

**Context:**
Some Blinko deployments have middleware that validates or logs the `x-trpc-source` header. Plugin tRPC requests arrived without this header, which could cause the middleware to reject them with 401 (depending on configuration). Blinko's own frontend sends this header on all tRPC calls.

**Alternatives Considered:**
1. **Do not add the header** — works on Blinko instances without strict middleware; fails on others
2. **Chosen: Add `x-trpc-source: blinko-rtl-plugin`** — harmless on instances that don't check it; satisfies middleware on instances that do

**Consequences:**
- Positive: Broader compatibility with Blinko deployment configurations
- Positive: Makes plugin requests identifiable in server logs (useful for debugging)
- Neutral: No security implications; the header is not a secret

---

---

## DEC-015

### Version-stamped settings migration (v1→v2) instead of re-setting defaults

**Date:** 2026-03-27
**Status:** Accepted

**Context:** Session 5 changed five `UIUXSettings` boolean defaults from `false` to `true` and two RTL defaults. The naive merge `{ ...DEFAULT, ...stored }` means stored values always win, so existing users were unaffected by the new defaults.

**Decision:** Add `_settingsVersion?: number` to the settings type and `_settingsVersion: 2` to `DEFAULT_UIUX_SETTINGS`. In `load()` / `loadSettings()`, if stored version < 2, force-apply the corrected defaults and write back the updated version stamp.

**Alternatives considered:**
- **Wipe and re-load:** Discard all stored settings if version doesn't match → loses all user customizations (unacceptable).
- **No migration, document only:** Users must manually reset settings → confusing UX, reported as bug.
- **Per-key default injection:** For each key, check if value matches old default and replace with new default → fragile, hard to maintain as defaults change again in the future.

**Why chosen:** Version stamp is a standard pattern (used by browsers, databases, Electron apps). It allows surgical migration of only the changed fields while preserving user customizations for unchanged fields.

**Trade-offs:**
- The migration runs once and writes back to localStorage — negligible performance cost.
- Future sessions need to increment `_settingsVersion` and add a migration block — minimal maintenance overhead.

---

## DEC-016

### Scope IGNORE_SELECTOR check to card descendants; add opener-contains-target guard

**Date:** 2026-03-27
**Status:** Accepted

**Context:** `applySingleTap()` used `target.closest(IGNORE_SELECTOR)` to skip clicks on buttons, menus, etc. The selector included `[class*="icon"]`. `applyBodyClasses()` adds `blinko-custom-icons` to `document.body`. `target.closest('[class*="icon"]')` walked up to body, matched, returned body as truthy — so EVERY tap was silently ignored (handler returned early immediately).

A second bug: when the user clicked the heading element directly, `opener === target`, and the handler dispatched a synthetic click on it anyway, calling the heading listener a second time.

**Decision:**
1. Scope ignore check: `const ignoreMatch = target.closest(IGNORE_SELECTOR); if (ignoreMatch && card.contains(ignoreMatch)) return;` — only bails out if the match is inside the card.
2. Add `a[href]` to IGNORE_SELECTOR — anchor links navigate naturally, no synthetic re-dispatch needed.
3. Add opener guard: `if (opener && opener.contains(target)) { /* clear guard */ return; }` — no re-dispatch when user tapped the opener directly.
4. Replace CSS `:not([data-single-tap])` with JS `_uiuxClickHandler` property check (same pattern as DEC-001 for overlay detection).

**Alternatives considered:**
- **Remove `[class*="icon"]` from IGNORE_SELECTOR entirely:** Would allow clicks on icon buttons to bubble through and open notes accidentally.
- **Rename body classes to avoid "icon":** Would require changing CSS class conventions globally.

**Why chosen:** Scoping to `card.contains()` is precise and self-documenting. It makes the intent clear: "skip interactive elements within the card, not anywhere in the DOM."

---

## DEC-017

### Poll for the detail overlay's preview pane and dblclick it, instead of dblclick on the card

**Date:** 2026-08-01
**Status:** Accepted

**Context:** `cardClickOpensEditor` dispatched a synthetic `dblclick` on the note card to reach the editor in one tap. This was reported as non-functional (PR #356 tried the same fix again with no effect). Reading the deployed app bundle (`assets/index-xZ6CcJO7.js`) showed why: a card click only opens a read-only detail overlay (`div.fixed.inset-0[class*="z-[9999]"]`); the preview-to-edit toggle is bound as `onDoubleClick` on the overlay's own content pane (`.flex-1.overflow-y-auto.min-h-0.py-4`) — the same handler as the header's pencil (`tabler:edit`) button. Nothing is bound to the card itself, so the `dblclick` dispatched there was always a no-op.

The overlay also mounts asynchronously after the card's click handler runs, so the pane cannot be queried synchronously in the same tick.

**Alternatives considered:**
1. **`MutationObserver` on `document.body`** — reliably detects the overlay mounting, but is heavier to set up/tear down for a one-shot wait and requires the same 1.5s-style timeout logic anyway.
2. **Fixed `setTimeout` delay** — simplest, but brittle: too short misses slower renders, too long adds a perceptible delay on fast ones.
3. **`requestAnimationFrame` polling with a time budget** — checks every frame, naturally paced to rendering, easy to cancel via `cancelAnimationFrame`, and bounded so a note that never mounts an overlay (e.g. navigation elsewhere) doesn't leave a listener running forever.

**Decision:** Use approach 3. `openEditorWhenDetailAppears()` polls via `requestAnimationFrame` for up to 1.5s, dispatches one `dblclick` on the preview pane (`findDetailPreviewPane()`) as soon as it exists, skips entirely if `isEditorOpen()` is already true, guards against overlapping polls from rapid repeated clicks with a `pendingEditorOpen` flag, and cancels any in-flight frame in `destroy()`.

**Trade-offs:**
- If Blinko ever renders the overlay markup differently, both `DETAIL_OVERLAY_SELECTOR` and `DETAIL_PREVIEW_PANE_SELECTOR` need updating — same class of risk as every other selector already tracked in `blinkoDom.ts`.
- The 1.5s budget is a guess at "long enough for a slow render, short enough to not poll indefinitely"; it has not been tuned against real network/render conditions in a browser.
- Still unverified against a live Blinko instance — validated only against the class names read out of the bundle and against unit tests that model the overlay's DOM shape.

---

*Document version: 1.2 — Updated 2026-08-01 (added DEC-017; updated index)*
