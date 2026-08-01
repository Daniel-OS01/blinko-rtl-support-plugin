# Blinko Card Interaction & UI/UX Tab Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make a single click anywhere on a Blinko note card open the editor, and remove the dead `📋 UX Audit` sub-tab from the plugin's UI/UX settings.

**Architecture:** The plugin's `UIUXService.applySingleTap()` already attaches click handlers to note cards, but its `CARD_SELECTOR` targets class names that do not exist in the shipped Blinko app, so the handler is attached to the wrong element (or to nothing). This plan corrects the selector against the real DOM, changes the synthesized action from "click the heading" (opens the read-only detail overlay) to "double-click the card" (opens `#global-editor`), and deletes the audit sub-tab from `setting.tsx`.

**Tech Stack:** TypeScript, Preact, Bun test + happy-dom, Vite.

## Global Constraints

- Runtime is Bun; the test command is `bun test`. Full suite must stay green (currently **359 pass / 0 fail / 0 skip**).
- `npx tsc --noEmit` must stay clean, and `bun run build` must succeed.
- No new runtime dependencies.
- Do not change the `window.blinkoRTL` public API surface.
- Do not touch the editor-flicker guard in `RTLService.setupObserver()` — it is what keeps typing Hebrew from flickering.
- Every new behaviour gets a setting that defaults to **on**, and every regression test must be verified to fail against the unfixed code before being accepted.

---

## Evidence This Plan Is Built On

Measured against `.planning/html-and-dev.html` (a 935 kB capture of the live app) and the current source. Do not re-litigate these; they are established:

| Claim | Evidence |
|---|---|
| The card selector matches nothing | `note-card` occurs **0** times in the capture. So do `blinko-card`, `blinko-note`, `note-item`. |
| The real card marker is `group/card` | Occurs **30** times, once per rendered card. |
| The fallback selector targets the wrong element | Real nesting is `.card-masonry-grid > div.card-masonry-grid_column > div.relative > div.relative > div.cursor-default! > div.menu-trigger > div > div…group/card`. `.card-masonry-grid > div > div` lands on `div.relative`, five levels above the card. |
| The tests pass for the wrong reason | `tests/services/uiuxService.test.ts:24` and `:402` set `card.className = 'note-card'` — a class the app never emits. The feature is unexercised against real markup. |
| Read-only detail view vs editor | Detail overlay: `div.fixed.inset-0.z-[9999] > div.h-full.flex > div.w-full.mx-auto.h-full.flex.flex-col.px-4`. Editor: `div#global-editor.h-full.flex.flex-col` containing `#vditor-edit`. |
| The audit sub-tab | `src/setting.tsx:1874` registers it; its body is lines **2289–2431**. |

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `src/services/blinkoDom.ts` | **New.** Single source of truth for Blinko's DOM contract — card selector, interactive-element selector, editor/detail-overlay detection. Keeps brittle class names in one auditable place. | Create |
| `src/services/uiuxService.ts` | Consumes `blinkoDom.ts`; opens the editor rather than the detail view. | Modify |
| `src/types.ts` | Add `cardClickOpensEditor` to `UIUXSettings`. | Modify |
| `src/setting.tsx` | Delete the `analysis` sub-tab; add the new Navigation toggle. | Modify |
| `tests/services/blinkoDom.test.ts` | **New.** Locks the selectors against real captured markup. | Create |
| `tests/services/uiuxService.test.ts` | Replace fake `note-card` fixtures with real markup. | Modify |

---

### Task 1: Remove the `📋 UX Audit` sub-tab

The tab renders a static, hand-maintained copy of an external analysis document. It is not a setting, it cannot be acted on from the panel, and it goes stale silently.

**Files:**
- Modify: `src/setting.tsx:1874` (sub-tab registration)
- Modify: `src/setting.tsx:2289-2431` (the panel body)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks rely on. The `uiuxSubTab` union type loses its `'analysis'` member.

- [ ] **Step 1: Confirm the exact block boundaries before deleting**

```bash
sed -n '1874p' src/setting.tsx
sed -n '2289p;2431p' src/setting.tsx
```

