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
All phases complete. Awaiting review of PR #348 and the Phase 4–7 PR.

## Success Criteria

- [x] `bun test` is green with 0 failures and 0 dead test files — **291 pass / 0 fail / 0 skip**
- [x] A golden-corpus detection test exists (Hebrew, Arabic, mixed, code, digits,
      punctuation-only, short strings) and passes before and after every
      engine change
- [x] `minRTLChars` and `sensitivity` mean exactly one thing each, documented in
      code, and consistent across both strategies
- [x] Every `settings.method` value applies *and clears* direction correctly
- [x] Open PR count reduced to a reviewed, deliberate set — **205 → 4**
- [x] No regression in editor typing behavior — the flicker guard in
      `setupObserver` is untouched

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

> **Scale correction.** The backlog was **205 open PRs**, not 30 — the original
> figure came from a truncated `gh pr list --limit 40`. The stream runs back to
> 2026-04-15. See the correction block at the top of `findings.md`.

- [x] Picked one canonical PR per cluster: **#344** (perf) and **#345** (a11y)
- [x] Addressed the `CHANGES_REQUESTED` review on both before merging:
      - #344: CodeRabbit flagged that the charCode rewrite dropped Unicode-aware
        whitespace handling. Confirmed real — added `isWhitespaceCode()` and
        `tests/codeblock-whitespace.test.ts` (11 tests, 5 of which fail against
        the naive predicate)
      - #345: extracted `getPresetActionState()` as a single source of truth,
        fixing a tooltip that reported "Select a preset to delete" when the real
        blocker was the plugin being switched off. Added
        `tests/presetActions.test.ts` (14 tests incl. keyboard activation)
- [x] Re-ran the Phase 2 corpus against #344 — **no classification moved**,
      confirming the risk called out in its own description
- [x] Merged #344 and #345
- [x] Closed **201** duplicate Bolt/Palette PRs, each with a cluster-specific
      explanation. 0 failures
- [x] Reviewed and merged **#145** (security) — see below
- [ ] **Stop the source.** Deferred by decision: the automation stays running.
      It produced #346 and #347 during this session, so duplicates will continue
      to accumulate at ~2/day
