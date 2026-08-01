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

---

## Session: 2026-08-01 (cont.) — Phases 4–7 execution

### Current Status
- **Phases 1–7 complete.** Suite **291 pass / 0 fail / 0 skip**, tsc clean,
  build clean (249.35 kB), version bumped to 3.1.0
- Branch `phase4/detection-semantics` (includes the Phase 2 branch), not yet PR'd

### Design decisions taken under stated assumptions

The user replied "go" without answering the two Phase 4 questions, so both were
resolved with the recommendations already given, stated in code and commits:

1. **`minRTLChars` = count of strong RTL characters**, with the length gate
   split out into a new `minTextLength` setting, migrated at settings v3.
2. **`CombinedStrategy` stays an OR** — but it is now a policy rather than an
   accident. The complaint (F-05) was that the looser strategy always won;
   unifying the denominator and range set (F-04, F-06) dissolves that, so OR is
   stable and `low` sensitivity is genuinely conservative.

A third decision surfaced mid-implementation and was **not** pre-agreed:
**minRTLChars is now a hard floor with no exemption for wholly-RTL text.** The
old exemption compared the RTL count against the *trimmed length*, so it fired
only when the text had no spaces — `כן` was exempt, `שלום עולם` was not. That is
an accident of whitespace, not a policy, and it left the setting unable to
filter the text it was raised to filter. This is user-visible: at
`minRTLChars: 3`, `כן` is no longer detected. The default of 1 is unaffected.
Three pre-existing tests encoded the old exemption and were updated.

### Actions Taken

| # | Action | Result |
|---|---|---|
| 34 | Created `src/utils/strategies/rtlRanges.ts` | Single source of truth for ranges, neutrality, sampling and thresholds |
| 35 | Rewrote both strategies against it | They now agree on every probe row |
| 36 | Split `minTextLength` from `minRTLChars`, settings v3 migration | Existing installs keep their length behaviour |
| 37 | Re-probed 31 inputs × 3 sensitivities × 3 strategies | All scripts detected incl. astral Adlam; Arabic-Indic digits neutral |
| 38 | Flipped the Phase 4 corpus characterizations to invariants | Deliberate, one finding at a time |
| 39 | Phase 5: `unicode` now takes a direction and uses `dir="auto"` + `plaintext`; `all` applies all three; `clearDirection()` for the short-text path; containers classified on own text | 285 pass |
| 40 | Phase 6: bounded log preview, adaptive sweep backoff, `removeBaseCSS()` | 286 pass |
| 41 | Added `tests/detection-benchmark.test.ts` | short 1.13µs, paragraph 4.85µs, 200k chars 6.55µs |
| 42 | Phase 7: settings UI control, README corrections, changelog, v3.1.0 | 291 pass, build clean |

### Test Results

| Test run | Expected | Actual | Status |
|---|---|---|---|
| Phase 4 first run against corpus | characterizations flip, invariants hold | 231 pass / 18 fail — all 18 were characterizations | ✅ by design |
| After flipping Phase 4 corpus | green | 283 pass / 0 fail | ✅ |
| Phase 5 | green | 285 pass / 0 fail | ✅ |
| Phase 6 | green | 291 pass / 0 fail | ✅ |
| `npx tsc --noEmit` | clean | clean | ✅ |
| `bun run build` | clean | 249.35 kB / 51.59 kB css | ✅ |
| Benchmark: 200k chars vs paragraph | near-flat | 6.55µs vs 4.85µs | ✅ bounded sampling works |

### Errors

| Error | Attempt | Resolution |
|---|---|---|
| Bumped `_settingsVersion` in `DEFAULT_UIUX_SETTINGS` | 1 | Wrong object — that governs the unrelated UIUX migration. Reverted; RTL's version is stored ad-hoc in `rtlService`, now declared on `RTLSettings` |
| `regex_config` "respects minRTLChars" broke after the denominator fix | 1 | Not a test bug: the wholly-RTL exemption now fired for spaced text too. Resolved by removing the exemption (see decisions above) rather than by adjusting the test to fit |
| Phase 4 branch had no corpus | 1 | Branched from `main`, but #348 is unmerged. Merged the Phase 2 branch in — Phase 4 must be measured against the contract |

### Not done

- **Manual smoke test in Blinko.** Needs a human with a running instance:
  typing Hebrew in the editor (flicker), mixed paste, code blocks, each method,
  toggle on/off, plugin destroy.
- **`README_he.md`** not updated — the English README was.
- **The 36 uiuxService NodeList PRs** were closed without their optimisation
  being applied.
- **The Jules automation** is still running by decision.

### Notes for next session

- **Phase 4 started here.** The corpus in `tests/detection-corpus.test.ts` is the
  contract: its CHARACTERIZATION assertions are *expected* to flip, deliberately
  and one at a time, as F-03..F-07 are fixed
- `bun test` is the fast loop (~1.9s, 225 tests)
- Preserve the editor-flicker guard in `setupObserver` through all later phases
- The 36 uiuxService NodeList PRs were closed **without** the optimisation being
  applied — if that work is wanted, it needs one fresh PR
- The Jules automation is still running by decision; #346/#347 appeared during
  this session and the backlog will rebuild at ~2/day
