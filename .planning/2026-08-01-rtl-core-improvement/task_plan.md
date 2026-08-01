# Task Plan: RTL Core Improvement

**Plan ID:** 2026-08-01-rtl-core-improvement
**Created:** 2026-08-01
**Repo:** blinko-plugin-rtl-support v3.0.10 (`main`)

## Goal

Improve the plugin's main feature — automatic RTL detection and direction
application for Hebrew/Arabic content in Blinko — along three axes:

1. **Correctness** — the detection engine currently has conflicting threshold
   semantics between its two strategies, and the application layer has methods
   that silently ignore the direction they were given.
2. **Reliability** — restore a trustworthy test/CI safety net before changing
   any detection behavior.
3. **Throughput of the change pipeline** — 30 open bot-generated PRs are
   blocking real work; collapse them to the small number of distinct changes
   they actually represent.

## Current Phase
Phase 3 (Phases 1–2 complete) — blocked on a user decision, see Phase 3

## Success Criteria

- [ ] `bun test` is green with 0 failures and 0 dead test files
- [ ] A golden-corpus detection test exists (Hebrew, Arabic, mixed, code, digits,
      punctuation-only, short strings) and passes before and after every
      engine change
- [ ] `minRTLChars` and `sensitivity` mean exactly one thing each, documented in
      code, and consistent across both strategies
- [ ] Every `settings.method` value applies *and clears* direction correctly
- [ ] Open PR count reduced from 30 to a reviewed, deliberate set
- [ ] No regression in editor typing behavior (the LTR↔RTL flicker fix in
      `setupObserver` stays intact)

## Non-Goals

- The AI post-processing feature (`aiPostService`) and UI/UX service — separate
  surface area, not the "main feature"
- Rewriting `src/setting.tsx` (2626 lines) — touched only where a phase requires
- Changing the Blinko plugin API surface (`window.blinkoRTL`)

---

## Phases

### Phase 1: Baseline & PR Triage
- [x] Establish real test baseline (`bun install` was missing → 11 phantom failures)
- [x] Read the core feature path: `rtlDetector` → strategies → `rtlService` → DOM
- [x] Pull and classify the last 5 PRs (#341–#345)
- [x] Discover the wider PR backlog (30 open, all bot-generated)
- [x] Record findings in `findings.md`
- **Status:** complete

**Result:** true baseline is **114 pass / 8 skip / 1 fail**. The single failure is
a dead test file. See findings F-01..F-16.

---

### Phase 2: Repair the Safety Net
Every later phase changes detection behavior. Without a corpus test,
"improvement" is unverifiable and regressions ship silently.

- [x] Deleted `tests/renderer.test.ts` — tested `DOMRTLRenderer` from
      `src/renderer`, a module that no longer exists (F-02)
- [x] Deleted `tests/utils/rtlProcessor.test.ts` — `describe.skip` over a
      locally-stubbed `RTLProcessor`; it asserted nothing and could not be
      restored without resurrecting a deleted architecture
- [x] Un-skipped `it("removes debug visual classes...")` in
      `tests/integration/service.test.ts` — the stated happy-dom cause was not
      real; it passes with a cleaner setup
- [x] Added `tests/detection-corpus.test.ts` — 85 tests, split into INVARIANT
      (must never change) and CHARACTERIZATION (pins today's wrong behavior,
      tagged with its finding, expected to flip when fixed)
- [x] Verified full suite green
- **Status:** complete
- **Completed:** 2026-08-01
- **Exit met:** `bun test` → **200 pass / 0 fail / 0 skip / 343 assertions**
  (baseline was 114 pass / 8 skip / 1 fail).

**Corpus coverage by finding:** F-03, F-04, F-05, F-06, F-07, F-08, F-09, F-10,
F-13, F-14, F-16, F-18. Every Phase 4–6 item now has a failing-on-change guard.

---

### Phase 3: Resolve the PR Backlog
Depends on Phase 2 — need tests before merging perf rewrites.

The last 5 PRs collapse into **2 distinct changes** (F-11). The full backlog of
30 collapses into roughly the same 2 themes repeated ~15 times each.

| Cluster | PRs | Real content |
|---|---|---|
| a11y: `disabled` → `aria-disabled` on preset buttons | #341, #343, #345 (+ #339, #338, #336, #333, #332, …) | `src/setting.tsx` Load/Delete preset buttons; adds tooltips, `aria-label`, `aria-hidden` emoji, click guard |
| perf: `charCodeAt` hot-loop rewrite | #342, #344 (+ #337, #335, #334, #331, #330, #328, …) | `CharacterCodeStrategy.detect`, `pasteInterceptor.detectMixedContent`, `rtlService` code-block ratio |

- [ ] Pick **one canonical PR per cluster**. Recommend #344 (perf — widest
      coverage, +55/-18 across all three hot paths) and #345 (a11y — most recent,
      smallest diff at +13/-6)
