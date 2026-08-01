# Progress Log

## Session: 2026-08-01

### Current Status
- **Phase:** 1 complete → Phase 2 pending (not started; awaiting go-ahead)
- **Started:** 2026-08-01
- **Repo state at start:** `main` @ `2b30c7b`, clean tree, v3.0.10

### Actions Taken

| # | Action | Result |
|---|---|---|
| 1 | Checked for existing planning files | None — fresh session, no `.planning/` dir |
| 2 | `gh pr list --limit 5 --state all` | #341–#345, all OPEN, none merged, all Jules-authored |
| 3 | Read `src/services/rtlService.ts` (805 lines) | Core of the feature; findings F-03, F-08, F-09, F-10, F-14, F-15, F-16 |
| 4 | Read `src/utils/rtlDetector.ts`, all 3 strategies | Findings F-04, F-05, F-06, F-07 |
| 5 | Read `src/utils/pasteInterceptor.ts`, `src/index.tsx` | Confirmed feature entry path and plugin API surface |
| 6 | `bun test` (first run) | 36 pass / 11 fail — all module-resolution errors |
| 7 | `ls node_modules` | Empty. Failures were environmental, not code |
| 8 | `bun install` | 252 packages, 1.5s, exit 0 |
| 9 | `bun test` (second run) | **114 pass / 8 skip / 1 fail / 204 assertions**, 1.56s — true baseline |
| 10 | Inspected the 1 remaining failure | `tests/renderer.test.ts` imports `src/renderer` + `src/config`, neither exists |
| 11 | `gh pr list --state open --limit 40` | **30 open PRs**, strictly alternating ⚡Bolt/🎨Palette since 2026-07-10, 0 merged |
| 12 | `gh pr list --json mergeable,reviewDecision,files` | All 5 MERGEABLE/CLEAN; 4 of 5 have CHANGES_REQUESTED |
| 13 | Wrote `task_plan.md` (7 phases) and `findings.md` (F-01..F-17) | Plan ready for review |

### Test Results

| Test run | Expected | Actual | Status |
|---|---|---|---|
| `bun test` before `bun install` | green | 36 pass / 11 fail / 11 errors | ❌ environmental |
| `bun test` after `bun install` | green | 114 pass / 8 skip / 1 fail | ⚠️ baseline — 1 real failure |
| `tests/renderer.test.ts` | passes | `Cannot find module '../src/renderer'` | ❌ dead test file (F-02) |

### Errors

| Error | Attempt | Resolution |
|---|---|---|
| `Cannot find module '@happy-dom/global-registrator'` (×2 files) | 1 | `bun install` — resolved |
| `Cannot find module 'preact/jsx-dev-runtime'` (×2 files) | 1 | `bun install` — resolved |
| `Cannot find module '../src/renderer'` | 1 | Not environmental. Modules genuinely absent from `src/`. Queued as Phase 2 item |
| `ls -a` returning empty output in this shell | 1 | Shell `ls` is aliased to a formatter that swallowed output; switched to `find` and absolute paths |

---

## Session: 2026-08-01 (cont.) — Phase 2 execution

### Current Status
- **Phase:** 2 complete → Phase 3 blocked on user decision
- **Suite:** 200 pass / 0 fail / 0 skip / 343 assertions across 17 files

### Actions Taken

| # | Action | Result |
|---|---|---|
| 14 | Read `tests/renderer.test.ts` and `tests/utils/rtlProcessor.test.ts` in full | Both target a deleted `DOMRTLRenderer`/`RTLProcessor`/`RTLConfig` architecture. `rtlProcessor.test.ts` defines its own stub `RTLProcessor` class to compile, under `describe.skip` — it asserted nothing |
| 15 | Confirmed live coverage isn't lost | Current equivalents exist in `tests/services/rtlService.test.ts`, `tests/integration/service.test.ts`, `tests/strategies*.test.ts`, `tests/unit/detector.test.ts` |
| 16 | `git rm` both dead test files | Suite drops from 18 → 17 files |
| 17 | Un-skipped the debug-class-removal test | Passes. The comment blamed happy-dom `querySelectorAll`; the real issue was the test's own setup ordering |
| 18 | Wrote a detection probe over 31 inputs × 3 sensitivities × 3 strategies | Measured ground truth rather than guessing assertions |
| 19 | Wrote a DOM probe over 5 methods × 4 texts, plus clearing, nesting, log, teardown | Confirmed F-08/F-09/F-10/F-13/F-14/F-16 empirically |
| 20 | Wrote `tests/detection-corpus.test.ts` (85 tests) | Green |
| 21 | Full `bun test` | **200 pass / 0 fail / 0 skip** |

### Test Results

| Test run | Expected | Actual | Status |
|---|---|---|---|
| `bun test tests/integration/service.test.ts` after un-skip | passes | 3 pass / 0 fail | ✅ skip was unwarranted |
| `bun test tests/detection-corpus.test.ts` (first run) | green | 84 pass / 1 fail | ❌ my F-03 assertion was wrong |
| `bun test tests/detection-corpus.test.ts` (after fix) | green | 85 pass / 0 fail | ✅ |
| `bun test` (full, Phase 2 exit) | 0 fail, 0 skip | **200 pass / 0 fail / 0 skip** | ✅ exit criteria met |

### New findings from Phase 2 probes

- **F-18 (new).** Arabic-Indic digits `١٢٣٤٥` (U+0660–0669) are classified RTL
  because they sit inside the 0600–06FF range. Their Unicode bidi class is AN
  (Arabic Number), which does not establish paragraph direction. Latin digits
  are correctly neutral. Judgment call for Phase 4, not clearly a bug.
- **F-06 has a concrete drift proof.** Syriac and Thaana are detected by
  `CharacterCodeStrategy` but *not* by `RegexStrategy` — the two script lists
  have already diverged in `main`.
