# Research Findings — Blinko RTL Support Plugin

> **Document type:** Forensic audit & root cause analysis
> **Scope:** UI/UX service defects (Issues 1–3) identified in v2.2.1
> **Branch:** `claude/blinko-ui-ux-enhancements-gfN4H`
> **Date:** 2026-03-24
> **Status:** Issues confirmed, remediated, and documented

---

## Table of Contents

1. [Investigation Methodology](#1-investigation-methodology)
2. [Codebase Architecture Overview](#2-codebase-architecture-overview)
3. [Issue 1 — Back Button Dysfunction](#3-issue-1--back-button--navigation-dysfunction)
4. [Issue 2 — Single-Tap Note Open Failure](#4-issue-2--single-tap-note-open-failure)
5. [Issue 3A — Dual Event Triggering](#5-issue-3a--dual-event-triggering)
6. [Issue 3B — Tag Positioning Malformation](#6-issue-3b--tag-positioning-malformation)
7. [Dependency Map Between Issues](#7-dependency-map-between-issues)
8. [Code Archaeology & Historical Context](#8-code-archaeology--historical-context)

---

## 1. Investigation Methodology

### Tools Employed
- **Static code analysis** — full read of `src/services/uiuxService.ts`, `src/assets/styles/Blinko-UIUX.css`, `src/types.ts`, and `src/setting.tsx`
- **Git log archaeology** — commit history review to trace introduction of each feature
- **DOM event model analysis** — MDN-level reasoning about `popstate` cancelability, `click()` synthetic event propagation, and CSS specificity cascade

### Scope of Audit
| File | Lines | Purpose |
|------|-------|---------|
| `src/services/uiuxService.ts` | 269 | All runtime behavior: listeners, history, DOM mutation |
| `src/assets/styles/Blinko-UIUX.css` | 266 | CSS enhancements toggled by body classes |
| `src/types.ts` | 127 | Type definitions incl. `UIUXSettings` |
| `src/setting.tsx` | ~1900 | Settings UI panel |

---

## 2. Codebase Architecture Overview

The plugin is a **Blinko web plugin** (TypeScript/Preact, built with Vite, running inside a browser-hosted web app). It is **not** a native Android application. The "Android back button" behavior is implemented via the **Web History API** (`history.pushState` + `popstate` event), which is what mobile browsers expose as the hardware back button on Android.

Key service: `UIUXService` in `src/services/uiuxService.ts`
- Called from `src/index.tsx` on plugin `init()` and `destroy()`
- Persists settings via `localStorage` key `blinko-uiux-settings`
- Applies all behavior through `apply()` → calls `applyBodyClasses()`, `applyCustomProperties()`, `applyDynamicStyles()`, `applySingleTap()`, `applyBackButton()`

---

## 3. Issue 1 — Back Button & Navigation Dysfunction

### 3.1 Primary Manifestation
Android hardware back button fails to close expanded notes.

### 3.2 Secondary Manifestation
Back button navigation becomes completely blocked during logout attempts, trapping users in the app.

### 3.3 Root Cause: `history.pushState` Accumulation (Critical)

**File:** `src/services/uiuxService.ts`
**Method:** `applyBackButton()` (originally lines 199–241)
**Defect type:** Unbounded history stack pollution

```typescript
// DEFECTIVE CODE — called on every apply()
history.pushState(null, '', window.location.href);   // ← unconditional, no guard
window.addEventListener('popstate', handler);
```

`applyBackButton()` is invoked by `apply()`, and `apply()` is called by `updateSettings()` every time any UI/UX setting changes. Each invocation unconditionally pushed a new dummy history entry. After `N` settings changes, the history stack contained `N` dummy entries.

**Effect:** The user had to press the back button `N` times to exhaust the plugin's synthetic entries before any real browser navigation (logout, previous page) could proceed. This was the "logout blocked" defect.

### 3.4 Secondary Defect: `e.preventDefault()` on Non-Cancelable Event

```typescript
// DEFECTIVE CODE — popstate is NOT cancelable
e.preventDefault();
```

`PopStateEvent` has `cancelable = false`. Calling `preventDefault()` on it is a no-op per the Web specification. The line was misleading (implying it prevented navigation) but did not contribute to functional failure. Removed for clarity.

### 3.5 Fix Applied

Added a private flag `backButtonInitialized: boolean` to the `UIUXService` class. The sentinel `history.pushState` is now guarded by this flag — it executes **exactly once** per enable-cycle, regardless of how many times `apply()` or `updateSettings()` is called.

The popstate handler now re-pushes the sentinel **only when an overlay is successfully found** (to protect the next back press). When no overlay is present, the popstate event proceeds naturally, enabling logout and back-navigation.

```typescript
// FIXED — sentinel pushed once only
if (!this.backButtonInitialized) {
  history.pushState({ blinkoPlugin: true }, '', window.location.href);
  this.backButtonInitialized = true;
}
```

The `backButtonCleanup` now also resets `backButtonInitialized = false` so the feature correctly re-initializes if re-enabled after being toggled off.

---

## 4. Issue 2 — Single-Tap Note Open Failure

### 4.1 Symptom
Tapping the text content region of a note card does not open the note.

### 4.2 Root Cause: `p` in Opener Selector + `target === openBtn` Dead-End

**File:** `src/services/uiuxService.ts`
**Method:** `applySingleTap()` → inner `handler` closure
**Defect type:** Selector design error creating logical dead-end

```typescript
// DEFECTIVE CODE
const openBtn = card.querySelector<HTMLElement>(
  '[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3, p'
  //                                                                  ↑ BUG
);
if (openBtn && openBtn !== target) {   // ← guard prevents action
  openBtn.click();
}
```

**Execution trace when user taps `<p>` text:**
1. `target` = `<p>` element (the tapped paragraph)
2. `openBtn` = first element matching the selector = the same `<p>` (since `p` is last in selector but is directly matched)
3. `openBtn !== target` → `false`
4. Handler returns without opening the note

The inclusion of `p` in the opener selector was intended as a fallback but created an irresolvable identity collision: when the user's target IS the paragraph, the selector finds the same paragraph as the opener, and the guard prevents the synthetic click.

Furthermore, calling `p.click()` as an opener would re-dispatch a click event that bubbles back to the card handler — creating potential infinite recursion — which the `openBtn !== target` guard was presumably meant to prevent. The guard solved the wrong problem (loop prevention) by introducing the reported defect (tap-on-text does nothing).

### 4.3 Fix Applied

Removed `p` from the opener selector. Paragraphs are **content**, not **openers**. When the user taps a paragraph:
- `openBtn` = first title/heading found in card (`h1`, `h2`, `h3`, or `[class*="title"]`)
- `openBtn !== target` → `true` (heading ≠ paragraph)
- `openBtn.click()` fires → note opens

When the user taps the title directly:
- `openBtn = target` → guard still holds → no synthetic click (native click already fired)

---

## 5. Issue 3A — Dual Event Triggering

### 5.1 Symptom
Single note press simultaneously activates both the note detail view AND the contextual menu overlay.

### 5.2 Root Cause: Synthetic Click Propagation Without Re-entry Guard

**File:** `src/services/uiuxService.ts`
**Method:** `applySingleTap()` → `handler` closure
**Defect type:** Synthetic event bubble causing multiple handler activations

When `openBtn.click()` is called:
1. A new synthetic `MouseEvent` is dispatched on `openBtn`
2. This event **bubbles up** through the DOM: `openBtn` → `card` → parent elements
3. The card has the single-tap handler registered → fires again (re-entry)
4. Any context menu handler registered on the card or its ancestors also receives the bubbled click
5. Result: note opens (from the first handler invocation) AND context menu opens (from the bubbled synthetic click reaching the context menu listener)

### 5.3 Fix Applied

A **re-entry guard** using `card.dataset.opening` is set before calling `openBtn.click()` and cleared via `requestAnimationFrame` after the event cycle completes:

```typescript
if (card.dataset.opening) return;        // block re-entry

card.dataset.opening = 'true';
openBtn.click();
requestAnimationFrame(() => { delete card.dataset.opening; });
```

`requestAnimationFrame` defers cleanup until after the current event processing microtask queue is flushed, ensuring the synthetic click's entire bubble phase completes before the guard is released. The data attribute approach is preferred over a closure-scoped boolean because it survives re-entrant calls from different event paths.

---

## 6. Issue 3B — Tag Positioning Malformation

### 6.1 Symptom
Note-associated tags render horizontally to the right margin instead of appearing in a vertical flow beneath note content.

### 6.2 Root Cause: Over-broad CSS Selector Overriding Tag Container Layout

**File:** `src/assets/styles/Blinko-UIUX.css`
**Section:** Rule block starting at line 44 (compact-datetime feature)
**Defect type:** Selector specificity overreach

```css
/* DEFECTIVE RULE */
.blinko-compact-datetime .card-masonry-grid [class*="flex"][class*="col"],
```

This selector matched **any** element within `.card-masonry-grid` whose class attribute contained both the substring `"flex"` and `"col"`. In the Blinko application (which uses Tailwind CSS), the tags container uses a class combination like `flex flex-col gap-1` or `flex flex-col items-start`.

The defective rule forced these properties:
```css
flex-direction: row !important;    /* overrides flex-col → tags go horizontal */
flex-wrap: nowrap !important;      /* prevents wrapping → tags overflow to right */
```

Combined effect: all tags rendered on a single non-wrapping horizontal row, overflowing to the right margin.

### 6.3 Fix Applied

The offending `.card-masonry-grid [class*="flex"][class*="col"]` selector was removed entirely and replaced with tightly-scoped selectors that target only the date/time metadata areas:

```css
/* FIXED — only targets metadata rows, not tag containers */
.blinko-compact-datetime [class*="note-card"] [class*="meta"],
.blinko-compact-datetime [class*="note-card"] [class*="header"],
.blinko-compact-datetime [class*="note-item"] [class*="time"],
.blinko-compact-datetime [class*="note-item"] [class*="date"],
.blinko-compact-datetime [class*="blinko-card"] [class*="footer"],
.blinko-compact-datetime [class*="blinko-card"] [class*="timestamp"]
```

These selectors require the element's class to contain `meta`, `header`, `time`, `date`, `footer`, or `timestamp` — substrings that reliably identify date/time rows, not tag containers.

---

## 7. Dependency Map Between Issues

```
Issue 2 (single-tap p selector)
    └──► Issue 3A (dual event trigger)
            Both fixed together in applySingleTap():
            - Remove p from selector  →  resolves Issue 2
            - Add dataset.opening guard  →  resolves Issue 3A

Issue 1 (back button)
    Independent — fixed separately in applyBackButton()

Issue 3B (tag CSS)
    Independent — fixed separately in Blinko-UIUX.css
```

Issues 2 and 3A are **causally linked** in the same method and were remediated in a single targeted edit. Issues 1 and 3B are independent and were remediated separately.

---

## 8. Code Archaeology & Historical Context

### Feature Introduction
The `UIUXService` class was introduced in commit `7334b19` ("feat: add comprehensive UI/UX Enhancement section to plugin settings"). The back button and single-tap features were novel additions with no prior implementation to reference.

### Design Intent vs. Defect
The `openBtn !== target` guard in `applySingleTap` was almost certainly added to prevent an infinite synthetic-click loop when `p` was in the opener selector. The intent was correct (prevent recursion) but the fix addressed the symptom instead of the root cause (wrong selector). Removing `p` from the selector eliminates the recursion risk and the guard becomes redundant for that purpose, while still correctly blocking re-entry from bubbled synthetic clicks.

The unconditional `history.pushState` in `applyBackButton` was likely intended as "always ensure a state exists to pop." The implementation was correct for a one-time initialization but was placed outside any initialization guard, causing it to run on every `apply()` call.

---

*Document version: 1.0 — Initial forensic audit*
*Next update: append Aloklok fork integration findings when cherry-pick analysis is complete*
