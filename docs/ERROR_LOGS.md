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

### [ISSUE-005] MutationObserver excessive firing / extension feedback loop

| Field | Value |
|-------|-------|
| **ID** | ISSUE-005 |
| **Status** | Verified |
| **Severity** | High |
| **Component** | `src/services/uiuxService.ts` (`applySingleTap` observer lifecycle) |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 3.0.0 |
| **Affected platforms** | Android, Web |

#### Description
`MutationObserver` callbacks for card-list updates were firing excessively during rapid UI changes, creating a plugin-to-DOM feedback loop that repeatedly re-scanned cards and re-bound listener candidates. This caused avoidable CPU churn and intermittent interaction jitter.

#### Root Cause
The observer callback pattern was too broad for high-frequency subtree changes and did not sufficiently gate repeated processing work in dynamic list states. In practice, layout churn could repeatedly invoke the same attach path faster than user-driven interactions.

#### Resolution Notes
- Enforced marker-based idempotency (`[data-single-tap]`) so already-initialized cards are skipped.
- Kept listener attach logic constrained to unmarked cards only.
- Confirmed observer cleanup (`disconnect`) is executed on feature disable / service teardown to prevent lingering callback loops.
- Verified no repeated re-binding occurs for stable card nodes after initialization.

---

### [ISSUE-006] Tap outside note editor does not close

| Field | Value |
|-------|-------|
| **ID** | ISSUE-006 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `src/services/uiuxService.ts` (`applyBackButton` overlay close fallback) |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 3.0.0 |
| **Affected platforms** | Android, Web |

#### Description
In overlay editor mode, tapping outside the note surface did not consistently dismiss the open editor. Users were forced to locate and activate a specific close affordance, reducing mobile usability.

#### Root Cause
Dismiss behavior relied on narrow close-button detection paths and did not always include a robust fallback when the outside-tap path did not bubble into a recognized close target.

#### Resolution Notes
- Strengthened overlay dismissal logic to prioritize explicit close control detection.
- Added resilient fallback dismissal behavior (Escape-key dispatch path) when a direct close button is not discoverable.
- Verified users can exit editor overlays without being trapped in modal state.

---

### [ISSUE-007] Vertical spacing not user-adjustable

| Field | Value |
|-------|-------|
| **ID** | ISSUE-007 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `src/setting.tsx`, `src/services/uiuxService.ts` (typography density controls) |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 3.0.0 |
| **Affected platforms** | All |

#### Description
Users could not tune vertical rhythm (line height / paragraph density) to match reading preferences across device sizes. Dense screens felt cramped while large displays felt overly loose.

#### Root Cause
Spacing values were effectively fixed at style defaults, with no surfaced control path for user-defined vertical density adjustments in plugin settings.

#### Resolution Notes
- Added user-facing typography density control for vertical spacing.
- Wired the control to runtime CSS custom properties so changes apply immediately without reload.
- Verified persisted settings restore expected spacing across sessions and platforms.

---

### [ISSUE-008] AI 401 errors lack actionable guidance

| Field | Value |
|-------|-------|
| **ID** | ISSUE-008 |
| **Status** | Verified |
| **Severity** | Medium |
| **Component** | `src/services/aiPostService.ts`, `src/index.tsx` (AI error handling/toasts) |
| **Reported by** | Initial audit |
| **Reported date** | 2026-03-24 |
| **Plugin version** | 3.0.0 |
| **Affected platforms** | All (AI features) |

#### Description
When AI endpoints returned `401 Unauthorized`, users received technical failure text without clear next steps, leading to confusion about whether the issue was credentials, login state, or provider configuration.

#### Root Cause
Error surfacing passed through generic API exception messaging and lacked status-specific remediation hints for authentication failures.

#### Resolution Notes
- Added explicit handling for authentication-related AI failures.
- Updated user-visible guidance to explain likely session/auth cause and recovery action (re-authenticate/check active login context).
- Verified failed AI calls now present actionable, user-oriented remediation instead of opaque errors.

---

*Document version: 1.1 — Historical archive expanded to ISSUE-008 (verified entries)*
*Template version: 1.0*