Expected output:
```
                { id: 'analysis',     label: '📋 UX Audit'     },
          {uiuxSubTab === 'analysis' && (
           )}
```

If the line numbers do not match, re-locate with `grep -n "uiuxSubTab === 'analysis'" src/setting.tsx` and use the actual bounds. Do not delete by line number blindly.

- [ ] **Step 2: Delete the sub-tab registration**

Remove this single line from the sub-tab array:

```tsx
                { id: 'analysis',     label: '📋 UX Audit'     },
```

- [ ] **Step 3: Delete the panel body**

Remove the whole `{uiuxSubTab === 'analysis' && ( … )}` block, from the line containing `{uiuxSubTab === 'analysis' && (` through its matching `)}`.

- [ ] **Step 4: Verify no dangling references**

```bash
grep -n "analysis" src/setting.tsx
```

Expected: no match for `uiuxSubTab === 'analysis'` and no match for `id: 'analysis'`. Unrelated words containing "analysis" in prose are fine.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean. If `uiuxSubTab` is typed as a union derived from the array, removing the member is enough; if there is a standalone `type UiuxSubTab = 'typography' | … | 'analysis'`, remove `'analysis'` from it too.

- [ ] **Step 6: Confirm the remaining tabs still render**

Run: `bun test tests/components/settings.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/setting.tsx
git commit -m "refactor: drop the UX Audit sub-tab from the UI/UX settings panel

It rendered a static, hand-maintained copy of an external analysis
document. Nothing in it is actionable from the settings panel and it goes
stale without any signal that it has."
```

---

### Task 2: Detect note cards using the class the app actually emits

This is the root cause of "I need to double press each of the notes". The handler that would turn one click into an open is attached to the wrong element, so the app's own double-click behaviour is the only thing left working.

**Files:**
- Create: `src/services/blinkoDom.ts`
- Modify: `src/services/uiuxService.ts:188-198` (the two selector constants)
- Create: `tests/services/blinkoDom.test.ts`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces, all from `src/services/blinkoDom.ts`:
  - `export const NOTE_CARD_SELECTOR: string`
  - `export const INTERACTIVE_SELECTOR: string`
  - `export function findNoteCard(el: HTMLElement | null): HTMLElement | null`
  - `export function isInteractiveTarget(card: HTMLElement, target: HTMLElement): boolean`

- [ ] **Step 1: Write the failing test**

Create `tests/services/blinkoDom.test.ts`:

```ts
/**
 * Locks the plugin's assumptions about Blinko's DOM to markup captured from
 * the running app (.planning/html-and-dev.html).
 *
 * The previous selector list — note-card, blinko-card, blinko-note, note-item —
 * matched nothing: none of those class names occur in the capture. The tests
 * that covered it built their own `note-card` fixture, so they passed while the
 * feature was inert in production.
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

import {
  NOTE_CARD_SELECTOR,
  findNoteCard,
  isInteractiveTarget,
} from '../../src/services/blinkoDom';

/** Class attribute copied verbatim from a rendered card in the capture. */
const REAL_CARD_CLASS =
  'relative overflow-hidden h-auto text-foreground box-border outline-solid ' +
  'outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 ' +
  'data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 ' +
  'shadow-none rounded-large transition-transform-background motion-reduce:transition-none ' +
  'flex flex-col p-4 bg-background !transition-all group/card hover:translate-y-1 undefined';

/** The real nesting: the card sits seven levels below the grid. */
function buildRealCard(): { card: HTMLElement; body: HTMLElement; deleteIcon: HTMLElement } {
  document.body.innerHTML = `
    <div class="card-masonry-grid">
      <div class="card-masonry-grid_column">
        <div class="relative">
          <div class="relative">
            <div class="cursor-default!">
              <div class="menu-trigger">
                <div>
                  <div class="${REAL_CARD_CLASS}" tabindex="-1">
                    <div class="w-full">
                      <div class="flex items-center select-none mb-1">
                        <div class="text-xs text-desc cursor-pointer">27 minutes ago</div>
                        <svg id="del" class="cursor-pointer hover:text-red-500 text-desc"></svg>
                      </div>
                      <div class="markdown-body">
                        <div data-markdown-theme="dark" class="markdown-body content">
                          <p id="body">testing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  return {
    card: document.querySelector<HTMLElement>('.group\\/card, [class*="group/card"]')!,
    body: document.getElementById('body') as HTMLElement,
    deleteIcon: document.getElementById('del') as HTMLElement,
  };
}

