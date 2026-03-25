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

### [ISSUE-005] MutationObserver feedback loop causes repeated re-application

| Field | Value |
|-------|-------|
| **ID** | ISSUE-005 |
| **Status** | Verified |
| **Severity** | High |
| **Component** | `uiuxService.ts` (DOM observers) |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | All |

#### Description
A MutationObserver feedback loop was detected in the UI/UX patching flow. Plugin-driven DOM updates retriggered observers, which repeatedly re-ran patch logic. This caused redundant processing, unnecessary CPU activity, and intermittent UI jitter.

#### Reproduction Steps
1. Enable UI/UX features that rely on DOM observation and dynamic patching
2. Navigate between notes and trigger multiple UI updates in quick succession
3. Observe repeated observer callbacks and recurring patch passes
4. **Expected:** One stable patch pass per meaningful DOM change
5. **Actual:** Cascading re-entry where plugin changes trigger additional observer cycles

#### Root Cause
Observer callbacks processed plugin-originated mutations without an idempotent guard/debounce boundary, allowing self-triggered mutation chains.

#### Resolution
Added guard logic so observer callbacks ignore or coalesce plugin-originated/duplicate mutations. Patch application now executes as a bounded, idempotent pass.

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/services/uiuxService.ts`

---

### [ISSUE-006] Tapping outside note editor does not close expanded editor view

| Field | Value |
|-------|-------|
| **ID** | ISSUE-006 |
| **Status** | Verified |
| **Severity** | High |
| **Component** | `uiuxService.ts` (outside-click handling) |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | Android, Web |

#### Description
When a note editor is expanded, tapping/clicking outside the editor surface does not dismiss or close the editor. Users remain trapped in edit context unless they use alternative controls.

#### Reproduction Steps
1. Open a note in expanded editor mode
2. Tap/click in non-editor background area
3. **Expected:** Editor closes (or exits expanded mode)
4. **Actual:** No dismissal action occurs

#### Root Cause
Outside-click detection did not consistently evaluate editor container boundaries and therefore missed valid background interactions.

#### Resolution
Updated outside-click handling to detect interactions outside the active editor container and invoke the correct close/dismiss action.

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/services/uiuxService.ts`

---

### [ISSUE-007] Vertical spacing setting not adjustable in note layout

| Field | Value |
|-------|-------|
| **ID** | ISSUE-007 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `setting.tsx`, `Blinko-UIUX.css` |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | All |

#### Description
The vertical spacing control was present but ineffective: changing its value produced no visible layout difference in note cards.

#### Reproduction Steps
1. Open plugin settings
2. Modify vertical spacing to minimum and maximum values
3. Return to note list
4. **Expected:** Noticeable change in inter-element/card vertical spacing
5. **Actual:** Spacing appears unchanged

#### Root Cause
Configured spacing value was not reliably propagated to the CSS variable/rule path used by rendered note layout.

#### Resolution
Wired vertical spacing setting updates to the correct style variable and selector path so runtime changes apply immediately and persist correctly.

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** `src/settings/setting.tsx`, `src/assets/styles/Blinko-UIUX.css`

---

### [ISSUE-008] AI 401 error messaging lacks actionable user guidance

| Field | Value |
|-------|-------|
| **ID** | ISSUE-008 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | AI integration UX / error messaging |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 2.2.1 |
| **Affected platforms** | All |

#### Description
When AI requests fail with HTTP 401 (unauthorized), users see a generic error state without clear remediation steps. This increased support friction and delayed self-recovery.

#### Reproduction Steps
1. Configure AI with an invalid/expired credential
2. Trigger any AI-assisted action
3. **Expected:** Error message explains likely cause and next steps
4. **Actual:** Generic 401 failure with no actionable instructions

#### Root Cause
Error handling surfaced status code context but did not map authentication failures to user-facing guidance.

#### Resolution
Enhanced 401 messaging with actionable instructions (e.g., verify API key/token, provider endpoint, and credential scope) and directed users to settings where corrections can be made.

**Fix commit:** See branch `claude/blinko-ui-ux-enhancements-gfN4H`
**Files changed:** AI integration error-handling UI

---

*Document version: 1.1 — Initial archive extended to eight verified issues*
*Template version: 1.0*
