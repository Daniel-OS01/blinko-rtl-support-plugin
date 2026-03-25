# Error Logs — Blinko RTL Support Plugin

> **Document type:** Structured issue tracking & historical archive
> **Maintainer:** daniel-os01
> **Format version:** 1.0

---

## Submission Template

When reporting a new issue, copy the template below and append it to the [Open Issues](#open-issues) section.

```markdown
### [ISSUE-XXX] Short title

| Field | Value |
|-------|-------|
| **ID** | ISSUE-XXX |
| **Status** | Reported |
| **Severity** | Critical / High / Medium / Low |
| **Component** | uiuxService / rtlService / CSS / setting.tsx / build |
| **Reported by** | @username |
| **Reported date** | YYYY-MM-DD |
| **Plugin version** | x.y.z |
| **Affected platforms** | Android / Windows / Web / All |

#### Description
<!-- One-paragraph description of the defect and its user-visible impact -->

#### Reproduction Steps
1. Step 1
2. Step 2
3. Step 3

#### Expected Behavior
<!-- What should happen -->

#### Actual Behavior
<!-- What actually happens -->

#### Console Output / Errors
\`\`\`
(paste any console errors here)
\`\`\`

#### Screenshots / Videos
<!-- Attach or link if available -->

#### Resolution Notes
<!-- Filled in when resolved -->
```

---

## Status Lifecycle

```
Reported → Confirmed → In Progress → Resolved → Verified → [Closed]
                                        ↓
                                    Reopened (if regression)
```

| Status | Description |
|--------|-------------|
| **Reported** | Issue submitted; not yet reproduced by maintainer |
| **Confirmed** | Root cause identified and reproduced |
| **In Progress** | Fix actively being developed |
| **Resolved** | Fix committed; pending validation |
| **Verified** | Fix confirmed working on target platforms |
| **Closed** | Issue archived; no further action needed |
| **Reopened** | Previously resolved; regression detected |

---

## Open Issues

*No open issues at time of document creation.*

---

## Historical Archive

Issues resolved during the initial audit (2026-03-24) are documented below.

---

### [ISSUE-001] Back button does not close expanded notes

| Field | Value |
|-------|-------|
| **ID** | ISSUE-001 |
| **Status** | Verified |
| **Severity** | Critical |
| **Component** | `uiuxService.ts` → `applyBackButton()` |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | Android (hardware back button), Web |

#### Description
When the `backButtonClosesNote` setting is enabled, the Android hardware back button fails to close expanded note overlays. Additionally, the back button becomes completely blocked during logout flows, trapping the user in the app.

#### Reproduction Steps
1. Enable "Back button closes note" in UI/UX settings
2. Open any note to expanded/overlay view
3. Press the Android hardware back button (or browser back)
4. **Expected:** Note overlay closes
5. **Actual:** Nothing happens (or browser navigates away instead of closing overlay)

**Logout blockage reproduction:**
1. Enable "Back button closes note" in UI/UX settings
2. Change any other UI/UX setting 3–4 times
3. Attempt to logout using browser back navigation
4. **Expected:** Navigation proceeds
5. **Actual:** Each back press just pops a plugin-injected dummy entry; real navigation requires N presses where N = number of settings changes

#### Root Cause
1. `history.pushState(null, '', window.location.href)` was called unconditionally on every `apply()` invocation. Since `apply()` is called on every `updateSettings()`, dummy history entries accumulated without bound.
2. `e.preventDefault()` was called on `PopStateEvent`, which is non-cancelable — this had no effect but was misleading.

**Cross-reference:** `RESEARCH_FINDINGS.md §3`

#### Resolution
- Added `private backButtonInitialized = false` guard field to `UIUXService`
- Wrapped `history.pushState` in `if (!this.backButtonInitialized)` — executes once per enable-cycle
- Removed `e.preventDefault()` from handler
- Sentinel state is now re-pushed inside the handler only when an overlay is found and closed
- `backButtonInitialized` reset to `false` in the cleanup function

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/services/uiuxService.ts`

#### Verification Checklist
- [x] `history.length` increments by 1 on feature enable (not on subsequent settings changes)
- [x] Back press closes overlay when overlay is present
- [x] Back press navigates away when no overlay is present
- [x] Logout flow unblocked

---

### [ISSUE-002] Tapping note body text does not open note

| Field | Value |
|-------|-------|
| **ID** | ISSUE-002 |
| **Status** | Verified |
| **Severity** | Critical |
| **Component** | `uiuxService.ts` → `applySingleTap()` |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | Android, Web |

#### Description
When `singleTapOpenNote` is enabled, tapping the text content area (`<p>` elements) of a note card does nothing. The note does not open. The defect is specific to the text content region — tapping note titles/headings works.

#### Reproduction Steps
1. Enable "Single tap opens note" in UI/UX → Navigation settings
2. On the notes list, tap on the body text of any note (not the title)
3. **Expected:** Note opens in detail/expanded view
4. **Actual:** Nothing happens

#### Root Cause
The `querySelector` opener selector included `p` as a fallback:
```typescript
'[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3, p'
```
When the user tapped a `<p>` element, both `target` and `openBtn` resolved to the same `<p>`. The guard `if (openBtn && openBtn !== target)` evaluated to `false`, blocking the synthetic click.

**Cross-reference:** `RESEARCH_FINDINGS.md §4`

#### Resolution
- Removed `p` from the opener selector — paragraphs are content, not openers
- New selector: `'[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3'`
- When user taps `<p>`, `openBtn` now resolves to the card's heading/title element, satisfying `openBtn !== target`

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/services/uiuxService.ts`

---

### [ISSUE-003] Single tap simultaneously opens note AND context menu

| Field | Value |
|-------|-------|
| **ID** | ISSUE-003 |
| **Status** | Verified |
| **Severity** | High |
| **Component** | `uiuxService.ts` → `applySingleTap()` |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | Android, Web |

#### Description
When `singleTapOpenNote` is enabled, a single tap on a note card opens both the note detail view AND a contextual menu overlay simultaneously. Two UI layers appear at once, causing a severely degraded user experience.

#### Reproduction Steps
1. Enable "Single tap opens note" in UI/UX → Navigation settings
2. Tap any note card once
3. **Expected:** Only the note detail view opens
4. **Actual:** Note detail view opens AND the context menu overlay appears

#### Root Cause
`openBtn.click()` dispatches a new synthetic `MouseEvent` on `openBtn`. This event bubbles up through the DOM — passing through the card element. Any context menu or other handler listening on the card or its ancestors received this bubbled synthetic click in addition to the original click, triggering two separate actions.

**Cross-reference:** `RESEARCH_FINDINGS.md §5`

#### Resolution
Added a re-entry guard using `card.dataset.opening`:
```typescript
if (card.dataset.opening) return;
card.dataset.opening = 'true';
openBtn.click();
requestAnimationFrame(() => { delete card.dataset.opening; });
```
`requestAnimationFrame` defers cleanup until after the synthetic click's bubble phase completes, blocking all re-entrant activations.

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/services/uiuxService.ts`

---

### [ISSUE-004] Note tags render to right margin instead of below content

| Field | Value |
|-------|-------|
| **ID** | ISSUE-004 |
| **Status** | Verified |
| **Severity** | High |
| **Component** | `src/assets/styles/Blinko-UIUX.css` |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | All (visible whenever compact-datetime mode is enabled) |

#### Description
When the "Compact datetime" feature is enabled, note-associated tags are incorrectly displaced horizontally to the right margin of the card instead of appearing in their expected vertical position below the note content.

#### Expected Layout
```
┌─────────────────────────┐
│ Note Title/Content      │
│ Note body text...       │
├─────────────────────────┤
│ [Tag1] [Tag2] [Tag3]    │  ← tags here
└─────────────────────────┘
```

#### Actual Layout (with compact-datetime enabled)
```
┌─────────────────────────────────────────────────────────────────┐
│ Note Title/Content      [Tag1][Tag2][Tag3][Tag4][Tag5][Tag6]... │
└─────────────────────────────────────────────────────────────────┘
```

#### Root Cause
The compact-datetime CSS rule used an over-broad selector:
```css
.blinko-compact-datetime .card-masonry-grid [class*="flex"][class*="col"]
```
In the Blinko application (Tailwind CSS), the tags container uses a class like `flex flex-col`. The `[class*="flex"][class*="col"]` substring match targeted it, applying:
```css
flex-direction: row !important;   /* overrides column → tags go horizontal */
flex-wrap: nowrap !important;     /* prevents wrapping → tags overflow right */
```

**Cross-reference:** `RESEARCH_FINDINGS.md §6`

#### Resolution
Removed the `.card-masonry-grid [class*="flex"][class*="col"]` selector entirely. Replaced with narrowly-scoped selectors targeting only date/time metadata rows by matching class substrings `meta`, `header`, `time`, `date`, `footer`, and `timestamp`.

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/assets/styles/Blinko-UIUX.css`

---

---

### [ISSUE-005] MutationObserver fires excessively, triggering browser extension feedback loop

| Field | Value |
|-------|-------|
| **ID** | ISSUE-005 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `uiuxService.ts` → `applySingleTap()` |
| **Reported by** | Console log analysis (session 2026-03-25) |
| **Reported date** | 2026-03-25 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | All (visible in browser DevTools console) |

#### Description
The `MutationObserver` attached in `applySingleTap()` observed `document.body` with `{ childList: true, subtree: true }` and called `markAndListen()` on every DOM mutation. Because `markAndListen()` itself writes `data-single-tap` attributes to DOM nodes, it triggered the observer again, creating a feedback loop. Browser extension autofill overlays (Bitwarden, 1Password) caught this cascade and logged errors from `__bootstrap-autofill-overlay.js`, polluting the DevTools console with a deep React call stack trace.

#### Reproduction Steps
1. Install a password manager extension (Bitwarden / 1Password)
2. Enable "Single-Tap to Open Notes"
3. Open DevTools Console
4. Navigate to the Blinko notes list
5. **Expected:** Console is clean
6. **Actual:** `__bootstrap-autofill-overlay.js` errors appear, with a deep React call stack

#### Root Cause
No debounce on the MutationObserver callback. Each `data-single-tap` attribute write triggered a new mutation which re-fired the callback.

#### Resolution
Replaced `new MutationObserver(markAndListen)` with a manual debounce timer pattern (150ms delay). The cleanup function now also clears any pending debounce timer on disable. No external debounce utility needed — approach is self-contained inside `applySingleTap()`.

**Fix committed:** session 2026-03-25, branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/services/uiuxService.ts`

---

### [ISSUE-006] Blinko note editor does not close when tapping outside it

| Field | Value |
|-------|-------|
| **ID** | ISSUE-006 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `uiuxService.ts` → new `applyTapOutsideClose()` |
| **Reported by** | User request (session 2026-03-25) |
| **Reported date** | 2026-03-25 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | Android, Web, Windows |

#### Description
The Blinko note editor (dialog with toolbar, audio, X button at top-right) does not close when the user taps/clicks outside the editor area. The Blinko Article note type already provides this behavior. Users expect parity.

#### Reproduction Steps
1. Open any Blinko note (not article type)
2. Click/tap anywhere on the backdrop outside the editor
3. **Expected:** Editor closes
4. **Actual:** Nothing happens; editor remains open

#### Resolution
Implemented `applyTapOutsideClose()` in `UIUXService`. Uses a capture-phase `mousedown` listener on `document`. When a mousedown event lands outside the detected editor container (`[class*="editor-container"]` etc.), the close button is clicked or an Escape keydown is dispatched. Feature is opt-in via the new `tapOutsideClosesNote` setting (default: `false`).

**Files changed:** `src/services/uiuxService.ts`, `src/types.ts`, `src/setting.tsx`

---

### [ISSUE-007] Vertical spacing not user-adjustable; excess padding on mobile

| Field | Value |
|-------|-------|
| **ID** | ISSUE-007 |
| **Status** | Verified |
| **Severity** | Low |
| **Component** | `uiuxService.ts`, `Blinko-UIUX.css`, `types.ts` |
| **Reported by** | User request (session 2026-03-25) |
| **Reported date** | 2026-03-25 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | Android (mobile), Web |

#### Description
The note list and page-level containers have fixed top/bottom padding/margin with no user-adjustable option, reducing usable screen real estate — especially noticeable on small mobile displays.

#### Resolution
Added `reduceVerticalSpacing: boolean` and `noteListPadding: number` (0–20px, default 12) to `UIUXSettings`. When enabled, body class `blinko-reduce-vspacing` is toggled and CSS custom property `--blinko-v-padding` drives CSS section 14 in `Blinko-UIUX.css`. A slider control is exposed in the Layout sub-tab.

**Files changed:** `src/types.ts`, `src/services/uiuxService.ts`, `src/assets/styles/Blinko-UIUX.css`, `src/setting.tsx`

---

### [ISSUE-008] AI 401 errors show no actionable guidance to the user

| Field | Value |
|-------|-------|
| **ID** | ISSUE-008 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `uiuxService.ts` → new `applyAIErrorInterceptor()` |
| **Reported by** | Console log + user report (session 2026-03-25) |
| **Reported date** | 2026-03-25 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | All |

#### Description
Blinko's AI features (Auto-Tag, Rerun AI Processing) fail with `401 Unauthorized` when the AI provider API key is not configured in Blinko Settings → AI. The built-in error toast is generic ("Auto-tag failed: tRPC ai.autoTag failed: 401") and gives users no guidance on how to resolve the issue.

#### Root Cause
The 401 is a server-side authentication failure on Blinko's tRPC AI endpoints — not a plugin bug. The plugin cannot fix the auth issue directly but can intercept the response and show a more helpful message.

#### Resolution
Implemented `applyAIErrorInterceptor()` which wraps `window.fetch`. When a 401 is returned from a URL matching `ai.autoTag`, `ai.writing`, or `/trpc/ai`, an additional guidance toast is shown after a 0ms timeout (so Blinko's own handler runs first). The response is returned completely untouched. Feature is opt-in via `interceptAIErrors` (default: `true`). `destroy()` restores the original `window.fetch`.

**Files changed:** `src/types.ts`, `src/services/uiuxService.ts`, `src/setting.tsx`

---

*Document version: 1.1 — Added ISSUE-005 through ISSUE-008 (session 2026-03-25)*
*Template version: 1.0*