- [ ] Address the `CHANGES_REQUESTED` review on the two survivors (4 of the 5
      carry unresolved review feedback — F-12)
- [ ] Re-run the Phase 2 corpus against the perf PR: it changes detection
      *implementation*, and the risk called out in its own description is that
      numeric range checks must stay equivalent to the string-based logic
- [ ] Close the remaining 28 with a short explanation referencing the survivor
- [ ] **Stop the source.** The Jules automation has produced ~2 near-duplicate
      PRs/day since at least 2026-07-10 with a 0% merge rate. Decide: disable it,
      narrow its scope, or gate it behind "no open PR touching the same file"
- **Status:** pending
- **Exit:** open PR count is deliberate; no duplicate-cluster PRs remain open.

---

### Phase 4: Detection Engine Correctness
Depends on Phases 2 and 3. The core of the "main feature" — each item maps to a
finding.

- [ ] **F-03 — unify `minRTLChars` semantics.** `rtlService.processElement`
      treats it as *minimum total text length*; both strategies treat it as
      *minimum count of RTL characters*. Same setting, two meanings. Pick one
      (recommend: count of RTL chars) and introduce a separate `minTextLength`
      if the length guard is still wanted
- [ ] **F-04 — unify the ratio denominator.** `CharacterCodeStrategy` divides by
      *significant* chars within a 100-char sample; `RegexStrategy` divides by
      raw `text.length` (whitespace included) over the *whole* string. The same
      `sensitivity` threshold therefore means two different things
- [ ] **F-05 — reconcile `CombinedStrategy`'s OR.** It returns true if *any*
      strategy fires, so the more lenient denominator always wins and
      `sensitivity: 'low'` (0.4) is weaker than configured. Decide OR / AND /
      weighted, and document it
- [ ] **F-06 — extend RTL coverage.** Both strategies miss N'Ko (U+07C0–07FF),
      Samaritan (U+0800–083F), Mandaic (U+0840–085F), Syriac Supplement
      (U+0860–086F), Arabic Extended-B (U+0870–089F), and all astral RTL such as
      Adlam (U+1E900–1E95F). Extend `RTL_RANGES` and the regex patterns together
      so they stay in sync
- [ ] **F-07 — sampling.** `substring(0, sampleSize)` may split a surrogate pair,
      and sampling only the first 100 chars misclassifies a long note whose RTL
      content starts later. Consider sampling head+middle+tail
- [ ] Corpus must stay green at each step
- **Status:** pending
- **Exit:** one documented meaning per setting; corpus passes; new script
  coverage proven by new corpus rows.

---

### Phase 5: Application-Layer Correctness
Depends on Phase 4. Detection can be right and the DOM still wrong. All in
`rtlService`.

- [ ] **F-08 — `applyUnicodeBidiRTL` ignores its direction.** With
      `method: 'unicode'` the computed direction is discarded, `rtl-auto` is
      added unconditionally, and neutral/LTR never cleans up. It also skips
      `applyDebugVisuals`, so debug mode is silently dead in that method
