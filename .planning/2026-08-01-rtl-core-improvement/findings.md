# Findings & Decisions — RTL Core Improvement

All findings below were read directly from the source in this repo at commit
`2b30c7b` (v3.0.10) on 2026-08-01, or from `gh` output against
`Daniel-OS01/blinko-rtl-support-plugin`. Severity is my assessment, not a
measured user impact.

## Requirements

- Improve the plugin's **main feature**: automatic RTL detection and direction
  application for Hebrew/Arabic content in Blinko notes
- Review the **last 5 pull requests** and fold them into the plan

## The main feature — code path

```
src/index.tsx            SystemJS entry; builds RTLDetector + RTLService,
                         registers toolbar icon, right-click menus, global
                         window.blinkoRTL API
  └── RTLDetector        src/utils/rtlDetector.ts (91 lines)
        ├── CharacterCodeStrategy   charCode range scan over a 100-char sample
        ├── RegexStrategy           regex match over the whole string
        └── CombinedStrategy        OR of the two
  └── RTLService         src/services/rtlService.ts (805 lines) — the real core
        ├── processElement()        text → direction → DOM mutation
        ├── processAllElements()    combined querySelectorAll over 57 selectors
        ├── setupObserver()         MutationObserver on document.body
        ├── startAutoProcessing()   setInterval poll, default 5000ms
        └── 4 application methods:  direct | attributes | css | unicode | all
  └── PasteInterceptor   src/utils/pasteInterceptor.ts — mixed-content paste toast
```

Secondary surfaces (explicitly out of scope): `aiPostService`, `uiuxService`,
`setting.tsx` (2626 lines of settings UI + CSS presets).

---

## Research Findings

### Environment / test baseline

**F-01 — The failing test suite was a local setup artifact, not a code defect.**
First run showed 36 pass / 11 fail with `Cannot find module
'@happy-dom/global-registrator'` and `'preact/jsx-dev-runtime'`. `node_modules/`
was empty. After `bun install` (252 packages): **114 pass / 8 skip / 1 fail /
204 assertions across 18 files, 1.56s.** Always install before judging this repo.

**F-02 — `tests/renderer.test.ts` is dead code and is the only real failure.**
It imports `DOMRTLRenderer` from `../src/renderer` and `RTLConfig` from
`../src/config`. Neither file exists anywhere in `src/`. The test has been
failing for however long those modules have been gone. *Severity: low impact,
high noise — it makes "is the suite green?" unanswerable at a glance.*

Also skipped and unaddressed:
- `tests/utils/rtlProcessor.test.ts:33` — `describe.skip("RTLProcessor")`
- `tests/integration/service.test.ts:65` — `it.skip("removes debug visual classes when debug mode is disabled")`

### Detection engine — correctness

**F-03 — `minRTLChars` means two different things.** *Severity: medium.*
- `rtlService.processElement` (`src/services/rtlService.ts:391`):
  `if (!text.trim() || text.length < this.settings.minRTLChars)` → minimum
  **total text length**
- `CharacterCodeStrategy.detect` (`:67`): `if (rtlCharCount < this.config.minRTLChars)` → minimum **count of RTL characters**
- `RegexStrategy.detect` (`:60`): same as CharacterCodeStrategy

One setting, wired to both meanings via `detector.updateConfig({ minRTLChars })`.
The default is `1` (`constants.ts:320`), which masks the conflict; raising it in
settings makes the two diverge immediately.

**F-04 — the two strategies normalise by different denominators.** *Severity: medium.*
- `CharacterCodeStrategy`: `rtlCharCount / totalSignificantChars`, where
  significant = non-whitespace, non-punctuation, **within the first 100 chars**
- `RegexStrategy`: `rtlCount / text.length` — raw length, whitespace included,
  **over the entire string**

Both are compared against the same `sensitivity` threshold (high 0.1 / medium
0.15 / low 0.4), so the configured sensitivity does not describe one behavior.
Whitespace in the denominator also means the same Hebrew sentence scores lower in
`RegexStrategy` than in `CharacterCodeStrategy` purely because it has spaces.

**F-05 — `CombinedStrategy` is a plain OR, so the looser strategy always wins.**
*Severity: medium.* `CombinedStrategy.detect` returns
`this.strategies.some(s => s.detect(text))` (`CombinedStrategy.ts:13`), and
`Combined` is the constructor default. Consequence: setting `sensitivity: 'low'`
(0.4) does not actually make detection conservative, because whichever strategy's
denominator happens to be more generous still fires.