- **F-07 is sharper than written.** For a 145-char note that turns Hebrew after
  char 120, the combined detector returns true at `high` and false at `medium` —
  not because of the threshold, but because `RegexStrategy` has no sample window
  and `CharacterCodeStrategy` does. The sensitivity knob is reporting an
  artifact.
- **F-10 is worse than written.** With `method: 'direct'`, text falling below the
  length gate leaves both `blinko-detected-rtl` *and* inline `direction: rtl`
  behind. With `attributes`, `dir="rtl"` persists. Only `css` cleans up.

### Errors

| Error | Attempt | Resolution |
|---|---|---|
| Corpus F-03 case failed: `detectWith('medium','שלום עולם',12)` returned false, I asserted true | 1 | My assumption was wrong, not the code: 8 Hebrew chars < 12, and the pure-RTL bypass needs `rtlCount === text.trim().length` (8 ≠ 9, the space). Rewrote the case around `"כן"` at `minRTLChars: 5`, where the service gate and detector gate genuinely disagree |

---

## Session: 2026-08-01 (cont.) — Phase 3 execution

### Current Status
- **Phase:** 3 complete → Phase 4 ready to start
- **Open PRs:** 205 → 4
- **Suite on `phase2` rebased onto merged main:** 225 pass / 0 fail / 0 skip

### Actions Taken

| # | Action | Result |
|---|---|---|
| 22 | Committed Phase 2 to `phase2/test-safety-net`, opened PR #348 | Open for review |
| 23 | Fetched #344 and #345, merged Phase 2 into each, ran the corpus | Both **200 pass / 0 fail** — neither moved a classification |
| 24 | Reviewed #344's diff independently | Spotted the NBSP/Unicode-whitespace regression before reading the review; CodeRabbit had flagged the same thing |
| 25 | Fixed #344: added `isWhitespaceCode()` + `tests/codeblock-whitespace.test.ts` | First version of the test passed against the bug — reworked until it discriminated (5 of 11 fail pre-fix) |
| 26 | Fixed #345: extracted `getPresetActionState()` + `tests/presetActions.test.ts` | 14 tests, all branches, incl. keyboard activation |
| 27 | Merged #344 and #345 after full CI green | `main` @ 527fb06 |
| 28 | Queried the authoritative PR count via the search API | **205 open**, not 30 — earlier `--limit 40` had truncated |
| 29 | Paused and re-confirmed scope with the user before bulk closure | Approved: close all 201 Bolt/Palette |
| 30 | Closed 201 duplicates with cluster-specific comments | 0 failures. 101 a11y / 64 perf / 36 uiux |
| 31 | Reviewed #145 (Sentinel HIGH) | Both issues real; fix **failed open** on unknown origin |
| 32 | Hardened #145, added `tests/security/aiEndpointGuards.test.ts` | 24 tests; 15 fail against pre-fix code |
| 33 | Merged #145 after full CI green | — |

### Test Results

| Test run | Expected | Actual | Status |
|---|---|---|---|
| Corpus vs #344 | no classification moves | 200 pass / 0 fail | ✅ |
| Corpus vs #345 | no classification moves | 200 pass / 0 fail | ✅ |
| `codeblock-whitespace` vs naive predicate | should fail | 5 fail / 6 pass | ✅ discriminating |
| `codeblock-whitespace` vs fix | green | 11 pass / 0 fail | ✅ |
| `presetActions` | green | 14 pass / 0 fail | ✅ |
| `aiEndpointGuards` vs pre-fix code | should fail | 15 fail / 9 pass | ✅ discriminating |
| `aiEndpointGuards` vs hardened fix | green | 24 pass / 0 fail | ✅ |
| `phase2` rebased onto merged main | green | 225 pass / 0 fail / 0 skip | ✅ |

### Corrections to earlier findings

- **"30 open PRs" was wrong.** Authoritative count was **205**, from
  `search/issues`. `gh pr list --limit 40` had silently truncated. The stream
  runs back to 2026-04-15, ~3.5 months, not three weeks.
- **"0% merge rate" was wrong as stated.** The repo has 76 merged and 67
  closed-unmerged PRs historically. What held was that none of the *recent*
  Bolt/Palette stream had been merged.
- **A first attempt at the NBSP regression test did not discriminate.** Six
  Hebrew words with five separators keeps the ratio above 0.6 either way. Only
  after switching to single letters (separators ≈ half the string) did the test
  fail against the bug. Worth remembering: always run a new regression test
  against the unfixed code.

### Errors

| Error | Attempt | Resolution |
|---|---|---|
| Literal newline inside a single-quoted string in the separator table | 1 | Rewrote the whole table with explicit `\uXXXX` escapes — clearer for invisible characters anyway |
| `service.updateSettings is not a function` on `AIPostService` | 1 | Wrong API assumed; it exposes `save(patch)` and `buildPrompt` is public |
| Pushed the #145 fix to a new branch instead of the PR head | 1 | Read `headRefName` from the API, pushed there, deleted the stray branch |
| `git rebase` refused with unstaged planning-file changes | 1 | Committed the plan updates first |

### Notes for next session

- **Phase 4 starts here.** The corpus in `tests/detection-corpus.test.ts` is the
  contract: its CHARACTERIZATION assertions are *expected* to flip, deliberately
  and one at a time, as F-03..F-07 are fixed
- `bun test` is the fast loop (~1.9s, 225 tests)
- Preserve the editor-flicker guard in `setupObserver` through all later phases
- The 36 uiuxService NodeList PRs were closed **without** the optimisation being
  applied — if that work is wanted, it needs one fresh PR
- The Jules automation is still running by decision; #346/#347 appeared during
  this session and the backlog will rebuild at ~2/day
