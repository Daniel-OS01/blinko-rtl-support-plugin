# Implementation Plan — Blinko RTL Support Plugin

> **Document type:** Remediation procedures + Aloklok Fork Integration Roadmap
> **Version:** 1.0
> **Branch:** `claude/blinko-ui-ux-enhancements-gfN4H`
> **Last updated:** 2026-03-24
# Implementation Plan: AI Context Menu + UX Audit + Fork Analysis

**Branch:** `feature/ai-context-menu-ux-audit-fork-analysis`
**Date:** 2026-03-24
**Scope:** Three integrated workstreams delivered in a single branch

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
1. [Part 1 — Aloklok Fork Analysis](#part-1--aloklok-fork-analysis)
2. [Part 2 — Extended UX/UI Audit (20 new items)](#part-2--extended-uxui-audit-20-new-items)
3. [Part 3 — AI Post Processing Context Menu](#part-3--ai-post-processing-context-menu)
4. [File Change Manifest](#file-change-manifest)
5. [Verification Steps](#verification-steps)

---

## Part 1 — Aloklok Fork Analysis

### Fork Status (as of 2026-03-05)
- **162 commits AHEAD** of upstream `blinko-space/blinko`
- **18 commits BEHIND** upstream
- Fork owner: Aloklok (郑嘉乐, GitHub ID 13984522)
- Active dependabot branches present

### Curated Commit Inventory (Top 20 of 162)

#### Features (+)
| SHA | Date | Title |
|---|---|---|
| `f7026780` | 2026-03-05 | Add thinking mode config for DeepSeek R1 / reasoning models |
| `c34547b1` | 2026-02-14 | Smart AI tag polling with safety guards |
| `1eaed8c3` | 2026-02-09 | Resource manager overhaul + auth cache optimization |
| `9d9ced3e` | 2026-02-09 | Unified PC recording button + AI tag account isolation |
| `7e5a2acb` | 2026-02-15 | AI polling with tag/content change detection |

#### Performance (⚡)
| SHA | Date | Title |
|---|---|---|
| `bbaf5bf7` | 2026-02-09 | JS vendor split, dynamic icons, CSS trimming, DB indexing |
| `71897dce` | 2026-02-10 | Vite chunking + async icon loading |
| `e29dfc24` | 2026-02-10 | Dual URL strategy, pg-boss connection timeout fix |
| `fa29c0b6` | 2026-02-09 | Switch font CDN to loli.net for performance |
| `f47932a3` | 2026-02-08 | Native fetch/lodash + lazy loading for heavy libs |

#### UI/UX Bug Fixes (🐛)
| SHA | Date | Title |
|---|---|---|
| `82c31233` | 2026-03-05 | Fix duplicate/premature AI tag polling notifications |
| `a0869b04` | 2026-02-20 | Mobile: voice/attachment delete icon visibility |
| `75cfe7ba` | 2026-02-20 | iOS Safari: prevent blob URL query param append |
| `8da45370` | 2026-02-08 | Tag text/bg color collision via --primary-rgb fallback |
| `cb12c096` | 2026-02-08 | Card image visibility + redundant loading states |
| `84db3ebd` | 2026-02-14 | iOS: remove MediaRecorder timeslice → fix audio truncation |
| `972c4562` | 2026-02-15 | AI settings switch visibility + select layout issues |

#### Refactoring (♻️)
| SHA | Date | Title |
|---|---|---|
| `be4fd14e` | 2026-02-08 | Migrate DnD: @hello-pangea/dnd → @dnd-kit (build fix) |
| `314332c2` | 2026-02-09 | Decouple auth from seed script + optimize startup |

#### Accessibility (♿)
| SHA | Date | Title |
|---|---|---|
| `f4bd0428` | 2026-02-10 | ARIA labels + form compliance + rAF interaction performance |

> **Infrastructure / Docker (~50 commits, Feb 12–14):** Prisma 7 upgrade, Node 22 base image, Zeabur deployment, npm legacy-peer-deps. Not user-facing.

### Compatibility Assessment

| Category | Plugin-addressable? | Action |
|---|---|---|
| CSS-based UI fixes (icon visibility, color collision, card states) | ✅ Yes | Add CSS rules to `Blinko-UIUX.css` |
| ARIA label injection | ✅ Partial | JS attribute injection in `UIUXService` |
| DnD library migration (`@dnd-kit`) | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| iOS audio/image fixes | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| AI features (thinking mode, polling) | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| Performance (Vite chunking, DB indexing) | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| Docker/Prisma infrastructure | ❌ Core only | Low priority; wait for upstream Prisma 7 |

### Merge Risk

| Risk Level | Commits | Reason |
|---|---|---|
| 🟢 Low | CSS/style commits | No conflicts expected |
| 🟡 Medium | Store/component refactors | Need rebase against current main |
| 🔴 High | Prisma 7 + Docker chain (~50) | Wait for upstream to adopt Prisma 7 first |

---

## Part 2 — Extended UX/UI Audit (20 new items)

These items are added to the plugin's existing UX Audit sub-tab, expanding from 15 to 35 documented issues. Each entry follows the format:

> **Current state** → Proposed enhancement → Expected benefit → Complexity

### From Aloklok Fork (CSS-injectable via plugin)

1. **Mobile delete icons invisible** (`a0869b04`)
   Voice/attachment delete icons have near-zero opacity on mobile → CSS `opacity` + `min-width` fix → prevents accidental retained attachments → **Low**

2. **Custom icon input label overlap** (`cd9419b7`)
   Settings icon label overlaps the text input field → CSS `z-index`/`position` fix → cleaner settings form → **Low**

3. **Tag text clashes with background on custom themes** (`8da45370`)
   Custom primary colors cause tag text to disappear → CSS `--primary-rgb` fallback + contrast enforcement → consistent tag readability → **Low**

4. **Card images show loading spinner after full load** (`cb12c096`)
   Loaded images continue showing animated spinner → CSS `animation` kill on `[complete]` state → less visual noise → **Low**

5. **Duplicate/premature AI tag alerts** (`82c31233`)
   AI auto-tag fires multiple notifications for the same tagging cycle → JS debounce + timestamp guard in notification handler → less interruption → **Medium (JS)**

### Independent UX Audit

6. **No search-term highlighting in results**
   Matched keywords are not highlighted in result cards → Highlight matched substrings with `<mark>` injection → faster visual scanning → **Medium (JS; ideal: core)**

7. **No multi-select for batch operations**
   Deleting/archiving multiple notes requires repeating the same action → Checkbox overlay + bulk action toolbar → major productivity gain for power users → **High (core)**

8. **No offline / connectivity indicator**
   App silently fails when server is unreachable → `navigator.onLine` listener + CSS status banner → prevents confusion and lost edits → **Low (JS+CSS)**

9. **No estimated reading time on long notes**
   Users cannot gauge note length at a glance → JS word-count badge (200 wpm) injected into card footer → better note triage → **Low (JS)**

10. **No keyboard shortcuts**
    No `Ctrl+N` (new note), `Ctrl+Enter` (submit), `/` (search focus) → JS `keydown` global listener → power-user productivity → **Medium (JS)**

11. **Dark mode is not OLED-black**
    Current dark mode uses `#1a1a2e` instead of `#000000` → CSS custom property override for `--background` and `--card` → battery saving on AMOLED devices → **Low (CSS)**

12. **Quick note templates missing**
    No way to start from a pre-structured template → Template picker in editor footer → faster structured capture → **High (core)**

13. **No file upload progress indicator**
    File attachments appear to hang during upload with no feedback → Progress bar UI during upload → user confidence; prevents duplicate uploads → **Medium (core)**

14. **Empty note list has no onboarding call-to-action**
    First-time users see a blank page → CSS `:empty` + JS content injection with "Create your first note" guidance → reduces new-user abandonment → **Low (JS+CSS)**

15. **Error messages are generic ("Something went wrong")**
    Backend errors are swallowed into a single generic toast → Specific, actionable error messages with recovery links → less user frustration → **Medium (core)**

16. **No undo after accidental note delete**
    Recycling a note is immediate with no undo window → Toast with "Undo" action within 5s → prevents data-loss anxiety → **Medium (core)**

17. **Pinned notes visually identical to unpinned**
    No visual distinction between pinned and normal note cards → CSS pseudo-element pin badge in card corner → at-a-glance identification → **Low (CSS)**

18. **Cross-platform font rendering inconsistency**
    Different OS-default fonts render with different metrics, shifting layout → CSS `font-family: system-ui, -apple-system, ...` normalization → consistent reading experience → **Low (CSS)**

19. **No in-note heading outline / jump-to-section**
    Long article notes have no navigation sidebar or anchor links → JS TOC injection (parse `## headings`, render sticky list) → fast navigation in long notes → **Medium (JS)**

20. **Tag hierarchy (#parent/child) not visually distinct**
    `#Main/Sub/Topic` tags display as flat pills with no nesting cue → CSS indentation + color-step for each slash level → cognitive structure, reduces misreads → **Low (CSS)**

---

## Part 3 — AI Post Processing Context Menu

### User Story

> As a Blinko user who writes notes quickly and then processes them with a structured AI prompt, I want to be able to right-click any existing note and trigger AI post-processing on demand, even when the automatic AI post-processing setting is turned off.

### New Right-Click Menu Items (4 total)

| Menu Item | Label | Icon | Behaviour |
|---|---|---|---|
| `ai-rerun-processing` | 🤖 Rerun AI Processing | `material-symbols:auto-fix` | Runs the full prompt template against the note; shows preview dialog before applying |
| `ai-auto-tag` | 🏷️ AI Auto-Tag | `material-symbols:label` | Calls `ai.autoTag` and toasts the suggested tags |
| `copy-note-content` | 📋 Copy as Markdown | `material-symbols:content-copy` | Copies raw note markdown to the clipboard |
| `export-note-md` | ⬇️ Export as .md | `material-symbols:download` | Downloads the note as a `.md` file |

### Prompt Template

Stored in `localStorage` under key `blinko-ai-post-settings`, field `customPrompt`. Default is the user's structured prompt (see `DEFAULT_AI_POST_PROMPT` in `types.ts`). Variables:

| Variable | Substituted With |
|---|---|
| `{note}` | `note.content` |
| `{tags}` | Comma-joined `note.tags[].name` |

### API Call Chain (Rerun AI Processing)

```
User clicks "🤖 Rerun AI Processing"
  │
  ├── 1. Read note.id, note.content, note.tags from the Note object
  ├── 2. Build prompt string (template substitution)
  ├── 3. POST /api/trpc/ai.writing  { json: { question: prompt, type: "custom" } }
  │       ↳ Response: SSE text/event-stream (tRPC streaming)
  │       ↳ Parse text-delta chunks → accumulate fullText
  ├── 4a. If showPreviewBeforeApply:
  │       ↳ window.Blinko.showDialog() with preview + Apply / Cancel buttons
  │       ↳ On Apply: POST /api/trpc/note.upsert { json: { id, content: fullText } }
  └── 4b. If auto-apply:
          ↳ POST /api/trpc/note.upsert { json: { id, content: fullText } }
```

### Settings Panel (new "🤖 AI Post" top-level tab)

| Setting | Type | Default | Description |
|---|---|---|---|
| Enable "Rerun AI" menu item | Toggle | `true` | Shows/hides the main menu item |
| Enable AI Auto-Tag menu item | Toggle | `true` | Shows/hides the auto-tag shortcut |
| Enable Copy Markdown menu item | Toggle | `true` | Shows/hides the copy action |
| Enable Export .md menu item | Toggle | `true` | Shows/hides the export action |
| Show preview before applying | Toggle | `true` | Preview dialog vs immediate overwrite |
| Custom AI Prompt | Textarea | (user's structured prompt) | Editable with {note}/{tags} variable hints |
| Reset to Default Prompt | Button | — | Restores `DEFAULT_AI_POST_PROMPT` |
| Test on sample text | Button | — | Runs the API with sample content, shows result |

---

## File Change Manifest

### New Files
| File | Purpose |
|---|---|
| `src/services/aiPostService.ts` | AIPostService: prompt building, tRPC calls, note update, export/copy utilities |
| `docs/IMPLEMENTATION_PLAN.md` | This document |
| `docs/RESEARCH_FINDINGS.md` | Blinko app architecture & plugin injection research |

### Modified Files
| File | Changes |
|---|---|
| `src/types.ts` | Add `AIPostSettings`, `DEFAULT_AI_POST_SETTINGS`, `DEFAULT_AI_POST_PROMPT` |
| `src/index.tsx` | Import `AIPostService`; instantiate; register 4 new `addRightClickMenu` entries |
| `src/setting.tsx` | Add `'aipost'` to `activeTab` union; add AI Post tab UI with prompt editor; expand UX Audit tab |

---

## Verification Steps

```bash
# 1. TypeScript — zero errors
npx tsc --noEmit

# 2. Build
bun run build

# 3. Manual smoke test
#    a. Open Blinko, right-click any note
#    b. Verify 4 new menu items appear
#    c. Click "🤖 Rerun AI Processing" → preview dialog appears
#    d. Click Apply → note content updated
#    e. Plugin Settings → "🤖 AI Post" tab → prompt editor present
#    f. Plugin Settings → UI/UX → "📋 UX Audit" → Aloklok section + 20 new items
```

---

---

# Session 3 — Bug Fixes + REST API v1 + Documentation

**Branch:** `claude/review-rtl-plugin-prs-OMCOM`
**Date:** 2026-03-26
**Scope:** Fix single-tap for Blinko quick notes; add REST API v1 note update path; improve AI 401 errors; add API Connection settings UI; create full documentation suite

---

## Problem Statement

After PR #78 was merged, the user reported that features still did not work:

1. **Single tap on Blinko quick notes (NoteType=0) silently does nothing** — quick notes have no heading elements, so the opener selector returns `null` and the handler exits without action
2. **AI 401 errors are opaque** — `AI writing API error: 401` gives no path to resolution
3. **Note updates can fail if tRPC session auth is unavailable** — user needs a REST API v1 Bearer token path
4. **No UI to configure API credentials** — users cannot enter their Blinko instance URL or Bearer token without developer tools

---

## Dependency Map

```
REQ-05 (types.ts fields)
    │
    ├── REQ-03 (aiPostService.ts REST path)  — needs blinkoApiUrl + blinkoApiToken fields
    └── REQ-04 (setting.tsx API Connection)  — needs blinkoApiUrl + blinkoApiToken fields

REQ-01 (uiuxService.ts quick note fix) — fully independent
REQ-02 (aiPostService.ts 401 messages) — fully independent
```

---

## Execution Plan (Completed)

### Step 1 — `src/types.ts` — Add API fields

**Files:** `src/types.ts`
**Change:** Add `blinkoApiUrl: string` and `blinkoApiToken: string` to `AIPostSettings` interface and `DEFAULT_AI_POST_SETTINGS` constant
**Default values:** Empty string `''` — ensures no behavior change for existing installations
**Risk:** None — additive change, backward-compatible

---

### Step 2 — `src/services/uiuxService.ts` — Fix quick note single-tap

**Files:** `src/services/uiuxService.ts`
**Change:** Expand opener selector; add `else if (!openBtn)` fallback branch

**Detailed approach:**

1. Add `a[href]:not([href="#"])` to the opener selector so Next.js `<Link>` elements (which render as `<a>`) are detected as openers
2. Add `else if (!openBtn)` branch that dispatches `new MouseEvent('click', { bubbles: true, cancelable: true })` on the card element itself
3. Apply existing re-entry guard pattern (`card.dataset.opening`) in the fallback branch

**Risk:** Medium — changes behavior for quick notes (previously did nothing; now dispatches a card click). The re-entry guard prevents recursion.

**Rollback:** Remove the `else if (!openBtn)` block; behavior degrades to previous (does nothing for quick notes)

---

### Step 3 — `src/services/aiPostService.ts` — Improve error messages + add REST v1

**Files:** `src/services/aiPostService.ts`
**Changes:**

A. `collectWritingStream()`: Add `if (res.status === 401)` branch with actionable error message
B. `runAutoTag()`: Wrap `trpcMutate` in try/catch; detect 401 via string matching; rethrow with actionable message
C. `updateNoteContent()`: Check `s.blinkoApiUrl && s.blinkoApiToken`; use REST v1 path with `Authorization: Bearer`; fall through to tRPC if credentials absent

**Risk:** Low for A+B (error message improvements only); Medium for C (new code path, new network call)

---

### Step 4 — `src/setting.tsx` — Add API Connection section

**Files:** `src/setting.tsx`
**Changes:**

A. Add three `useState` hooks: `apiConnTestResult`, `apiConnTesting`, `showApiToken`
B. Add "🔗 API Connection (Optional)" section to the AI Post tab:
   - URL text input (persisted via `aiPostService.save()` on keystroke)
   - Token password input with show/hide toggle
   - Test Connection button (dry-run POST to `/api/v1/note/upsert` with `id: -99999`)
   - Inline result display

**Test button HTTP response interpretation:**
- 200 / 400 / 404 → ✅ Auth succeeded (note not found is acceptable)
- 401 / 403 → ❌ Auth failed
- Network error → ❌ Error with message
- Other status → ⚠️ Unexpected

**Risk:** Low — purely additive UI; no changes to existing settings

---

### Step 5 — Build + Commit + Push

**Command:** `bun run build`
**Expected:** Zero TypeScript errors; bundle ≤ 250 kB uncompressed
**Commit message:** Descriptive multi-line message covering all 4 changes
**Branch:** `claude/review-rtl-plugin-prs-OMCOM`

---

## Acceptance Criteria (from USER_REQUIREMENTS.md)

- [ ] Single-tap works on Blinko quick notes (NoteType=0)
- [ ] AI 401 error messages include actionable guidance
- [ ] `updateNoteContent()` uses REST v1 when credentials are set
- [ ] API Connection section present in AI Post tab
- [ ] Test Connection button correctly identifies valid/invalid credentials
- [ ] Build passes with zero errors
- [ ] All changes committed and pushed

**Completion status:** All criteria met. Commit `874f07f` pushed 2026-03-26.

---

## File Change Manifest

| File | Type | Changes |
|------|------|---------|
| `src/types.ts` | Modified | Added `blinkoApiUrl`, `blinkoApiToken` to `AIPostSettings` + defaults |
| `src/services/uiuxService.ts` | Modified | Expanded opener selector + `else if (!openBtn)` fallback in `applySingleTap()` |
| `src/services/aiPostService.ts` | Modified | 401 error messages in `collectWritingStream()` + `runAutoTag()`; REST v1 path in `updateNoteContent()` |
| `src/setting.tsx` | Modified | 3 new `useState` hooks; API Connection section with URL/token inputs + test button |

---

*Plan version: 3.0 — Session 3, 2026-03-26*