**F-06 — RTL script coverage has real gaps.** *Severity: low-medium.*
`CharacterCodeStrategy.RTL_RANGES` covers Hebrew, Arabic, Syriac, Arabic
Supplement, Thaana, Arabic Extended-A, and the three presentation-form blocks.
Missing:

| Script | Range | Notes |
|---|---|---|
| N'Ko | U+07C0–07FF | RTL, West Africa |
| Samaritan | U+0800–083F | RTL |
| Mandaic | U+0840–085F | RTL |
| Syriac Supplement | U+0860–086F | RTL |
| Arabic Extended-B | U+0870–089F | RTL |
| Adlam | U+1E900–1E95F | astral — see F-07 |
| Arabic Math | U+1EE00–1EEFF | astral |

`RegexStrategy` has its own hardcoded pattern strings with the same gaps, listed
separately from `RTL_RANGES` — so the two can (and will) drift apart.

**F-07 — sampling is naive in two ways.** *Severity: low.*
`const sample = text.substring(0, this.config.sampleSize)` (`CharacterCodeStrategy.ts:51`)
- `substring` can split a surrogate pair at the boundary
- `char.charCodeAt(0)` inside `for (const char of sample)` returns the **high
  surrogate** for astral characters, so no astral RTL block can ever match —
  the mechanical reason Adlam is unreachable even if added to `RTL_RANGES`
- sampling only the head misclassifies a long note that opens in English and
  continues in Hebrew

### Application layer — correctness

**F-08 — `applyUnicodeBidiRTL` discards the direction it was computed for.**
*Severity: medium.* `rtlService.ts:353-356`:

```ts
private applyUnicodeBidiRTL(element: HTMLElement) {
  element.classList.add('rtl-auto');
  element.style.unicodeBidi = 'isolate';
}
```

`processElement` computes `direction` through the whole detection pipeline, then
for `method: 'unicode'` calls this with the element only. Three consequences:
LTR and neutral elements are treated identically to RTL; nothing is ever cleaned
up when content changes; and unlike the other three appliers it never calls
`applyDebugVisuals`, so **debug mode does nothing when `method` is `unicode`**.

**F-09 — `method: 'all'` does not apply all methods.** *Severity: low.*
`rtlService.ts:467-471` — the `all` case runs `applyCSSClassRTL` +
`applyAttributeRTL`, but not `applyDirectRTL`. Either the name or the behavior is
wrong.

**F-10 — the short-text early return ignores `settings.method`.**
*Severity: low.* `rtlService.ts:393` always calls
`applyCSSClassRTL(element, 'neutral')`. If the user selected `attributes`, a
previously-set `dir` attribute is never removed when text becomes short.

**F-13 — overlapping target selectors cause container/leaf conflicts.**
*Severity: medium.* `DEFAULT_TARGET_SELECTORS` (`constants.ts:227`, 57 entries)
lists `.markdown-body div`, `.markdown-body p`, and `.markdown-body span`
simultaneously, plus the same trio for `.vditor-reset`. `processElement` reads
`element.textContent`, which for a container is the concatenation of all
descendants. A note with one Hebrew paragraph and one English paragraph gives the
wrapping `div` a single blended direction, and then each `p` is processed again
with its own. Whichever wins is a function of DOM order, not intent.

### Performance & resource hygiene

**F-14 — the action log stores whole element text under the name `textPreview`.**
*Severity: low.* `rtlService.ts:68`: `textPreview: (element.textContent || '')` —
no truncation. `MAX_LOG_SIZE` is 50, and given F-13 those elements can be entire
note containers. Each entry is also broadcast via
`window.dispatchEvent(new CustomEvent('rtl-action-logged', ...))` on **every**
processed element while `enableActionLog` is on.

**F-15 — a 5-second full-DOM poll runs alongside the MutationObserver.**
*Severity: medium.* `startAutoProcessing` (`:787`) sets an interval at
`settings.processInterval || 5000` that calls `processAllElements()` — a
`querySelectorAll` over all 57 selectors across the whole document. Meanwhile
`setupObserver` (`:778`) already observes `document.body` with
`{childList, subtree, characterData, attributes}`. The in-code comment
("Less aggressive polling since we have a better observer now") suggests the poll
is a leftover rather than a deliberate belt-and-braces.