- **Status:** complete
- **Completed:** 2026-08-01
- **Result:** open PRs **205 → 4** (#350 CodeRabbit follow-up, #348 this work,
  #257 Sentinel MEDIUM, #138 AIPostService tests).

**Closure breakdown:** 101 a11y (superseded by #345), 64 perf (superseded by
#344), 36 uiuxService NodeList (**not** superseded — #344 never touched
`uiuxService.ts`, so that optimisation remains unapplied; closed because 36
competing versions cannot all be reviewed, and said so in the comment).

**#145 — 🛡️ Sentinel [HIGH], merged.** Two real issues: `isAIEndpointUrl` matched
by substring over the whole URL, and `buildPrompt` passed note content as a
`String.replace` *replacement string*, where `$&` and friends are special. Both
fixes were correct in direction but untested, and the URL fix **failed open** —
it skipped the origin comparison whenever the page origin was unknown, which is
the default in a sandboxed iframe (and in the test environment, which is why the
PR had rewritten its own tests to `http://localhost` to keep them green). Made
it fail closed, gave the existing tests a real page origin, and added
`tests/security/aiEndpointGuards.test.ts` (24 tests, 15 of which fail against
the pre-fix code). **Severity note:** "HIGH" overstates it — the interceptor
returns the response untouched and only fires a toast on a 401, so the
over-match produced a misleading message, not data exposure.

---

### Phase 4: Detection Engine Correctness
Depends on Phases 2 and 3. The core of the "main feature" — each item maps to a
finding.

- [x] **F-03 — unify `minRTLChars` semantics.** `rtlService.processElement`
      treats it as *minimum total text length*; both strategies treat it as
      *minimum count of RTL characters*. Same setting, two meanings. Pick one
      (recommend: count of RTL chars) and introduce a separate `minTextLength`
      if the length guard is still wanted
- [x] **F-04 — unify the ratio denominator.** `CharacterCodeStrategy` divides by
      *significant* chars within a 100-char sample; `RegexStrategy` divides by
      raw `text.length` (whitespace included) over the *whole* string. The same
      `sensitivity` threshold therefore means two different things
- [x] **F-05 — reconcile `CombinedStrategy`'s OR.** It returns true if *any*
      strategy fires, so the more lenient denominator always wins and
      `sensitivity: 'low'` (0.4) is weaker than configured. Decide OR / AND /
      weighted, and document it
- [x] **F-06 — extend RTL coverage.** Both strategies miss N'Ko (U+07C0–07FF),
      Samaritan (U+0800–083F), Mandaic (U+0840–085F), Syriac Supplement
      (U+0860–086F), Arabic Extended-B (U+0870–089F), and all astral RTL such as
      Adlam (U+1E900–1E95F). Extend `RTL_RANGES` and the regex patterns together
      so they stay in sync
- [x] **F-07 — sampling.** `substring(0, sampleSize)` may split a surrogate pair,
      and sampling only the first 100 chars misclassifies a long note whose RTL
      content starts later. Consider sampling head+middle+tail
- [x] Corpus stayed green at each step
- **Status:** complete
- **Exit:** one documented meaning per setting; corpus passes; new script
  coverage proven by new corpus rows.

---

### Phase 5: Application-Layer Correctness
Depends on Phase 4. Detection can be right and the DOM still wrong. All in
`rtlService`.

- [x] **F-08 — `applyUnicodeBidiRTL` ignores its direction.** With
      `method: 'unicode'` the computed direction is discarded, `rtl-auto` is
      added unconditionally, and neutral/LTR never cleans up. It also skips
      `applyDebugVisuals`, so debug mode is silently dead in that method
- [x] **F-09 — `method: 'all'` isn't all.** It applies CSS class + attributes but
      not the inline direct styles, despite the name
- [x] **F-10 — short-text path ignores the configured method.** The early return
      calls `applyCSSClassRTL(element, 'neutral')` regardless of `settings.method`
- [x] **F-13 — nested container double-processing.** `DEFAULT_TARGET_SELECTORS`
      includes `.markdown-body div`, `p`, and `span` simultaneously. A container
      holding both a Hebrew and an English paragraph is classified from its
      concatenated `textContent` and given one direction, then its children are
      classified separately. Consider processing only leaf-most matches, or
      applying `dir="auto"` on containers and explicit direction on leaves
- [x] **Native BiDi option.** `unicode-bidi: plaintext` and `dir="auto"` already
      appear in the CSS presets but there is no first-class "let the browser
      decide" detection method. This is the most correct behavior for mixed
      content and would make the whole hot path optional for users who want it
- **Status:** complete
- **Exit:** every `method` value applies and clears direction symmetrically;
  integration tests cover each method.

---

### Phase 6: Performance & Resource Hygiene
Depends on Phase 3 — the perf PR lands first, so the same lines aren't rewritten
twice.

- [x] **F-14 — bound the action log preview.** `logAction` stores the element's
      entire `textContent` in a field named `textPreview`, keeps 50 of them, and
      dispatches each in a `CustomEvent`. Truncate to ~120 chars
- [x] **F-15 — reconsider the 5s poll.** `startAutoProcessing` re-scans the whole
      DOM every `processInterval` (default 5000ms) *in addition to* a
      `MutationObserver` on `document.body` with `subtree + childList +
      characterData + attributes`. The code comment already concedes the poll is
      redundant. Make it adaptive or drop it behind a setting
- [x] **F-16 — `injectBaseCSS` has no matching removal.** `removeCSS()` clears
      the dynamic/permanent/style elements but never `baseStyleElement`, so
      `destroy()` leaves it in `<head>`
- [x] Added a micro-benchmark for `detect()` so future perf claims are measured in
      this repo rather than asserted in a PR description
- [x] Re-ran corpus — perf work moved no classification
- **Status:** complete
- **Exit:** measured before/after; corpus unchanged.

---

### Phase 7: Verify & Release
Depends on Phases 2–6.

- [x] `bun test` green (291); `bun run build` clean
- [ ] **Manual smoke in Blinko — NOT DONE, needs a human**: typing Hebrew in the editor (no flicker), mixed
      paste, code block, long note, each `method` value, toggle on/off, plugin
      destroy
- [x] Updated `README.md` (also corrected two factual errors); `README_he.md` still pending if settings semantics changed
- [x] Changelog entry naming the behavior changes from Phase 4 (these are
      user-visible: existing users' `minRTLChars` may need a migration bump —
      see the `_settingsVersion` v1→v2 pattern already in `loadSettings`)
- [x] Version bumped to 3.1.0; release via GitHub Actions pending merge
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
