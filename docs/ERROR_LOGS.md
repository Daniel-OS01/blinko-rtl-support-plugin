# Error Log & Bug Tracker

**Repository:** `Daniel-OS01/blinko-rtl-support-plugin`
**Format:** append-only — never delete resolved entries; update status in-place.

---

## Schema

```
### [BUG-NNN] <Short Title>
- **Reported:** YYYY-MM-DD
- **Reporter:** <user / system / audit>
- **Severity:** Critical | High | Medium | Low
- **Status:** Open | In Progress | Fixed | Closed | Won't Fix
- **Fixed in:** <commit SHA or N/A>
- **Affects:** <feature / setting name>
```

---

## Open / In-Progress

*(none as of 2026-03-24 — all known bugs resolved in this sprint)*

---

## Resolved

---

### [BUG-001] Android hardware back button does not close open notes
- **Reported:** 2026-03-24
- **Reporter:** QA Audit (Android device)
- **Severity:** High
- **Status:** Fixed
- **Fixed in:** `feature/ai-context-menu-ux-audit-fork-analysis` — `applyBackButton()` rewrite
- **Affects:** UI/UX → Navigation → "Back Button Closes Note"

**Reproduction Steps:**
1. Enable Settings → UI/UX → Navigation → "Back Button Closes Note"
2. Open any note (tap a card to expand it into a modal / detail view)
3. Press the Android hardware back button or swipe-back gesture
4. **Observed:** note stays open; app either does nothing or navigates away entirely
5. **Expected:** note closes; user stays on the note list

**Root Cause:**
`applyBackButton()` called `e.preventDefault()` on the `popstate` event.
`popstate` is a **non-cancelable** DOM event — `preventDefault()` is silently ignored
by all browsers (per the HTML spec). The back navigation proceeded as if no handler
existed, with the extra `history.pushState` entry causing erratic navigation jumps.

**Fix Applied:**
- Removed the `e.preventDefault()` call
- Rewrote the guard: only `history.pushState` to re-absorb a back press when an overlay
  was actually found and closed; otherwise let the navigation proceed normally
- Upgraded overlay detection to use semantic ARIA attributes
  (`[role="dialog"][aria-modal="true"]`) which are stable across HeroUI/React upgrades
- Added HeroUI `[data-slot="close-button"]` and `backdrop` click as primary close paths
  before falling back to Escape keypress

---

### [BUG-002] Android hardware back button blocks logout navigation
- **Reported:** 2026-03-24
- **Reporter:** QA Audit (Android device)
- **Severity:** High
- **Status:** Fixed
- **Fixed in:** `feature/ai-context-menu-ux-audit-fork-analysis` — `applyBackButton()` rewrite
- **Affects:** UI/UX → Navigation → "Back Button Closes Note"

**Reproduction Steps:**
1. Enable "Back Button Closes Note"
2. Log out of Blinko (navigate to `/login`)
3. Press the hardware back button
4. **Observed:** back button is absorbed; user cannot navigate away from the login page
5. **Expected:** back button works normally on the login page

**Root Cause:**
`applyBackButton()` unconditionally called `history.pushState(null, '', location.href)`
on every entry into the function, even when the current page is `/login`. This inserted
an extra sentinel history entry. On the login page the handler fires on `popstate`,
finds no overlay, does nothing — but the sentinel entry has already been consumed.
The next back press finds the *real* previous entry but by then the user has pressed
back twice and may have left the page or repeated the issue.

**Fix Applied:**
- Added an `isAuthPage` guard: the initial sentinel `pushState` is skipped when the
  current pathname matches `/(login|auth|signin|signup|register)/`
- The handler only re-inserts a sentinel when an overlay was actually closed, never
  in the "no overlay found" branch

---

### [BUG-003] Single-tap on note text content does not open the note
- **Reported:** 2026-03-24
- **Reporter:** QA Audit (Android device)
- **Severity:** High
- **Status:** Fixed
- **Fixed in:** `feature/ai-context-menu-ux-audit-fork-analysis` — `applySingleTap()` rewrite
- **Affects:** UI/UX → Navigation → "Single-Tap Open Note"

**Reproduction Steps:**
1. Enable Settings → UI/UX → Navigation → "Single-Tap Open Note"
2. Tap directly on the text body of a note card (i.e., on the `<p>` element)
3. **Observed:** nothing happens
4. **Expected:** note opens (same as double-tap)

**Root Cause:**
The handler contained:
```ts
const openBtn = card.querySelector('h1, h2, h3, p');
if (openBtn && openBtn !== target) { openBtn.click(); }
```
When the user taps on note text, `e.target` IS a `<p>` element.
`querySelector('h1,h2,h3,p')` returns that **same** `<p>` as `openBtn`.
Therefore `openBtn !== target` evaluates to `false` → `openBtn.click()` is never called.