**F-16 — `injectBaseCSS` has no matching teardown.** *Severity: low.*
`baseStyleElement` is created in `injectBaseCSS` (`:197`) and is the only style
element `removeCSS()` (`:301`) does not remove, so `destroy()` leaves
`#blinko-rtl-base-styles` in `<head>`.

**Positive note — the editor-flicker fix should not be undone.** `setupObserver`
deliberately skips mutations inside a focused contenteditable/textarea, with a
comment explaining that Vditor rewrites the DOM on every keypress and
re-classifying caused visible LTR↔RTL flicker. Any Phase 5/6 rework must preserve
this.

---

## Pull request review (the last 5, plus the backlog they sit in)

**F-11 — the last 5 PRs are 2 distinct changes, tripled and doubled.**
All five are open, none merged, all authored by the Jules automation under
`Daniel-OS01`.

| PR | Date | Title | Files | Diff |
|---|---|---|---|---|
| #345 | 2026-07-31 | 🎨 Palette: Enhanced disabled state for delete preset button | `.jules/palette.md`, `src/setting.tsx` | +13/-6 |
| #344 | 2026-07-30 | ⚡ Bolt: Refactor RTL character detection algorithms for better performance | `rtlService.ts`, `pasteInterceptor.ts`, `CharacterCodeStrategy.ts` | +55/-18 |
| #343 | 2026-07-30 | 🎨 Palette: Enhance disabled button tooltips and screen reader accessibility | `.jules/palette.md`, `src/setting.tsx` | +35/-10 |
| #342 | 2026-07-29 | ⚡ Bolt: Optimize CharacterCodeStrategy detection loop | `.jules/bolt.md`, `CharacterCodeStrategy.ts` | +20/-24 |
| #341 | 2026-07-29 | 🎨 Palette: Enhance delete preset button accessibility and disabled state UX | `.jules/palette.md`, `src/setting.tsx` | +21/-5 |

Cluster A — **#341, #343, #345** are the same change: replace the native
`disabled` attribute on the preset Load/Delete buttons with `aria-disabled`, add
an `onClick` guard, a reason-specific `title` tooltip, `aria-label`, and
`aria-hidden` on the emoji. The stated rationale is sound (native `disabled`
swallows pointer events so tooltips never fire). #343 covers both Load and Delete;
#341 and #345 cover Delete only.

Cluster B — **#342, #344** are the same change: replace `.match()`/`.some()`/
`.substring()` with indexed `for` loops and `charCodeAt()` bounds checks. #342 is
scoped to `CharacterCodeStrategy` and claims a local 10,000-iteration benchmark of
~1450ms → ~430ms. #344 extends the same technique to `pasteInterceptor` and the
`rtlService` code-block ratio. **#344 supersedes #342.**

