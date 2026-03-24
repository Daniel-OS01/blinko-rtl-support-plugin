# Implementation Plan — Blinko RTL Support Plugin

> **Document type:** Remediation procedures + Aloklok Fork Integration Roadmap
> **Version:** 1.0
> **Branch:** `claude/blinko-ui-ux-enhancements-gfN4H`
> **Last updated:** 2026-03-24

---

## Table of Contents

1. [Part A — Bug Remediation Plan](#part-a--bug-remediation-plan)
   - [Phase 1: Triage & Dependency Sequencing](#phase-1-triage--dependency-sequencing)
   - [Phase 2: Remediation Procedures](#phase-2-remediation-procedures)
   - [Phase 3: Validation Protocol](#phase-3-validation-protocol)
2. [Part B — Aloklok Fork Integration Roadmap](#part-b--aloklok-fork-integration-roadmap)
   - [Strategic Scope](#strategic-scope)
   - [Commit Prioritization & Platform Filtering](#commit-prioritization--platform-filtering)
   - [Phase Gates](#phase-gates)
   - [Risk Assessment](#risk-assessment)
   - [Rollback Procedures](#rollback-procedures)

---

# Part A — Bug Remediation Plan

## Phase 1: Triage & Dependency Sequencing

### Critical Path

```
[Issue 3B CSS fix]  ← independent, zero risk
        ↓
[Issue 1 back button fix]  ← independent, History API only
        ↓
[Issues 2 + 3A combined fix]  ← coupled, single method edit
        ↓
[Documentation artifacts]
        ↓
[Commit + Push]
```

Issues 2 and 3A **must be fixed together** — they share the same `applySingleTap()` method and their root causes are causally connected (see `RESEARCH_FINDINGS.md §7`).

Issue 3B is **purely additive CSS** — no runtime JS risk, can be applied at any point.

Issue 1 touches only the `applyBackButton()` method — fully isolated from Issues 2/3.

---

## Phase 2: Remediation Procedures

### 2.1 Issue 1 — Back Button Fix

**File:** `src/services/uiuxService.ts`
**Change type:** Add class field + conditional guard

**Step 1:** Add `private backButtonInitialized = false;` field to `UIUXService` class.

**Step 2:** In `applyBackButton()`:
- Wrap the `history.pushState` call in `if (!this.backButtonInitialized)` guard
- Set `this.backButtonInitialized = true` after pushing
- Remove `e.preventDefault()` from the popstate handler (non-cancelable event)
- Re-push sentinel state **inside the handler** only when an overlay is found
- Reset `this.backButtonInitialized = false` in the cleanup function

**Acceptance criteria:**
- [ ] Settings changes do not accumulate history entries (verify via `history.length` in DevTools)
- [ ] Back button closes an open note overlay
- [ ] Back button navigates away from the app when no overlay is open
- [ ] Back button during logout flow works correctly

---

### 2.2 Issues 2 + 3A — Single-Tap & Dual Event Fix

**File:** `src/services/uiuxService.ts`
**Change type:** Modify `applySingleTap()` inner handler closure

**Step 1:** Remove `p` from the `querySelector` opener selector:
```typescript
// Before
'[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3, p'
// After
'[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3'
```

**Step 2:** Add re-entry guard before `openBtn.click()`:
```typescript
if (card.dataset.opening) return;
card.dataset.opening = 'true';
openBtn.click();
requestAnimationFrame(() => { delete card.dataset.opening; });
```

**Step 3:** Tighten the opener-found condition to also exclude when target is a descendant of openBtn:
```typescript
if (openBtn && openBtn !== target && !openBtn.contains(target as Node)) {
```

**Acceptance criteria (Issue 2):**
- [ ] Tapping note body text (`<p>`) opens the note
- [ ] Tapping note title opens the note
- [ ] No infinite click loop (verify via console — no stack overflow errors)

**Acceptance criteria (Issue 3A):**
- [ ] Single tap opens note detail only — context menu does NOT appear
- [ ] Context menu still opens correctly via long-press / right-click

---

### 2.3 Issue 3B — Tag Positioning Fix

**File:** `src/assets/styles/Blinko-UIUX.css`
**Change type:** Replace overly-broad CSS selector with scoped alternatives

**Step 1:** Remove selector `.blinko-compact-datetime .card-masonry-grid [class*="flex"][class*="col"]`

**Step 2:** Replace with specific metadata-row selectors:
```css
.blinko-compact-datetime [class*="note-card"] [class*="meta"],
.blinko-compact-datetime [class*="note-card"] [class*="header"],
.blinko-compact-datetime [class*="note-item"] [class*="time"],
.blinko-compact-datetime [class*="note-item"] [class*="date"],
.blinko-compact-datetime [class*="blinko-card"] [class*="footer"],
.blinko-compact-datetime [class*="blinko-card"] [class*="timestamp"]
```

**Acceptance criteria:**
- [ ] Tags appear in vertical flow below note content
- [ ] Tags wrap correctly on narrow screens
- [ ] Compact datetime mode still collapses "2 hours ago" timestamps to single row
- [ ] No regression on non-compact mode

---

## Phase 3: Validation Protocol

### Unit / Integration Tests

| Test ID | Scenario | Expected Result | Priority |
|---------|----------|-----------------|----------|
| T-01 | `applyBackButton()` called 5× via `updateSettings()` | `history.length` increases by exactly 1 | Critical |
| T-02 | Back press with overlay open | Overlay closes; history.length unchanged | Critical |
| T-03 | Back press with no overlay | Navigation proceeds (popstate fires, no re-push) | Critical |
| T-04 | Tap `<p>` text on note card | Note detail view opens | Critical |
| T-05 | Tap note title heading | Note detail view opens, no double-open | High |
| T-06 | Tap note card rapidly ×3 | Single open, no duplicate overlays | High |
| T-07 | Enable compact-datetime; inspect tags container | `flex-direction` is `column`, not `row` | High |
| T-08 | Tags render with wrapping on narrow viewport | Tags wrap to next line normally | Medium |

### Multi-Platform Validation Matrix

| Platform | Browser | Priority | Notes |
|----------|---------|----------|-------|
| Android Chrome | Latest stable | **Critical** | Primary back-button platform |
| Android Firefox | Latest stable | High | Alternative Android browser |
| Windows Chrome | Latest stable | High | Primary desktop platform |
| Windows Firefox | Latest stable | Medium | |
| Windows Edge | Latest stable | Medium | |
| Web (Desktop) | Chrome DevTools mobile emulation | Medium | Fallback testing |

> **iOS/macOS excluded per project constraints** — user confirmed Windows, Android, and Web platforms only.

---

# Part B — Aloklok Fork Integration Roadmap

## Strategic Scope

**Target:** Selectively backport high-value changes from `Aloklok/blinko` (+162 commits ahead) into the `Daniel-OS01/blinko-rtl-support-plugin` plugin's CSS/JS layer.

**Key constraint:** This plugin operates as a CSS/JS injection layer on top of the Blinko web app — it does not own the Blinko app source. Aloklok fork changes that target Blinko's core source files (React components, API routes, database models) **cannot be directly backported** and must instead be implemented as CSS overrides or DOM patches within the plugin.

**Platform constraint:** iOS and macOS-specific fixes are **explicitly excluded** (user confirmed Web + Android + Windows only).

---

## Commit Prioritization & Platform Filtering

### Tier 1 — Include (Web + Android + Windows relevant)

| SHA | Description | Integration approach |
|-----|-------------|---------------------|
| `f7026780` | DeepSeek R1 thinking mode configuration | Extract config pattern; apply as plugin setting or CSS variable if UI-driven |
| `f4bd0428` | ARIA accessibility labels + requestAnimationFrame optimization | ARIA additions via DOM patch in `uiuxService.ts`; rAF optimization is already used in our re-entry guard |
| `a0869b04` | Mobile delete icon visibility enhancement | CSS override in `Blinko-UIUX.css` targeting delete/trash icon visibility on mobile |
| `3900a159` | AI tagging UX: immediate feedback + stability | CSS/JS patch for optimistic UI state during AI tagging |
| `bbaf5bf7` | Vite vendor chunking + async icon loading | `vite.config.ts` optimization — directly applicable to plugin build |
| `be4fd14e` | @dnd-kit library migration | `package.json` dependency update if plugin uses drag-and-drop |

### Tier 2 — Exclude (iOS/Safari-specific)

| SHA | Description | Exclusion reason |
|-----|-------------|-----------------|
| `84db3ebd` | iOS MediaRecorder timeslice remediation | iOS-only; irrelevant to Android/Windows/Web |
| `75cfe7ba` | iOS Safari blob URL resolution | Safari/iOS-only; irrelevant to target platforms |

---

## Phase Gates

### Phase 0 — Pre-Integration Baseline (prerequisite)

**Inputs:** Clean feature branch with all bug fixes from Part A committed
**Steps:**
1. Ensure TypeScript compilation succeeds: `bun run build`
2. Run existing test suite: confirm all tests pass
3. Tag the pre-integration state: `git tag pre-aloklok-integration`

**Gate criteria:** All Part A fixes validated, build green, tests passing.

---

### Phase 1 — Build Infrastructure (low-risk)

**Commit:** `bbaf5bf7` — Vite vendor chunking + async icon loading
**Commit:** `be4fd14e` — @dnd-kit library migration

**Steps:**
1. Inspect `vite.config.ts` diff from Aloklok commit `bbaf5bf7`
2. Extract chunking configuration applicable to this plugin's build
3. Apply changes to `/vite.config.ts`
4. Run `bun run build:prod` — verify bundle size reduces or stays same
5. If `be4fd14e` introduces `@dnd-kit`, assess whether plugin currently uses any DnD (currently does not appear to) — **skip if not applicable**

**Rollback trigger:** Build failure or bundle size regression >10%

---

### Phase 2 — AI Features (medium complexity)

**Commit:** `f7026780` — DeepSeek R1 thinking mode configuration

**Steps:**
1. Fetch commit diff from Aloklok repository
2. Identify whether change is in Blinko app source or plugin-layer config
3. If app-source: create a `UIUXSettings` field `deepseekThinkingMode: boolean` and inject appropriate API request headers/body via DOM interception
4. If plugin-config: add field to `types.ts`, expose in `setting.tsx` UI, pass through `uiuxService`
5. Add to `DEFAULT_UIUX_SETTINGS` with `false` default (opt-in)

**Commit:** `3900a159` — AI tagging UX: immediate feedback + stability

**Steps:**
1. Inspect diff to understand whether this is a CSS or JS change
2. If CSS: add targeted rule to `Blinko-UIUX.css` under a new section `14. AI TAGGING UX`
3. If JS: create a new method in `UIUXService` (`applyAITaggingUX()`) following existing pattern

**Gate criteria:** AI features do not break existing RTL functionality; no console errors.

---

### Phase 3 — Accessibility & Mobile UX (high value)

**Commit:** `f4bd0428` — ARIA accessibility labels + requestAnimationFrame optimization

**Steps:**
1. Extract ARIA attribute additions from commit diff
2. Implement as a `applyARIAEnhancements()` method in `UIUXService`:
   ```typescript
   private applyARIAEnhancements(): void {
     // Add role/aria-label to unmarked interactive elements
     document.querySelectorAll('[class*="note-card"]:not([role])').forEach(el => {
       el.setAttribute('role', 'article');
     });
     // ... additional ARIA patches
   }
   ```
3. Wire into `apply()` method
4. Validate with browser accessibility inspector (Chrome DevTools → Accessibility panel)

**Commit:** `a0869b04` — Mobile delete icon visibility

**Steps:**
1. Identify CSS selector for delete/trash icon in note attachment list
2. Add targeted CSS rule in `Blinko-UIUX.css` under a new section `14. MOBILE ATTACHMENT ICONS`:
   ```css
   /* Mobile: always show delete icon on attachments (not hover-only) */
   @media (max-width: 768px) {
     [class*="attachment"] [class*="delete"],
     [class*="attachment"] [class*="remove"],
     [class*="attachment"] [class*="trash"] {
       opacity: 1 !important;
       visibility: visible !important;
     }
   }
   ```

**Gate criteria:** ARIA labels visible in accessibility tree; delete icons visible on Android Chrome without hover.

---

## Risk Assessment

### Merge Conflict Vectors

The 18-commit upstream lag between `Daniel-OS01/blinko` and `blinko-space/blinko` creates potential conflicts in:

| Area | Conflict risk | Mitigation |
|------|---------------|------------|
| `vite.config.ts` | Medium — Aloklok modified build config | Manual merge; prefer Aloklok's chunking config |
| `package.json` dependencies | Low-Medium — both forks may have updated deps | Audit version ranges; prefer higher patch versions |
| CSS variables / class names | Low — Blinko upstream rarely renames CSS classes | Monitor Blinko release notes |
| Plugin API (`window.Blinko`) | Low — stable plugin API | Check `minAppVersion` in `plugin.json` |

### Interdependency Ordering

```
Phase 1 (build infra) must precede Phase 2/3
    — vendor chunking ensures the larger Phase 2 code doesn't bloat the bundle

Phase 2 AI features are independent of Phase 3 accessibility
    — can be executed in parallel by separate contributors

All phases depend on Part A bug fixes being merged first
    — avoids layering new features on top of known defects
```

### Breaking Change Catalog

| Change | Risk | Mitigation |
|--------|------|------------|
| `@dnd-kit` migration (`be4fd14e`) | Medium — if plugin adds DnD, API surface changes | Pin version; add integration test |
| ARIA attribute injection | Low — additive only | Verify no `aria-*` conflicts with Blinko's own attributes |
| `history.pushState` behavior | Low — already fixed in Part A | Back button changes isolated to `applyBackButton()` |

---

## Rollback Procedures

### Per-Phase Rollback

Each phase should be committed as a discrete git commit. To roll back:
```bash
# Roll back a single phase
git revert <phase-commit-sha> --no-edit

# Roll back to pre-integration baseline
git reset --hard pre-aloklok-integration
git push --force-with-lease origin claude/blinko-ui-ux-enhancements-gfN4H
```

### Rollback Triggers

| Trigger | Action |
|---------|--------|
| TypeScript build fails | Immediate rollback to last green commit |
| Test suite regression >2 failures | Investigate; rollback if root cause is integration commit |
| Console errors in production | Rollback the phase introducing the errors |
| Bundle size increases >20% | Review chunking config; rollback Phase 1 if unresolved |
| Accessibility audit score drops | Rollback Phase 3 |

### Communication Protocol

1. Create a GitHub Issue tagged `regression` with the failing phase SHA
2. Reference the `ERROR_LOGS.md` entry for the failure
3. Assign `daniel-os01` as reviewer before any forced rollback

---

## Cross-Reference Index

| This section | References |
|-------------|-----------|
| Part A Phase 2 (back button) | `RESEARCH_FINDINGS.md §3` |
| Part A Phase 2 (single-tap) | `RESEARCH_FINDINGS.md §4` |
| Part A Phase 2 (dual event) | `RESEARCH_FINDINGS.md §5` |
| Part A Phase 2 (tag CSS) | `RESEARCH_FINDINGS.md §6` |
| Part B Phase 3 ARIA | `RESEARCH_FINDINGS.md §8` (rAF already used in re-entry fix) |
| All resolved issues | `ERROR_LOGS.md §Historical Archive` |

---

*Document version: 1.0 — Initial remediation + integration roadmap*