Additionally, even if the guard were removed, clicking a `<p>` inside a note card does
not open the note — `<p>` elements have no Blinko click handler.

**Fix Applied:**
1. Removed the incorrect `openBtn !== target` equality guard
2. Replaced the broad `h1, h2, h3, p` selector with a targeted search for Blinko's
   actual "open/detail" anchor or button (`a[href*="/detail"]`, `[class*="detail-btn"]`, etc.)
3. If no explicit open target is found, a `dblclick` event is dispatched on the card
   content area — this activates Blinko's native double-tap-to-open handler
4. Extended the "skip" guard to also ignore clicks on tag pills and action/menu areas

---

### [BUG-004] Tapping a note card opens both the note detail AND the context menu
- **Reported:** 2026-03-24
- **Reporter:** QA Audit (Android device)
- **Severity:** High
- **Status:** Fixed
- **Fixed in:** `feature/ai-context-menu-ux-audit-fork-analysis` — `applySingleTap()` rewrite
- **Affects:** UI/UX → Navigation → "Single-Tap Open Note"

**Reproduction Steps:**
1. Enable "Single-Tap Open Note"
2. Tap anywhere on a note card that is not a button or link
3. **Observed:** note detail view opens AND the three-dot context menu also opens simultaneously
4. **Expected:** only the note detail view opens

**Root Cause:**
The plugin's `click` handler was added via `addEventListener('click', handler)`.
No call to `e.stopImmediatePropagation()` was made. Blinko's own `click` handler
(registered on the same card element or a parent) also fires:
- The plugin fires → calls `openBtn.click()` → note open
- Blinko's handler also fires → opens the context menu (or does a different action)
Both run for every tap because the event was never stopped.

**Fix Applied:**
Added `e.stopImmediatePropagation()` at the start of the tap-handling branch.
This prevents all subsequent `click` listeners on the same DOM path from firing
once the plugin has decided to handle the tap.

---

### [BUG-005] Note tags are displayed on the right side of the card instead of below the note text
- **Reported:** 2026-03-24
- **Reporter:** QA Audit (Android device)
- **Severity:** Medium
- **Status:** Fixed
- **Fixed in:** `feature/ai-context-menu-ux-audit-fork-analysis` — `Blinko-UIUX.css` section 13
- **Affects:** UI/UX → Layout (visual regression; no setting required)

**Reproduction Steps:**
1. Create any note with one or more `#tags`
2. View the note list (masonry grid)
3. **Observed:** tags appear to the right of the note text, inside a horizontal row,
   rather than below the note text as a separate row
4. **Expected:** tags appear in a left-aligned wrapping row below the note body text

**Root Cause:**
Blinko's default card layout uses a horizontal flex row for the card body. The tag
container has `margin-left: auto` (or is in a right-column flex slot), which pushes
it to the far right of the card's horizontal layout. No plugin CSS rule existed to
correct this.

**Fix Applied:**
Added CSS section 13 to `Blinko-UIUX.css` (always active under `blinko-custom-cards`
body class, which is unconditionally applied):
- Card body containers forced to `flex-direction: column`
- Tag containers forced to `order: 99` (sinks to bottom of flex column), full `width: 100%`,
  `margin-left: 0`, `float: none`, `justify-content: flex-start`, `flex-wrap: wrap`

---

### [BUG-006] Workflow `readme_update.yml` crashes on every PR with TypeError
- **Reported:** 2026-03-24
- **Reporter:** GitHub Actions (automated)
- **Severity:** Medium
- **Status:** Fixed
- **Fixed in:** commit `14127e9e` on `main`
- **Affects:** CI/CD → README Auto-Update workflow

**Reproduction Steps:**
1. Open any pull request targeting `main`
2. The `update-readme` job runs automatically
3. **Observed:** `TypeError: Cannot read properties of undefined (reading 'tag_name')`
4. **Expected:** workflow is skipped or runs only on published releases

**Root Cause:**
`readme_update.yml` listed `pull_request: branches: [main]` as a trigger.
The script inside unconditionally reads `context.payload.release.tag_name`.
On a `pull_request` event `context.payload.release` is `undefined`.

**Fix Applied:**
- Replaced `pull_request: branches: [main]` trigger with `release: types: [published]`
- Added an early-return guard `if (!release) return;` to protect `workflow_dispatch` runs

---

## Tracking Template

Copy and fill out for new reports:

```markdown
### [BUG-NNN] <Short descriptive title>
- **Reported:** YYYY-MM-DD
- **Reporter:** <who reported it>
- **Severity:** Critical | High | Medium | Low
- **Status:** Open
- **Fixed in:** N/A
- **Affects:** <plugin feature / setting / workflow>

**Reproduction Steps:**
1. Step one
2. Step two
3. **Observed:** what actually happens
4. **Expected:** what should happen

**Root Cause:**
*(Fill in after investigation)*

**Fix Applied:**
*(Fill in after fix)*
```
