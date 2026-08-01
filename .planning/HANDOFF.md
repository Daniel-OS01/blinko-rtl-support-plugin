# Handoff — Blinko RTL Support Plugin

**Written:** 2026-08-02 · **Repo state:** `main` @ v3.2.5 · **Tests:** 382 pass / 0 fail
**Live instance:** `https://blink.psy-tech.link` · **Deployed plugin:** check the banner (below)

This document exists because a live-app interaction bug has survived three fix
attempts. Read the **Open Problem** and **Anti-Patterns** sections before
writing any code — two of the three failures came from the same mistake.

---

## 1. The Open Problem

**Symptom (user's words):** *"Now it's opening in the correct window what I need,
but when I press outside the window, it stops working for part of the windows.
Previously it worked, now it's not working."*

So: clicking a note card **now correctly opens the editor** (fixed, v3.2.4).
Clicking **outside** that editor to dismiss it **works sometimes and not others**.

### What the recording proves

`.planning/recording.json` (88 steps, viewport 988×704). Decisive facts:

| Evidence | Meaning |
|---|---|
| Step 5 selector is `aria/[role="dialog"]` with xpath `//*[@id="vditor-edit"]/…` | **The editor is inside a HeroUI modal (`section[role="dialog"]`), NOT the z-[9999] detail overlay.** |
| 11 consecutive clicks on `body > div.fixed > div` (`/html/body/div[7]/div`) | The user hammering outside-click with no effect, then giving up and using the right-click context menu. |
| 4 clicks on `div:nth-of-type(7) > div.flex` (`/html/body/div[7]/div[2]`) interleaved with reopening the note | Clicking **this** element *did* dismiss it. |

`/html/body/div[7]` is the modal portal root with two children:
- `div[1]` — backdrop (`aria-hidden="true"`). **Clicking here does nothing.**
- `div[2].flex` — wrapper (`data-slot="wrapper"`, `fixed inset-0 z-50`). **Clicking here works.**

That asymmetry is almost certainly the "part of the windows" the user means.

### Why the last fix (#362) did not address it

PR #362 taught `applyTapOutsideClose` about the **detail overlay**
(`div.fixed.inset-0.z-[9999]`). The recording shows the editor is in the
**modal**, a different surface. #362 is not wrong — the detail overlay genuinely
had no outside-close — but it is **not the surface in play here**, so it could
not have fixed this report.

### The most likely cause (UNVERIFIED — verify before acting)

`src/services/uiuxService.ts` → `closeViaButtonOrEscape()` hunts for a close
control inside the overlay:

```ts
Array.from(scope.querySelectorAll('button, [class*="close"], [aria-label], [data-dismiss]'))
  .find(el => className.includes('close') || ariaLabel.includes('close') || el.hasAttribute('data-dismiss'))
```

The modal's actual close control, copied from the live DOM, is:

```html
<div class="cursor-pointer absolute md:top-[-12px] md:right-[-12px] top-[-20px]
            right-[calc(50%-17.5px)] bg-background border-2 border-border z-[2002]
            text-foreground p-2 rounded-full !w-[35px] !h-[35px] flex items-center
            justify-center shadow-lg" tabindex="0">
```

It is a **`div`**, has **no `aria-label`**, **no class containing "close"**, and
**no `data-dismiss`**. The finder cannot match it, so the code falls through to
dispatching a synthetic `Escape` on the modal — which may or may not be honoured
by react-aria.

**Do not fix this from the description alone. Verify it first** (§5).

### 2026-08-02 follow-up (v3.2.6 failed → pointer sequence)

v3.2.6 shipped a close path that called `HTMLElement.click()` on the circular
close `div` and returned without verifying. HeroUI/react-aria listen on
`pointerdown`/`pointerup`, so `.click()` alone is a silent no-op. Live was also
still serving **v3.2.4** after the release. The hardened path uses
`activate()` (`pointerdown → mousedown → pointerup → mouseup → click`), prefers
the recording-proven wrapper, and verifies between rungs.

New recording: `.planning/recording.json` (189 steps, 00:58) — same backdrop
fail / wrapper success asymmetry; single-tap path closes via header `button`.

---

## 2. Anti-Patterns — the mistakes already made here

Three separate bugs in this codebase share one root cause, and two of them were
introduced by an AI assistant during this work.

### 2.1 Inventing selectors instead of reading the app

| Where | Invented selector | Reality |
|---|---|---|
| `applySingleTap` (pre-existing) | `note-card`, `blinko-card`, `blinko-note`, `note-item` | **All four occur 0 times** in the app. The real marker is `group/card`. |
| `applyTapOutsideClose` (pre-existing) | `editor-container`, `note-editor`, `blinko-editor`, `dialog-content`, `modal-content` | **Only `modal-content` exists** (HeroUI). |
| PR #356 (introduced during this work) | `dblclick` on the card | Nothing is bound to the card. |

**Rule: read the class name out of `.planning/html-and-dev.html` or the app
bundle before using it in a selector. Never guess a name that "sounds right".**

### 2.2 Tests that pass because the fixture is invented too

`tests/services/uiuxService.test.ts` built its own `note-card` element — a class
the app never emits — so the single-tap suite was green while the feature was
completely inert in production for an unknown length of time.

**Rule: every new regression test must be run against the *unfixed* code and
observed to fail.** This is now done consistently — see any recent commit
message for the "verified discriminating: N of M fail" line.

A third instance: `tests/components/app.test.tsx` dispatched only `change` on a
slider. `src/index.tsx` imports `preact/compat`, which remaps `onChange` to the
`input` event, so the test passed only because compat had not been loaded in
that test process — never because it matched production.

### 2.3 Assuming deployment

An entire round was spent debugging a build that was never installed. The live
bundle was v3.2.2 while `main` was v3.2.3.

**Rule: the plugin logs a banner on init. Check it first, every time.**

```
[blinko-rtl] v3.2.5 ready  { singleTapOpenNote: true, cardClickOpensEditor: true, rtlEnabled: true }
```

**Releases are NOT automatic.** `.github/workflows/release.yml` triggers only on
`workflow_dispatch` or a `v*` tag push. Merging to `main` publishes nothing:

```bash
gh workflow run "Release Pipeline" --ref main -f version=patch
```

Then verify the published artifact, not your local build:

```bash
curl -sL https://github.com/Daniel-OS01/blinko-rtl-support-plugin/releases/download/vX.Y.Z/index.js \
  | grep -c 'your-marker-string'
```

---

## 3. How Blinko Actually Works (read from the app bundle)

Source: `https://blink.psy-tech.link/assets/index-xZ6CcJO7.js` (~5.4 MB, readable
unauthenticated). Everything below was extracted from it, not inferred.

### 3.1 The plugin API — largely unused, and the biggest opportunity

```js
window.Blinko = {
  api,                        // ← the app's own AUTHENTICATED tRPC client
  copyToClipboard, eventBus, i18n, toast, version: "1.0.0",
  store: { StorageState, PromiseState, PromisePageState,
           blinkoStore, baseStore, hubStore, resourceStore, userStore },
  globalRefresh: () => { blinkoStore.updateTicker++ },
  addToolBarIcon, addRightClickMenu, addAiWritePrompt,
  showDialog, closeDialog, closeToolBarContent,
  addCardFooterSlot, addEditorFooterSlot,
  getEditorMetadata, setEditorMetadata, getActiveEditorStore,
}
```

`blinkoStore` holds `curSelectedNote`, `noteDetail`, `upsertNote`, `updateTicker`.

**The plugin hand-rolls `fetch` against `/api/trpc/...` while the host hands it an
authenticated client.** Routing `aiPostService` through `window.Blinko.api` is
very likely the real fix for the AI 401s and would delete a lot of protocol code.
Not yet attempted.

### 3.2 Auth

The app's tRPC link builds its header from a store persisted to
**`localStorage["token"]`** (the key it clears on logout):

```js
const e6 = () => { const t = ce.Get(vi).token; return t ? {Authorization:`Bearer ${t}`} : {} }
```

`aiPostService.getBlinkoAuthToken()` already reads this, falling back to a token
configured in the plugin panel.

### 3.3 tRPC wire protocol

- **Batched only.** An unbatched call is rejected: `400 "Streaming requests must be batched (you can do a batch of 1)"`.
- URL `POST /api/trpc/<proc>?batch=1`, body `{"0":{"json":{…}}}`, response `[{result|error}]`.
- `trpc-accept: application/jsonl` makes the server return **HTTP 200 even for failures**, with the error inside the stream body, and it labels that body `application/json` although it is newline-delimited. Send it **only** for streaming procedures.
- A missing procedure returns **404** ("No procedure found on path"); an existing-but-unauthorized one returns **401**. Use this to probe.
- Confirmed to exist: `ai.autoTag`, `ai.writing`, `ai.completions`, `notes.upsert`, `notes.list`, `notes.detail`, `config.list`.
- Confirmed **not** to exist: `note.upsert` (it is `notes.upsert`), `/api/v1/ai/*` (no REST AI endpoints at all).
- REST `note/list` is **POST-only**; a GET returns 404 even for a correct base URL.

### 3.4 The two editor surfaces — get this right

**A. HeroUI modal (z-50)** ← *this is where the editor opens after a card click*

```
body > div[7]                      portal root
  ├── div[1]                       backdrop, aria-hidden="true"   ← clicks here do NOTHING
  └── div[2].flex[data-slot=wrapper]  fixed inset-0 z-50          ← clicks here DO dismiss
        └── section[role="dialog"] …class ends with "modal-content"
              └── div#global-editor.h-full.flex.flex-col
                    └── div#vditor-edit
```

The close control is the unlabelled `div` shown in §1.

**B. Full-screen detail overlay (z-9999)** ← read-only preview, `#362` handles this

```js
div({className:"fixed inset-0 z-[9999] bg-background overflow-hidden",
     onPointerDownCapture: C => c.current && !c.current.contains(C.target) && C.stopPropagation(),
  children: div({className:"h-full flex",
    children: div({ref:c, className:"w-full mx-auto h-full flex flex-col px-4",
                   onClick: C => C.stopPropagation(),
      children:[ n && div({className:"flex items-center justify-between …",
                   children:[ Button({onPress:f, …icon "tabler:arrow-left"}) ]}),   // close
                 l==="preview" ? div({className:"flex-1 overflow-y-auto min-h-0 py-4",
                                      onDoubleClick:d, …})                          // preview→edit
                               : /* edit mode */ ]})})})
```

- `l` = `"preview" | "edit"`, `u` = its setter, `f` = close, `d` = preview→edit, `h` = edit→preview.
- The header (`n`) renders **only on the wide layout**. Narrow has no back button.
- Escape handling: `if (key==="Escape") { if (l==="edit") { u("preview"); return } f() }` — so **Escape from edit mode does not close, it steps back to preview**.

---

## 4. What the Plugin Currently Does

### Files that matter

| File | Role |
|---|---|
| `src/services/blinkoDom.ts` | **Single source of truth for Blinko DOM selectors.** All new selectors belong here, documented against captured markup, covered by `tests/services/blinkoDom.test.ts`. |
| `src/services/uiuxService.ts` | Single-tap open, tap-outside close, back button, AI-401 fetch interceptor, accessibility/layout CSS toggles. |
| `src/services/aiPostService.ts` | AI menu actions + REST/tRPC calls. Contains `resolveBlinkoBaseUrl`, `getBlinkoAuthToken`, `testConnection`. |
| `src/services/rtlService.ts` | The core RTL feature. **Do not touch `setupObserver`'s editable-element guard** — it is what stops LTR↔RTL flicker while typing. |
| `src/utils/strategies/rtlRanges.ts` | Single source of truth for RTL ranges, sampling and thresholds. |
| `tests/detection-corpus.test.ts` | The behavioural contract for detection. INVARIANT cases must never change; CHARACTERIZATION cases flip deliberately, one finding per commit. |

### Current card-click flow (v3.2.5)

1. `applySingleTap` attaches a click handler to every `[class*="group/card"]`.
2. On a non-interactive click, `openEditorWhenDetailAppears()` starts polling on
   animation frames (1.5 s budget) for the **detail overlay's** preview pane and
   dispatches `dblclick` on it.
3. The card's own click continues, which is what actually opens a surface.

⚠️ **Note the inconsistency:** step 2 targets the *detail overlay*, but the
recording shows a card click lands in the *modal*. The editor does open
correctly now, so something in this chain works — **but the mechanism is not
fully understood.** Establish which branch actually fires before building on it.

---

## 5. Do This First — Diagnostics, Not Fixes

Run these in the browser console on the live app. **Do not write code until you
have their output.**

```js
// 0. Which build is running? If not the one you just shipped, stop.
//    (look for the [blinko-rtl] banner on page load)

// 1. Which surface does a card click actually open?
document.querySelectorAll('[class*="group/card"]').length        // cards found
document.querySelectorAll('[data-single-tap="true"]').length     // handler attached
// …now click a note, then:
!!document.querySelector('section[role="dialog"]')               // modal?
!!document.querySelector('.fixed.inset-0[class*="z-[9999]"]')    // detail overlay?
!!document.getElementById('global-editor')                       // editor mounted?

// 2. With the editor open — what is the portal structure?
const portal = document.getElementById('global-editor')
  .closest('body > div');
console.log(portal.outerHTML.slice(0, 400));
[...portal.children].forEach((c, i) =>
  console.log(i, c.className, getComputedStyle(c).pointerEvents, c.getAttribute('aria-hidden')));

// 3. Does the modal dismiss itself, or is the plugin doing it?
//    Turn OFF "Tap Outside Closes Note" in plugin settings, then click outside.
//    - Still closes  → HeroUI is dismissable; the plugin should stay out of the way.
//    - Does not close → the plugin must handle it.

// 4. Does a synthetic Escape close it?
document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}));

// 5. What is the real close control?
const modal = document.querySelector('[class*="modal-content"]');
[...modal.querySelectorAll('*')]
  .filter(el => /close|dismiss/i.test(el.className + el.getAttribute('aria-label')))
  .forEach(el => console.log(el.tagName, el.className));
```

### Then, and only then

- If HeroUI is dismissable → the plugin's `applyTapOutsideClose` should **skip
  the modal entirely** rather than competing with it.
- If it is not → find the close control by **position/structure** (the `div` with
  `cursor-pointer` + `rounded-full` + `z-[2002]` in the modal), or click the
  wrapper `[data-slot="wrapper"]` which the recording shows already works.
- Add the selector to `blinkoDom.ts`, not inline.
- Write the regression test, **run it against the unfixed code, confirm it fails.**

---

## 6. Other Known Issues

| Issue | Status |
|---|---|
| **Blinko session unauthenticated** — `users.detail` and `plugin.getPluginCssContents` both 401 | **Not a plugin bug.** The app's own calls fail. The second one means the plugin's CSS never loads, so RTL styling is degraded regardless. User must unregister the service worker (`registerSW.js` serves cached notes while every API call 401s) and sign in again. |
| `Cannot use 'in' operator to search for 'x' in undefined` at `ft`/`vn.handleMove` | **Not the plugin.** `assets/index-BPoFX5wM.js` is @dnd-kit; `"x" in t` with an undefined activation constraint. Blinko core. |
| `github-dark.min.css` 404, `page-wrap`/`outer-container` not found | Blinko's own assets / burger menu. |
| AI auto-tag / rerun still 401 | Blocked on the session above. **Next step: route through `window.Blinko.api`** (§3.1) instead of hand-rolled fetch. |
| `README_he.md` stale | English README updated; Hebrew not. |
| `minRTLChars` settings inputs unguarded | `parseBoundedInt` is exported from `setting.tsx` and used for `minTextLength`; the `minRTLChars` inputs still call bare `parseInt` and can persist `NaN`. |
| 36 uiuxService NodeList PRs closed | Closed **without** the optimisation applied. Needs one fresh PR if wanted. |
| Jules automation still running | Produces ~2 near-duplicate PRs/day. 201 were closed in this session; 9 are open again. |

---

## 7. Deferred UX Backlog

`.planning/fixing.md` has 35 audit items, triaged in
`docs/superpowers/plans/2026-08-01-blinko-card-interaction-and-ux-tab.md`:

- **8 already exist as settings** — but "the setting exists" and "the setting
  works" are different claims (see §2.1). Verify against real markup first.
- **12 require core-app PRs** — not addressable from a plugin.
- **15 are plugin-addressable and unbuilt**, grouped into four batches:
  card visuals · reading aids · shell · settings-form fixes.

---

## 8. Commands

```bash
bun install                 # required; an empty node_modules produces 11 phantom failures
bun test                    # ~2s, 382 tests
npx tsc --noEmit
bun run build               # dist/index_*.js + dist/style.css

gh workflow run "Release Pipeline" --ref main -f version=patch   # releases are MANUAL
```

Planning files live in `.planning/2026-08-01-rtl-core-improvement/`
(`task_plan.md`, `findings.md`, `progress.md`) — `findings.md` has the full
evidence log for the detection-engine work.

---

## 9. Summary for Whoever Picks This Up

The RTL detection engine is in good shape: one consistent set of semantics, a
383-case behavioural contract, and every change verified against a corpus. That
work is done and merged.

The **interaction** work is not. Card-click-opens-editor is fixed. Outside-click
-to-dismiss is not, and the last attempt aimed at the wrong surface because the
diagnosis came from a screenshot rather than from the recording.

The single highest-value habit for this codebase: **every selector and every
mechanism must be read out of the app — the captured DOM in
`.planning/html-and-dev.html`, the recording in `.planning/recording.json`, or
the bundle at `/assets/index-*.js` — never guessed.** Three bugs here came from
guessing, and each one produced a passing test suite and a feature that did
nothing.
