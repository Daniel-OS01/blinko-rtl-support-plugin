# Decision Log — Blinko RTL Support Plugin

> **Document type:** Architectural decision record (ADR)
> **Version:** 1.0
> **Last updated:** 2026-03-26
>
> Each entry records a significant technical or design decision, the context that drove it, the alternatives considered, and the rationale for the chosen approach. Future developers can understand WHY things are the way they are, not just what they are.

---

## Decision Index

| ID | Title | Date | Status |
|----|-------|------|--------|
| [DEC-001](#dec-001) | Use JS visibility filter instead of CSS `:not()` pseudo-class | 2026-03-26 | Accepted |
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

*Document version: 1.0 — Created 2026-03-26*