**F-12 — merge state.** All 5 are `MERGEABLE` / `CLEAN`, so nothing is blocked
technically. But #342, #343, #344, and #345 all carry `reviewDecision:
CHANGES_REQUESTED` (CodeRabbit); only #341 has no review decision. The blocker is
unaddressed review feedback, not conflicts.

**F-17 — the backlog is 30 open PRs of the same two themes.** *This is the single
biggest finding of the session.* Listing all open PRs shows a strictly alternating
⚡ Bolt / 🎨 Palette pattern at ~2 per day, unbroken from #306 (2026-07-10) to
#345 (2026-07-31), with **zero merged**. Sampled titles:

```
#340 ⚡ Bolt: Combine matching selectors in MutationObserver
#339 🎨 Palette: Improve accessibility ... icon-only preset delete button
#337 ⚡ Bolt: Optimize CharacterCodeStrategy loop parsing
#335 ⚡ Bolt: Optimize mixed content detection performance
#334 ⚡ Bolt: Optimize selector matching in MutationObserver
#331 ⚡ Bolt: Combine CSS selectors for faster DOM matching
#328 ⚡ Bolt: Optimize RTL CharacterCodeStrategy detection loop
#325 ⚡ Bolt: Optimize RTL Character Code Detection
#321 ⚡ Bolt: Optimize RTL character detection loops
...and ~15 more 🎨 Palette preset-button a11y PRs
```

Two observations worth acting on:
1. The bot keeps regenerating fixes for `CharacterCodeStrategy.detect`, the
   MutationObserver selector matching, and the preset buttons — the same three
   spots, because nothing ever merges, so the "problem" is never gone.
2. Some of this work is **already done**. `processAllElements` already combines
   selectors into one `querySelectorAll` with an individual-selector fallback
   (`rtlService.ts:483-510`), yet #340, #334, and #331 propose combining
   selectors. The bot is not reading current `main` accurately in every case.

---

**F-18 (added Phase 2) — Arabic-Indic digits are classified RTL.**
*Severity: judgment call.* `١٢٣٤٥` (U+0660–0669) sits inside the 0600–06FF
Arabic range, so a pure numeric string is detected as RTL. The Unicode bidi
class of these characters is **AN (Arabic Number)**, which does not establish
paragraph direction — unlike **R**/**AL**. Latin digits `12345` are correctly
neutral. Decide in Phase 4 whether to exclude AN/EN ranges from the RTL
character set; there is a reasonable argument either way.

---

## Phase 2 verification — findings confirmed by measurement

Probes run against the real implementation (31 text inputs × 3 sensitivities ×
3 strategies, plus a 5-method × 4-text DOM matrix). Results are now pinned in
`tests/detection-corpus.test.ts`.

| Finding | Confirmed by |
|---|---|
| F-03 | `"כן"` @ `minRTLChars: 5` → detector says RTL, service says neutral |
| F-04 | `"ש" + 20 spaces + "ל"` → CharacterCode true, Regex false @ low |
| F-05 | `"שלום עולם this is a test"` @ low → cc true, rx false, combined **true** |
| F-06 | Syriac + Thaana detected by CharacterCode but **not** Regex — the two script lists have already drifted. N'Ko, Samaritan, Mandaic, Syriac Supplement, Arabic Ext-B, Adlam undetected by both |
| F-07 | 145-char note turning Hebrew at char 120 → combined true @ high, false @ medium — an artifact of one strategy having a sample window and the other not |
| F-08 | `method: 'unicode'` produces byte-identical markup for Hebrew, English and digits; RTL→LTR never clears |
| F-09 | `method: 'all'` → class + `dir` set, inline `direction`/`text-align` empty |
| F-10 | Short-text path leaves `blinko-detected-rtl` + inline `direction: rtl` (direct) and `dir="rtl"` (attributes). Only `css` cleans up |
| F-13 | Wrapper `div` gets `rtl-force` from blended `textContent` while its own English `<p>` child gets `ltr-force` |
| F-14 | `textPreview` length 1000 for a 1000-char element — no truncation |
| F-16 | `#blinko-rtl-base-styles` still in `<head>` after `disable()` |

## Technical Decisions

| Decision | Rationale |
|---|---|
| D-01: Safety net before engine changes | The 204 existing assertions don't cover threshold semantics, so F-03/F-04/F-05 fixes would be unverifiable |
| D-02: Land the perf PR (Phase 3) before the perf phase (Phase 6) | Both touch `CharacterCodeStrategy.detect` and `detectMixedContent`; doing Phase 6 first guarantees a conflict across 30 open branches |
| D-03: Recommend #344 over #342 | #344 is a strict superset — same technique, three files instead of one |
| D-04: Recommend #345 over #341/#343 for the a11y cluster | Smallest diff of the three; but #343 is the only one covering the Load button too, so its extra scope may need porting |
| D-05: Any `minRTLChars` semantic change needs a `_settingsVersion` bump | `loadSettings` already implements a v1→v2 migration (`rtlService.ts:94-100`); silent meaning changes would alter behavior for existing installs |
| D-06: Treat "stop the PR firehose" as in-scope | 30 open PRs at 0% merge rate is a process defect that will re-bury any cleanup done here |

## Issues Encountered

| Issue | Resolution |
|---|---|
| 11 test failures on first run | `node_modules/` empty → `bun install` → 1 real failure remained |
| `ls`/`eza` output swallowed in this shell | Used explicit absolute paths and `find`/`gh --json` instead |

## Resources

- Repo: https://github.com/Daniel-OS01/blinko-rtl-support-plugin
- Open PR list: `gh pr list --state open --limit 40`
- Baseline command: `bun install && bun test`
- Unicode RTL blocks reference: Unicode bidirectional character types, `R` and
  `AL` classes