describe('NOTE_CARD_SELECTOR', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('matches a real rendered card', () => {
    buildRealCard();
    const matched = document.querySelectorAll(NOTE_CARD_SELECTOR);
    expect(matched.length).toBe(1);
    expect((matched[0] as HTMLElement).className).toContain('group/card');
  });

  it('matches the card itself, not an ancestor wrapper', () => {
    const { card } = buildRealCard();
    expect(document.querySelector(NOTE_CARD_SELECTOR)).toBe(card);
  });

  it('does not match the hover-state helper classes on descendants', () => {
    // Children carry `group-hover/card:opacity-100`, which must not be
    // mistaken for `group/card`.
    buildRealCard();
    expect(document.querySelectorAll(NOTE_CARD_SELECTOR).length).toBe(1);
  });

  it('matches nothing on an unrelated page', () => {
    document.body.innerHTML = '<div class="sidebar"><p>hello</p></div>';
    expect(document.querySelectorAll(NOTE_CARD_SELECTOR).length).toBe(0);
  });
});

describe('findNoteCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('walks up from a descendant to the card', () => {
    const { card, body } = buildRealCard();
    expect(findNoteCard(body)).toBe(card);
  });

  it('returns the card when given the card', () => {
    const { card } = buildRealCard();
    expect(findNoteCard(card)).toBe(card);
  });

  it('returns null outside any card', () => {
    buildRealCard();
    const outside = document.querySelector<HTMLElement>('.card-masonry-grid')!;
    expect(findNoteCard(outside)).toBeNull();
  });

  it('returns null for null', () => {
    expect(findNoteCard(null)).toBeNull();
  });
});