- [ ] **F-09 — `method: 'all'` isn't all.** It applies CSS class + attributes but
      not the inline direct styles, despite the name
- [ ] **F-10 — short-text path ignores the configured method.** The early return
      calls `applyCSSClassRTL(element, 'neutral')` regardless of `settings.method`
- [ ] **F-13 — nested container double-processing.** `DEFAULT_TARGET_SELECTORS`
      includes `.markdown-body div`, `p`, and `span` simultaneously. A container
      holding both a Hebrew and an English paragraph is classified from its
      concatenated `textContent` and given one direction, then its children are
      classified separately. Consider processing only leaf-most matches, or
      applying `dir="auto"` on containers and explicit direction on leaves
- [ ] **Native BiDi option.** `unicode-bidi: plaintext` and `dir="auto"` already
      appear in the CSS presets but there is no first-class "let the browser
      decide" detection method. This is the most correct behavior for mixed
      content and would make the whole hot path optional for users who want it
- **Status:** pending
- **Exit:** every `method` value applies and clears direction symmetrically;
  integration tests cover each method.

---

### Phase 6: Performance & Resource Hygiene
Depends on Phase 3 — the perf PR lands first, so the same lines aren't rewritten
twice.

- [ ] **F-14 — bound the action log preview.** `logAction` stores the element's
      entire `textContent` in a field named `textPreview`, keeps 50 of them, and
      dispatches each in a `CustomEvent`. Truncate to ~120 chars
- [ ] **F-15 — reconsider the 5s poll.** `startAutoProcessing` re-scans the whole
      DOM every `processInterval` (default 5000ms) *in addition to* a
      `MutationObserver` on `document.body` with `subtree + childList +
      characterData + attributes`. The code comment already concedes the poll is
      redundant. Make it adaptive or drop it behind a setting
- [ ] **F-16 — `injectBaseCSS` has no matching removal.** `removeCSS()` clears
      the dynamic/permanent/style elements but never `baseStyleElement`, so
      `destroy()` leaves it in `<head>`
- [ ] Add a micro-benchmark for `detect()` so future perf claims are measured in
      this repo rather than asserted in a PR description
- [ ] Re-run corpus — perf work must not move a single classification
- **Status:** pending
- **Exit:** measured before/after; corpus unchanged.

---

### Phase 7: Verify & Release
Depends on Phases 2–6.

- [ ] `bun test` green; `bun run build` clean
- [ ] Manual smoke in Blinko: typing Hebrew in the editor (no flicker), mixed
      paste, code block, long note, each `method` value, toggle on/off, plugin
      destroy
- [ ] Update `README.md` / `README_he.md` if settings semantics changed
- [ ] Changelog entry naming the behavior changes from Phase 4 (these are
      user-visible: existing users' `minRTLChars` may need a migration bump —
      see the `_settingsVersion` v1→v2 pattern already in `loadSettings`)
- [ ] Version bump + release via GitHub Actions
- **Status:** pending

---

## Decisions Made

| Decision | Rationale |
|---|---|
| D-01: Fix tests before touching detection | Detection changes are invisible without a corpus; the repo's only guard is 204 assertions that don't cover threshold semantics |
| D-02: Land the perf PR before Phase 6 | Phases 3 and 6 touch the same hot loops; sequencing avoids a rebase conflict across 30 open branches |
| D-03: Settings-semantics changes need a `_settingsVersion` bump | `loadSettings` already has a v1→v2 migration precedent; changing `minRTLChars` meaning silently would alter existing users' behavior |

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| `Cannot find module '@happy-dom/global-registrator'` ×11 | 1 | `node_modules/` was empty — ran `bun install`, failures dropped 11 → 1 |
| `Cannot find module '../src/renderer'` | 1 | Not environmental. Dead test file; scheduled in Phase 2 |