describe('isInteractiveTarget', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('treats an action icon inside the card as interactive', () => {
    const { card, deleteIcon } = buildRealCard();
    expect(isInteractiveTarget(card, deleteIcon)).toBe(true);
  });

  it('treats the note body as not interactive', () => {
    const { card, body } = buildRealCard();
    expect(isInteractiveTarget(card, body)).toBe(false);
  });

  it('ignores matches outside the card', () => {
    const { card } = buildRealCard();
    const stray = document.createElement('button');
    document.body.appendChild(stray);
    expect(isInteractiveTarget(card, stray)).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test tests/services/blinkoDom.test.ts`
Expected: FAIL — `Cannot find module '../../src/services/blinkoDom'`.

- [ ] **Step 3: Create the module**

Create `src/services/blinkoDom.ts`:

```ts
/**
 * Blinko's DOM contract, in one place.
 *
 * These selectors depend on class names the host app happens to emit, which is
 * inherently brittle — so they live together, are documented against captured
 * markup, and are covered by tests built from that markup rather than from
 * invented fixtures.
 *
 * The previous list (`note-card`, `blinko-card`, `blinko-note`, `note-item`)
 * matched nothing: none of those names occur anywhere in the shipped app. The
 * `.card-masonry-grid > div > div` fallback resolved to a wrapper five levels
 * above the card.
 */

/**
 * A rendered note card.
 *
 * `group/card` is the Tailwind group marker the app puts on the card root, and
 * it is the only stable, card-specific token available. Descendants carry
 * `group-hover/card:…`, which does not contain the substring `group/card`, so
 * they do not collide.
 *
 * The legacy names are kept so a differently-skinned or older Blinko still
 * works; they cost nothing when absent.
 */
export const NOTE_CARD_SELECTOR =
  '[class*="group/card"], ' +
  '[class*="note-card"], [class*="blinko-card"], ' +
  '[class*="blinko-note"], [class*="note-item"]';

/**
 * Elements inside a card that own their own click behaviour — the action rail,
 * tags, menus and links. A click on one of these must be left alone.
 */
export const INTERACTIVE_SELECTOR =
  'button, a[href], input, textarea, select, svg, ' +
  '[role="button"], [role="menuitem"], [role="menu"], ' +
  '[data-slot="trigger"], [data-react-aria-pressable="true"], ' +
  '[class*="action"], [class*="toolbar"], [class*="menu"], ' +
  '[class*="tag"], [class*="more"], [class*="dropdown"]';

/** The note card containing `el`, or null when `el` is outside every card. */
export function findNoteCard(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null;
  return el.closest<HTMLElement>(NOTE_CARD_SELECTOR);
}

/**
 * True when `target` is an element that handles its own clicks.
 *
 * The match is scoped to descendants of `card` so that a class on `<body>` or a
 * root container cannot make every click look interactive.
 */
export function isInteractiveTarget(card: HTMLElement, target: HTMLElement): boolean {
  const match = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
  return !!match && card.contains(match);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bun test tests/services/blinkoDom.test.ts`
Expected: PASS, 11 tests.

- [ ] **Step 5: Point `uiuxService` at the shared module**

In `src/services/uiuxService.ts`, add to the imports at the top of the file:

```ts
import { NOTE_CARD_SELECTOR, INTERACTIVE_SELECTOR } from './blinkoDom';
```

Then, inside `applySingleTap()`, delete the two local constants:

```ts
    const CARD_SELECTOR =
      '[class*="note-card"], [class*="blinko-card"], ' +
      '[class*="blinko-note"], [class*="note-item"], ' +
      '.card-masonry-grid > div > div, ' +
      '.blog-masonry-grid > div > div';

    const IGNORE_SELECTOR =
      'button, a[href], input, textarea, select, ' +
      '[role="button"], [role="menuitem"], [role="menu"], ' +
      '[class*="action"], [class*="toolbar"], [class*="menu"], ' +
      '[class*="tag"], [class*="more"], [class*="dropdown"], [class*="icon"]';
```

and replace every later use of `CARD_SELECTOR` with `NOTE_CARD_SELECTOR` and of `IGNORE_SELECTOR` with `INTERACTIVE_SELECTOR`.

> Note: `[class*="icon"]` is deliberately dropped. It matched the plugin's own
> `blinko-custom-icons` body class and any element whose class merely contained
> "icon", which made large parts of a card look interactive. `svg` and
> `[data-slot="trigger"]` cover the real action rail precisely.

- [ ] **Step 6: Replace the invented fixture in the existing tests**

In `tests/services/uiuxService.test.ts`, the helper at line 24 and the test at line 402 build cards with `className = 'note-card'`. Change both to the real marker so the suite exercises what production emits:

```ts
card.className = 'group/card flex flex-col p-4 bg-background';
```

Leave every assertion as it is. The legacy `note-card` name still matches
`NOTE_CARD_SELECTOR`, so this is a strengthening change, not a compatibility one.

- [ ] **Step 7: Run the full suite**

Run: `bun test`
Expected: PASS, no failures. Existing single-tap tests must still pass with the real class name.

- [ ] **Step 8: Prove the test discriminates**

Temporarily revert `NOTE_CARD_SELECTOR` to the old value:

```ts
export const NOTE_CARD_SELECTOR =
  '[class*="note-card"], [class*="blinko-card"], ' +
  '[class*="blinko-note"], [class*="note-item"]';
```

Run: `bun test tests/services/blinkoDom.test.ts`
Expected: FAIL — the "matches a real rendered card" and "walks up from a descendant" cases must fail. If they pass, the test is not testing anything; fix the test before continuing.

Then restore the correct value and confirm PASS again.

- [ ] **Step 9: Commit**

```bash
git add src/services/blinkoDom.ts tests/services/blinkoDom.test.ts src/services/uiuxService.ts tests/services/uiuxService.test.ts
git commit -m "fix: detect note cards by the class the app actually emits

The single-tap handler looked for note-card / blinko-card / blinko-note /
note-item. None of those class names occur anywhere in the shipped app, and
the .card-masonry-grid > div > div fallback resolved to a wrapper five levels
above the card. The handler was attached to the wrong element, so the app's
own double-click was the only thing still opening a note.

The card root carries the Tailwind group marker group/card. Descendants carry
group-hover/card:..., which does not contain that substring, so they do not
collide.

The tests covered this with a hand-built note-card fixture, so they passed
while the feature was inert. They now use markup captured from the running
app."
```

---

### Task 3: Open the editor on a single click, not the read-only detail view

**Files:**
- Modify: `src/types.ts` (`UIUXSettings` + `DEFAULT_UIUX_SETTINGS`)
- Modify: `src/services/uiuxService.ts` (the click handler inside `applySingleTap()`)
- Modify: `src/setting.tsx` (Navigation sub-tab toggle)
- Modify: `tests/services/uiuxService.test.ts`

**Interfaces:**
- Consumes: `NOTE_CARD_SELECTOR`, `INTERACTIVE_SELECTOR`, `findNoteCard`, `isInteractiveTarget` from Task 2.
- Produces: `UIUXSettings.cardClickOpensEditor: boolean` (default `true`).

- [ ] **Step 1: Add the setting**

In `src/types.ts`, inside `interface UIUXSettings`, below `singleTapOpenNote`:

```ts
  /**
   * Open the editor when a card is clicked, instead of the read-only detail
   * overlay.
   *
   * Blinko opens `div.fixed.inset-0.z-[9999] > … > div.w-full.mx-auto.px-4`
   * (a read-only render) on a single click, and `#global-editor` on a double
   * click. Most clicks on a note are the start of an edit, so the double click
   * is the one worth having on the single click.
   */
  cardClickOpensEditor: boolean;
```

And in `DEFAULT_UIUX_SETTINGS`, below `singleTapOpenNote: true`:

```ts
  cardClickOpensEditor: true,
```

- [ ] **Step 2: Write the failing test**

Append to `tests/services/uiuxService.test.ts`:

```ts
describe('UIUXService — card click opens the editor', () => {
  let service: UIUXService;

  /** A card matching the real app's markup. */
  function makeCard(): { card: HTMLElement; body: HTMLElement; icon: HTMLElement } {
    const card = document.createElement('div');
    card.className = 'group/card flex flex-col p-4 bg-background';
    card.innerHTML =
      '<div class="w-full">' +
      '<svg id="icon" class="cursor-pointer text-desc"></svg>' +
      '<div class="markdown-body"><p id="body">testing</p></div>' +
      '</div>';
    document.body.appendChild(card);
    return {
      card,
      body: card.querySelector('#body') as HTMLElement,
      icon: card.querySelector('#icon') as HTMLElement,
    };
  }

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('turns a single click on the body into a double click on the card', () => {
    const { card, body } = makeCard();
    let dblclicks = 0;
    card.addEventListener('dblclick', () => { dblclicks++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(dblclicks).toBe(1);
  });

  it('does not fire on the action rail', () => {
    const { card, icon } = makeCard();
    let dblclicks = 0;
    card.addEventListener('dblclick', () => { dblclicks++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });
    icon.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(dblclicks).toBe(0);
  });

  it('does not re-enter when the synthetic event bubbles back', () => {
    const { card, body } = makeCard();
    let dblclicks = 0;
    card.addEventListener('dblclick', () => { dblclicks++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Two real clicks, two opens — never more.
    expect(dblclicks).toBeLessThanOrEqual(2);
  });

  it('falls back to the old heading-click behaviour when disabled', () => {
    const { card, body } = makeCard();
    const heading = document.createElement('h2');
    heading.textContent = 'Title';
    card.appendChild(heading);

    let dblclicks = 0;
    let headingClicks = 0;
    card.addEventListener('dblclick', () => { dblclicks++; });
    heading.addEventListener('click', () => { headingClicks++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: false });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(dblclicks).toBe(0);
    expect(headingClicks).toBe(1);
  });

  it('does nothing at all when single-tap is off', () => {
    const { card, body } = makeCard();
    let dblclicks = 0;
    card.addEventListener('dblclick', () => { dblclicks++; });

    service.updateSettings({ singleTapOpenNote: false, cardClickOpensEditor: true });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(dblclicks).toBe(0);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `bun test tests/services/uiuxService.test.ts -t "card click opens the editor"`
Expected: FAIL — "turns a single click on the body into a double click" reports `0` received, because the handler currently clicks the heading or re-dispatches a plain `click`.

- [ ] **Step 4: Implement**

In `src/services/uiuxService.ts`, replace the body of the `handler` inside `applySingleTap()` — from the `// Find the element that navigates…` comment down to the closing `requestAnimationFrame(...)` — with:

```ts
          // Blinko opens the read-only detail overlay on a single click and
          // the editor on a double click. Synthesizing the double click makes
          // one click land where the user is almost always going.
          if (this.settings.cardClickOpensEditor) {
            card.dispatchEvent(
              new MouseEvent('dblclick', { bubbles: true, cancelable: true, composed: true })
            );
            requestAnimationFrame(() => { delete card.dataset.opening; });
            return;
          }

          // Legacy behaviour: click whatever navigates to the detail view.
          const opener =
            card.querySelector<HTMLElement>('h1, h2, h3, h4') ??
            card.querySelector<HTMLElement>(
              'a[href]:not([href="#"]):not([href^="javascript"])'
            );

          if (opener && opener.contains(target)) {
            // Tapped the opener directly — the native click already fired.
            requestAnimationFrame(() => { delete card.dataset.opening; });
            return;
          }

          if (opener) {
            opener.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          } else {
            card.dispatchEvent(
              new MouseEvent('click', { bubbles: true, cancelable: true, composed: true })
            );
          }

          requestAnimationFrame(() => { delete card.dataset.opening; });
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `bun test tests/services/uiuxService.test.ts`
Expected: PASS, including the five new cases and all 39 pre-existing ones.

- [ ] **Step 6: Add the settings toggle**

In `src/setting.tsx`, inside the `{uiuxSubTab === 'navigation' && (` block, add a toggle alongside the existing "Single-Tap" one, following the exact markup pattern of its neighbours:

```tsx
              {renderToggle(
                'cardClickOpensEditor',
                '✏️ Click Opens Editor',
                'Open the editor when a note is clicked, rather than the read-only view. Requires Single-Tap.'
              )}
```

If the surrounding block does not use a `renderToggle` helper, copy the JSX of
the adjacent `singleTapOpenNote` toggle verbatim and change the key, label and
description. Do not invent a new visual pattern for this one control.

- [ ] **Step 7: Typecheck and build**

Run: `npx tsc --noEmit && bun run build`
Expected: clean typecheck, successful build.

- [ ] **Step 8: Run the whole suite**

Run: `bun test`
Expected: PASS, 0 failures, 0 skips.

- [ ] **Step 9: Commit**

```bash
git add src/types.ts src/services/uiuxService.ts src/setting.tsx tests/services/uiuxService.test.ts
git commit -m "feat: open the editor on a single card click

Blinko opens the read-only detail overlay on a single click and the editor on
a double click, so every edit began with two clicks. The single-tap handler
now synthesizes the double click.

Controlled by cardClickOpensEditor (default on, under Navigation); turning it
off restores the previous open-the-detail-view behaviour."
```

---

### Task 4: Verify against the running app

Nothing above proves the behaviour in a browser. happy-dom does not run Blinko; it only proves the plugin dispatches what it intends to dispatch. **The mechanism — that a `dblclick` on the card is what opens `#global-editor` — is inferred from the user's report that a double press is currently required, and has not been confirmed against the app.**

**Files:** none — this is a manual gate.

- [ ] **Step 1: Build and install**

```bash
bun run build
```

Load the built plugin into the Blinko instance.

- [ ] **Step 2: Confirm the selector matches at runtime**

In the browser console, on the note list:

```js
document.querySelectorAll('[class*="group/card"]').length
document.querySelectorAll('[data-single-tap="true"]').length
```

Expected: both non-zero and equal. If the first is non-zero and the second is
zero, `applySingleTap` is not running — check that Single-Tap is enabled.

- [ ] **Step 3: Confirm the click opens the editor**

Click once on the body of a Blinko-type note. Expected: `#global-editor` appears.

```js
!!document.getElementById('global-editor')   // true
```

- [ ] **Step 4: If the editor does not open, capture the real mechanism**

The `dblclick` assumption is wrong. Find what actually opens the editor:

```js
const card = document.querySelector('[class*="group/card"]');
for (const type of ['click','dblclick','pointerdown','mousedown','contextmenu']) {
  card.addEventListener(type, e => console.log('EVENT', type, e.target), true);
}
```

Double-click a note, read which events fire in what order, and report them.
**Stop and revise Task 3 rather than trying further guesses** — this is the
third-fix boundary from systematic-debugging.

- [ ] **Step 5: Confirm the action rail still works**

Click the delete, copy, share and "…" icons on a card. Expected: each performs
its own action, and no editor opens.

- [ ] **Step 6: Confirm articles too**

Click an Article-type note. Expected: the editor opens, not
`div.w-full.mx-auto.h-full.flex.flex-col.px-4`.

- [ ] **Step 7: Record the outcome**

Append the results to `.planning/2026-08-01-rtl-core-improvement/progress.md`
under a new session entry, including anything that did not behave as planned.

---

## Deferred — Recommended as a Separate Plan

`.planning/fixing.md` carries 35 items. This plan deliberately covers only the
two the user named plus the root-cause fix underneath them, because each of the
remaining items is independently testable and shippable and would otherwise be
buried behind an unrelated interaction change.

**Already shipped as settings** — audit items 1–8 of the "Original 15" map onto
existing `UIUXSettings` toggles (`compactDatetime`, `singleTapOpenNote`,
`backButtonClosesNote`, `minTouchTargets`, `reduceMotion`, `compactMode`,
`cardBorderRadius`, `focusIndicators`). Worth verifying they work against real
markup — Task 2 shows that "the setting exists" and "the setting does anything"
are different claims.

**Core-app changes, not addressable from a plugin** — Original 15 items 9–15,
and Extended items 7, 12, 13, 15, 16.

**Plugin-addressable, not yet built** — a follow-up plan should cover these,
grouped by cohesion rather than by the audit's numbering:

| Group | Items | Complexity |
|---|---|---|
| Card visuals | mobile delete-icon opacity, image spinner after load, pinned-note badge, tag contrast on custom themes, tag hierarchy indentation | Low, CSS only |
| Reading aids | reading-time badge, in-note heading outline/TOC, search-term highlighting | Medium, JS |
| Shell | offline indicator, empty-state CTA, keyboard shortcuts, OLED-black theme, font-stack normalisation | Low–Medium |
| Settings form | custom icon label overlap, AI settings switch/select layout | Low, CSS only |

---

## Self-Review

**Spec coverage**

| Requirement | Task |
|---|---|
| Remove `📋 UX Audit` from the UI/UX tab | Task 1 |
| Single click anywhere on a card opens the editor | Tasks 2 + 3 |
| Pressing a Blinko article opens `#global-editor`, not `div.w-full.mx-auto…px-4` | Task 3, verified in Task 4 step 6 |
| "Improve all UX/UI features" | Partially — triaged in **Deferred**, with a recommendation to split. Not silently dropped. |

**Placeholders:** none. Every code step carries the code; every test step carries
the test; every run step names the command and the expected result.

**Type consistency:** `cardClickOpensEditor` is used identically in `types.ts`,
`uiuxService.ts`, `setting.tsx` and the tests. `NOTE_CARD_SELECTOR` /
`INTERACTIVE_SELECTOR` / `findNoteCard` / `isInteractiveTarget` are declared in
Task 2's Interfaces block and consumed under those exact names in Task 3.

**Known weakness:** Task 3 rests on an unverified assumption about how Blinko
opens its editor. Task 4 exists to falsify it early, and step 4 routes a failure
back to a plan revision rather than to another guess.
