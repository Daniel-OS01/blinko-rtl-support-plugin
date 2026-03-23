# Blinko RTL Support Plugin — Comprehensive Fixing Plan

## Overview

After a full audit of every source file, 12 distinct bugs were found ranging from critical (plugin never activates) to low (orphan dead files). This plan documents each bug with its root cause, affected files, and the exact fix to apply.

---

## CRITICAL Bugs (Plugin Does Not Work)

### Bug 1 — Auto-enable key mismatch: plugin never re-enables after reload

**Files:** `src/index.tsx:82`

**Root Cause:** `initializeRTLPlugin()` checks `localStorage.getItem('blinko-rtl-enabled')` to decide whether to call `rtlService.enable()` on startup. This key is **never written anywhere** in the codebase. The `StorageManager` saves the complete settings object under `'blinko-rtl-settings'` (or a user-scoped variant), not a separate boolean key. Result: the plugin always starts in the disabled state regardless of the user's saved preference.

**Fix:** Replace the stale-key check with a read from the service's own settings:
```typescript
// index.tsx — inside initializeRTLPlugin()
// BEFORE (broken):
const savedState = localStorage.getItem('blinko-rtl-enabled');
if (savedState === 'true') {
  rtlService.enable();
}

// AFTER:
if (rtlService.getSettings().enabled) {
  rtlService.enable();
}
```

---

### Bug 2 — `advancedRTLCSS` imported but never injected

**Files:** `src/services/rtlService.ts:3`, `src/services/constants.ts:3-122`

**Root Cause:** `advancedRTLCSS` is imported in `rtlService.ts` but **never used**. This string contains:
- `.rtl-toggle-btn` CSS (button is rendered but completely unstyled)
- Layout preservation rules (`.flex`, `.grid`, `header`, etc. protected to LTR)
- `.rtl-settings-dark` panel styles
- `.rtl-auto` class definition

Without this injection, the floating toggle button appears as an invisible/unstyled DOM element, and the layout protection is absent.

**Fix:** Inject `advancedRTLCSS` as a permanent static `<style>` element at plugin load time (independent of enable/disable state, since layout protection should always apply):

Add a new `injectBaseCSS()` method to `RTLService`, call it from `index.tsx` at startup.

---

### Bug 3 — `enable()`/`disable()` do not persist the enabled state

**Files:** `src/services/rtlService.ts:489-529`

**Root Cause:** `enable()` sets `this.isRTLEnabled = true` and `disable()` sets it to `false`, but neither updates `this.settings.enabled` nor calls `this.storageManager.save()`. On the next page load, `settings.enabled` is still whatever was last saved (defaults to `true` from `DEFAULT_SETTINGS`), but the runtime `isRTLEnabled` is always reset to `false`. Combined with Bug 1's wrong key, the user's toggle preference is never remembered.

**Fix:** Add `this.settings.enabled = true/false` and `this.storageManager.save(this.settings)` at the top of `enable()` and `disable()`.

---

### Bug 4 — `loadSettings()` reads `enabled: true` from storage but never calls `enable()`

**Files:** `src/services/rtlService.ts:82-117`

**Root Cause:** `loadSettings()` merges stored settings (which may have `enabled: true`) into `this.settings`, but it never triggers the enable lifecycle. The fix for Bug 1 in `index.tsx` is the correct place to resolve this — after `rtlService` is constructed and settings are loaded, check `getSettings().enabled` and call `enable()`. No change needed in `loadSettings()` itself.

---

## HIGH Bugs (Major Features Broken)

### Bug 5 — `enableManualToggleBtn` not in `RTLSettings` interface

**Files:** `src/index.tsx:31`, `src/index.tsx:92-95`, `src/types.ts`

**Root Cause:** `index.tsx` reads `settings.enableManualToggleBtn` to decide whether to create the floating toggle button. This property is **absent from the `RTLSettings` interface** in `types.ts` and from `DEFAULT_SETTINGS` in `constants.ts`. TypeScript flags this as an error. At runtime the value is always `undefined`, so the condition `=== false` is never true — the button is always created regardless of settings.

**Fix:**
1. Add `enableManualToggleBtn?: boolean` to the `RTLSettings` interface in `src/types.ts`
2. Add `enableManualToggleBtn: true` to `DEFAULT_SETTINGS` in `src/services/constants.ts`

---

### Bug 6 — Settings panel renders with wrong defaults (race condition)

**Files:** `src/setting.tsx:246-261`, `src/setting.tsx:204-235`

**Root Cause:** `RTLSetting` renders immediately when the toolbar panel opens. Its `useEffect` calls `window.blinkoRTL?.settings()` to load real settings, but `window.blinkoRTL` is assigned inside `initializeRTLPlugin()`, which runs after a 100ms `setTimeout`. If the settings panel opens quickly, `window.blinkoRTL` is `undefined` and `loadInitialSettings()` falls through silently, leaving the panel showing hard-coded local defaults — which disagree with `DEFAULT_SETTINGS` on several fields (see Bug 8).

**Fix:** Add a polling retry (mirroring what `app.tsx` already does for the same problem):
```typescript
const loadWithRetry = () => {
  const api = (window as any).blinkoRTL;
  if (api) {
    const s = typeof api.settings === 'function' ? api.settings() : api.getSettings?.();
    if (s) { setSettings(s); return true; }
  }
  return false;
};
if (!loadWithRetry()) {
  const interval = setInterval(() => {
    if (loadWithRetry()) clearInterval(interval);
  }, 100);
  setTimeout(() => clearInterval(interval), 3000);
}
```

---

### Bug 7 — Invalid CSS `p:has-text()` causes browser parse errors

**Files:** `src/services/constants.ts:29-33`

**Root Cause:** The `advancedRTLCSS` string contains:
```css
p:has-text(/[\u0590-\u05FF\u0600-\u06FF]/),
div:has-text(/[\u0590-\u05FF\u0600-\u06FF]/) {
    direction: rtl !important;
    text-align: right !important;
}
```
`p:has-text()` is a non-standard CSS selector from SiYuan/Notion-style apps. Browsers do not support it. When injected, browsers produce a CSS parse error and may silently discard adjacent valid rules.

**Fix:** Remove these 5 lines. RTL direction is handled by JavaScript (`processElement`), not CSS selectors — there is no gap in functionality.

---

## MEDIUM Bugs (Features Degraded)

### Bug 8 — `RTLSetting` initial local state disagrees with `DEFAULT_SETTINGS`

**Files:** `src/setting.tsx:204-235`, `src/services/constants.ts:272-310`

**Root Cause:** `RTLSetting` defines its own hard-coded initial state that differs from `DEFAULT_SETTINGS`:

| Field | RTLSetting default | DEFAULT_SETTINGS |
|---|---|---|
| `manualMode` | `true` | `false` |
| `customCSS` | `''` (empty string) | Has a default CSS block |
| `minRTLChars` | `3` | `2` |
| `processInterval` | `2000` | `1000` |

When Bug 6 occurs (settings panel opens before API is ready), the user sees the wrong defaults.

**Fix:** Replace the hard-coded `useState` initializer with a spread from `DEFAULT_SETTINGS` as the fallback.

---

### Bug 9 — Dark mode CSS has black text on dark background (unreadable)

**Files:** `src/services/constants.ts:83-114`

**Root Cause:** The `.rtl-settings-dark` section in `advancedRTLCSS` sets `color: #000 !important` on inputs, selects, buttons, headings, paragraphs, labels, code, and `small` elements. The background is `#1a1a1a` / `#333`. Black text on dark background is invisible.

**Fix:** Change all `color: #000 !important` occurrences to appropriate light values:
- Root `.rtl-settings-dark`: `color: #eee !important`
- Inputs/selects/textareas: `color: #ddd !important`
- Buttons: `color: #ddd !important`
- Headings, labels, p, span: `color: #eee !important`
- `code`: `color: #98c379 !important`
- `small`: `color: #aaa !important`

---

### Bug 10 — `processInterval: 1000ms` is too aggressive

**Files:** `src/services/constants.ts:293`

**Root Cause:** The auto-processing interval fires every 1 second when the plugin is enabled and `autoDetect` is true. With a `MutationObserver` already handling incremental DOM changes, this polling is redundant for most cases and creates unnecessary CPU load on content-heavy pages.

**Fix:** Change `DEFAULT_SETTINGS.processInterval` from `1000` to `5000`. The observer handles dynamic content; the interval is only a safety net for late-loaded elements.

---

## LOW Bugs (Minor/Cleanup)

### Bug 11 — `config.ts` and `renderer.ts` are unused orphan files

**Files:** `src/config.ts`, `src/renderer.ts`

**Root Cause:** These files implement a complete alternative RTL system (`RTLConfig`, `DOMRTLRenderer`) that was started but never imported or wired into the plugin. They add build bloat, create API confusion (two separate config systems), and mislead future developers.

**Fix:** Delete `src/config.ts` and `src/renderer.ts`.

---

### Bug 12 — `threshold` is optional but always accessed without null-guard

**Files:** `src/types.ts:19`, `src/app.tsx:44`, `src/setting.tsx`

**Root Cause:** `RTLSettings.threshold?: number` is typed as optional but `app.tsx` displays `Math.round(settings.threshold * 100)` — if `threshold` is `undefined`, this shows `NaN%`. The detector derives its threshold from `sensitivity` internally, so `threshold` in settings is a UI-only field that needs a guaranteed default.

**Fix:** Add `threshold: 0.15` to `DEFAULT_SETTINGS` in `constants.ts`.

---

## Implementation Order (Phase 1 — Completed)

| Step | Bug(s) Fixed | Files Changed | Status |
|---|---|---|---|
| 1 | Bug 7 | `src/services/constants.ts` — remove `p:has-text()` | ✅ Done |
| 2 | Bug 9 | `src/services/constants.ts` — fix dark mode colors | ✅ Done |
| 3 | Bug 5, 12 | `src/types.ts` + `src/services/constants.ts` — add missing fields | ✅ Done |
| 4 | Bug 10 | `src/services/constants.ts` — set `processInterval: 5000` | ✅ Done |
| 5 | Bug 2 | `src/services/rtlService.ts` — add `injectBaseCSS()` method | ✅ Done |
| 6 | Bug 3 | `src/services/rtlService.ts` — persist `enabled` in `enable()`/`disable()` | ✅ Done |
| 7 | Bug 1 | `src/index.tsx` — fix auto-enable check | ✅ Done |
| 8 | Bug 2 (call) | `src/index.tsx` — call `injectBaseCSS()` at startup | ✅ Done |
| 9 | Bug 8 | `src/setting.tsx` — use DEFAULT_SETTINGS for initial state | ✅ Done |
| 10 | Bug 6 | `src/setting.tsx` — add retry polling in `useEffect` | ✅ Done |
| 11 | Bug 11 | Delete `src/config.ts` and `src/renderer.ts` | ✅ Done |
| 12 | Build | `npm install && npm run build:prod` → clean production build | ✅ Done |

---

## Files Modified Summary (Phase 1)

| File | Type of Change |
|---|---|
| `src/services/constants.ts` | Remove invalid CSS; fix dark mode colors; add `enableManualToggleBtn`, `threshold` defaults; change `processInterval` to 5000 |
| `src/services/rtlService.ts` | Add `injectBaseCSS()` method + `baseStyleElement` field; persist `enabled` in `enable()`/`disable()` |
| `src/types.ts` | Add `enableManualToggleBtn?: boolean`; make `threshold` non-optional |
| `src/index.tsx` | Fix auto-enable check; call `injectBaseCSS()` at startup |
| `src/setting.tsx` | Use `DEFAULT_SETTINGS` for initial state; add retry polling in `useEffect` |
| `src/config.ts` | **DELETED** |
| `src/renderer.ts` | **DELETED** |

---

---

# Phase 2 — List RTL & Editor Mode Bugs (Discovered Through Live Testing)

## Compatibility Matrix (Observed Behaviour)

| Feature | Live Preview | WYSIWYG | Split View | Raw Markdown | Quick Preview |
|---|---|---|---|---|---|
| Numbered list RTL | ✅ Works | ✅ Works | ❌ Broken | ❌ Broken | — |
| Bullet list RTL | ❌ Broken | ❌ Broken | ❌ Broken | ❌ Broken | ❌ Broken |
| Task list RTL | ✅ Works | ✅ Works | ✅ Works | ❌ Broken | ⚠️ Layout broken |

---

## Bug 13 — Bullet list never applies RTL in any editor mode

**Files:** `src/assets/styles/Blinko-RTL.css:68-76`

**Root Cause:** The layout-protection block in `Blinko-RTL.css` contains:
```css
ul:not(.rtl-content),
li:not(.rtl-content),
nav, .sidebar, .navigation {
  direction: ltr !important;
  unicode-bidi: isolate !important;
}
```
This forces **all** `<ul>` and `<li>` elements to `direction: ltr !important` unless they carry the class `.rtl-content`. The plugin applies `.rtl-force` and `dir="rtl"` — neither matches `.rtl-content` — so every bullet list item remains LTR regardless of RTL detection, and both `!important` rules fight, with the static stylesheet winning because it matches a selector that is never excluded.

As confirmed in the image: bullet points appear on the **left** side and text flows left-to-right even when the content is Hebrew.

**Fix:** Extend the exclusion to also skip elements the plugin has already marked as RTL:
```css
/* Blinko-RTL.css — lines 68-69, change to: */
ul:not(.rtl-content):not(.rtl-force):not([dir="rtl"]),
li:not(.rtl-content):not(.rtl-force):not([dir="rtl"]),
```
This way, as soon as the plugin adds `.rtl-force` or `dir="rtl"` to a list or list item, the layout-protection rule stops matching and the RTL direction takes effect.

---

## Bug 14 — Task list items appear in a horizontal row in Quick Preview

**Files:** `src/assets/styles/Blinko-RTL.css`, `src/services/constants.ts` (`DEFAULT_DYNAMIC_CSS`)

**Root Cause:** Vditor renders task lists as `<ul class="vditor-task">` with flex-based internal layout. When the plugin applies `dir="rtl"` and `.rtl-force` to the `<ul>` container, Vditor's own CSS — which likely uses `display: flex` or similar — causes child items to align horizontally instead of stacking vertically. The quick preview panel is particularly vulnerable because it uses a condensed layout that doesn't have explicit `display: block` overrides on `li` elements.

As confirmed in the image: task list items (shown as bullets `•` on the left side of the card) are rendered side-by-side in a row.

**Fix:** Add an explicit override to `DEFAULT_DYNAMIC_CSS` in `src/services/constants.ts`:
```css
/* Task list layout preservation when RTL is applied */
ul.vditor-task.rtl-force,
ul.vditor-task[dir="rtl"],
[dir="rtl"] ul.vditor-task,
.rtl-force ul.vditor-task {
    display: block !important;
    flex-direction: unset !important;
}
ul.vditor-task.rtl-force > li,
ul.vditor-task[dir="rtl"] > li,
[dir="rtl"] ul.vditor-task > li {
    display: list-item !important;
    width: 100% !important;
}
```

---

## Bug 15 — Numbered and Bullet lists broken in Split View

**Files:** `src/services/constants.ts` (`DEFAULT_TARGET_SELECTORS`)

**Root Cause:** Vditor's Split View renders the live preview in a `.vditor-preview` wrapper div. The current `DEFAULT_TARGET_SELECTORS` covers `.vditor-reset li`, `.vditor-reset p`, etc., but Split View preview uses the path `.vditor-preview .vditor-reset ol`, `.vditor-preview .vditor-reset ul`, `.vditor-preview .vditor-reset li`. More importantly, the `ol` and `ul` container elements themselves are **not in the target selector list** — only `li` is listed. Without the container having RTL direction, the list markers (numbers, bullets) cannot move to the right side.

Additionally, Bug 13's CSS override (`ul:not(.rtl-content)`) applies in Split View exactly as in all other modes, so even when selectors match, the LTR lock overrides the result.

**Fix (requires Bug 13 fix first):** Add `ol` and `ul` container selectors to `DEFAULT_TARGET_SELECTORS` in `src/services/constants.ts`:
```typescript
'.vditor-reset ol',
'.vditor-reset ul',
'.vditor-preview ol',
'.vditor-preview ul',
'.vditor-preview li',
'.vditor-preview p',
'.vditor-preview div',
```

---

## Bug 16 — Numbered list broken in Split View (related to Bug 15)

**Files:** `src/services/constants.ts` (`DEFAULT_TARGET_SELECTORS`)

**Root Cause:** Same as Bug 15 — the `ol` container is not targeted, so `<ol>` elements in Split View never receive RTL direction. Numbered list items (`<li>` inside `<ol>`) inherit the wrong direction from an LTR `<ol>` container and the list numbers stay on the left.

**Fix:** Covered by the same `DEFAULT_TARGET_SELECTORS` additions in Bug 15's fix.

---

## Bug 17 — Raw Markdown mode: editor layout broken and causes scroll jump

**Files:** `src/assets/styles/Blinko-RTL.css`, `src/services/constants.ts` (`DEFAULT_TARGET_SELECTORS`, `DEFAULT_DYNAMIC_CSS`)

**Root Cause:** Vditor's Raw Markdown mode (SV = Source View) renders an editable area using `.vditor-sv` containing a `<textarea>` or `contenteditable` element. When the plugin detects Hebrew content and applies `direction: rtl` to this element:

1. **Scroll jump:** In RTL `direction`, the browser repositions the scrollbar to the left edge and resets the horizontal scroll origin. Any content that was scrolled right snaps back to what is now the "start" (left edge in RTL). This is a browser-native behaviour for RTL scroll containers.
2. **Editor layout broken:** The raw markdown contains syntax characters (`- [ ]`, `1.`, `**`, etc.) that must appear on the LEFT. Forcing the entire textarea to RTL direction causes these characters to move to the right, breaking the visual alignment of markdown syntax with rendered output.
3. **Task list not working in Raw Markdown:** The raw source text includes `- [ ] Hebrew text`. The checkbox `- [ ]` prefix is LTR syntax; when the line's direction is forced RTL, the checkbox prefix appears after the Hebrew text.

**Fix (two parts):**

Part A — Add `.vditor-sv` and its children to the disabled-by-default selectors in `DEFAULT_SETTINGS`:
```typescript
// In constants.ts DEFAULT_SETTINGS, add:
disabledSelectors: [
  '.vditor-sv',
  '.vditor-sv textarea',
  '.vditor-sv .vditor-sv__marker',
],
```
This prevents the plugin from applying direction to the raw source editor while still processing the preview panels.

Part B — Add a CSS rule to `DEFAULT_DYNAMIC_CSS` to use `unicode-bidi: plaintext` on the SV editor, which lets the browser auto-detect direction per-paragraph without forcing a global direction flip:
```css
/* Raw Markdown editor — per-line bidi detection, no forced direction */
.vditor-sv,
.vditor-sv textarea {
    unicode-bidi: plaintext !important;
    direction: ltr !important;
}
```

---

## Phase 2 Implementation Order

| Step | Bug(s) | Files | Status |
|---|---|---|---|
| 13 | Bug 13 | `src/assets/styles/Blinko-RTL.css:68-69` — extend exclusion selectors | ✅ Done |
| 14 | Bug 14 | `src/services/constants.ts` — add task list layout CSS to `DEFAULT_DYNAMIC_CSS` | ✅ Done |
| 15 | Bug 15, 16 | `src/services/constants.ts` — add `ol`, `ul`, Split View selectors to `DEFAULT_TARGET_SELECTORS` | ✅ Done |
| 16 | Bug 17 | `src/services/constants.ts` — add SV editor to `disabledSelectors` default + add SV CSS to `DEFAULT_DYNAMIC_CSS` | ✅ Done |
| 17 | Bug 17 (CSS) | `src/assets/styles/Blinko-RTL.css` — `.vditor-sv` protection already covered by `DEFAULT_DYNAMIC_CSS` injection | ✅ Done |
| 18 | Build | `npm run build:prod` — clean build, 125 kB index.js + 46 kB style.css | ✅ Done |

## Phase 2 Files to Modify

| File | Changes |
|---|---|
| `src/assets/styles/Blinko-RTL.css` | Extend `ul`/`li` exclusion to also exclude `.rtl-force` and `[dir="rtl"]`; add `.vditor-sv` LTR protection |
| `src/services/constants.ts` | Add task list layout fix to `DEFAULT_DYNAMIC_CSS`; add Split View + `ol`/`ul` container selectors to `DEFAULT_TARGET_SELECTORS`; add `.vditor-sv` to default `disabledSelectors` |

---

---

# Phase 3 — UX / UI Improvements, New Controls & New Presets

## Audit: Existing Problems in Current UI

### P3-UX-1 — Duplicate controls across tabs
**Files:** `src/setting.tsx:701-728` (Simple tab) and `src/setting.tsx:746-775` (Advanced tab)

`minRTLChars` slider + number input appears in **both** the Simple and Advanced tabs with nearly identical code. `showElementNames`/`debugShowElementNames` also appears twice (lines 826-841 and 847-865) with slightly different event handlers — both update the same underlying setting but call different service methods.

**Fix:** Remove `minRTLChars` from the Advanced tab (keep in Simple). Remove the second `showElementNames` block entirely, keep only the one inside the `debugMode` conditional.

---

### P3-UX-2 — Core settings have zero UI surface
**Files:** `src/setting.tsx`, `src/services/constants.ts`, `src/types.ts`

The following settings exist in `RTLSettings` and are fully wired in `RTLService` but have **no controls in the settings panel**:

| Setting | Type | What it does |
|---|---|---|
| `method` | `'direct' \| 'attributes' \| 'css' \| 'unicode' \| 'all'` | How RTL direction is applied to elements |
| `forceDirection` | `'auto' \| 'rtl' \| 'ltr'` | Override auto-detection with a fixed direction |
| `sensitivity` | `'high' \| 'medium' \| 'low'` | Detection threshold preset |
| `threshold` | `number` | Exact detection threshold (0–1) |
| `processInterval` | `number` | How often the auto-scan fires (ms) |

The toolbar popup has a sensitivity slider (mapped to `threshold`) but nothing for `method`, `forceDirection`, or the named `sensitivity` setting. Users have no way to change how direction is applied or override detection globally from the settings panel.

**Fix:** Add to the Simple tab — a `forceDirection` radio group ("Auto / Force RTL / Force LTR"). Add to the Advanced tab — a `method` select dropdown and a `sensitivity` named select (High/Medium/Low) alongside the existing `threshold` slider. Add a `processInterval` number input.

---

### P3-UX-3 — Toolbar popup has no enabled/disabled state indicator
**Files:** `src/app.tsx`

The toolbar popup shows an RTL block count and a sensitivity slider, but gives no visual indication of whether the plugin is currently enabled or disabled. The only toggle is a 🔄 button with no state feedback. A user who has disabled the plugin and opens the toolbar panel has no way to tell the plugin is off.

**Fix:** Add a prominent status badge at the top of the toolbar popup: a green "Active" or grey "Inactive" pill that reflects `window.blinkoRTL?.isEnabled()`. Change the toggle button to show clearly "Enable RTL" vs "Disable RTL" based on current state.

---

### P3-UX-4 — Sensitivity slider direction is counterintuitive
**Files:** `src/app.tsx:199-211`

The sensitivity slider goes 1% → 50% and is labelled "More Sensitive (1%)" → "Less Sensitive (50%)". Higher percentage = less sensitive is the **opposite** of most users' mental model (they expect "higher = more"). The slider thumb is also at the left for maximum sensitivity, which is unusual.

**Fix:** Flip the display: label the slider "Sensitivity" with a range of 1–50 where higher values still map to lower thresholds internally, but the label next to the value reads "High / Medium / Low" based on the current value rather than raw percentages. Alternatively, invert the slider direction so the thumb moves right for more sensitivity.

---

### P3-UX-5 — Action log is always shown at the top, consuming vertical space
**Files:** `src/setting.tsx:573-610`

The Real-time Action Log is a full-height scrollable table always visible at the top of the settings panel. With 50 entries, it requires the user to scroll past it to reach any controls. It should be collapsed by default with a count badge showing how many events are logged.

**Fix:** Add a `showLog` local state (default `false`). Replace the log panel with a collapsible toggle button that shows the count: "📜 Action Log (12 events) ▼". Expand the full table only when the user clicks it. Add a "🗑️ Clear" button inside the expanded log.

---

### P3-UX-6 — Settings panel title has development artifact text
**Files:** `src/setting.tsx:519`

The panel header reads `"🔧 Fixed RTL Language Support Settings"`. The word "Fixed" is a development note left in the UI.

**Fix:** Change to `"RTL Language Support — Settings"`.

---

### P3-UX-7 — Test panel gives no visual preview of RTL rendering
**Files:** `src/setting.tsx:1159-1216`

The test panel shows only the text "RTL" or "LTR" as the result. The user cannot see how the text would actually look when RTL styling is applied.

**Fix:** Add a live preview `<div>` beneath the result that renders the test text with the appropriate `direction`, `text-align`, and `unicode-bidi` applied inline, so the user sees the actual visual effect.

---

### P3-UX-8 — Right-click menu only toggles global RTL, cannot act on a single note
**Files:** `src/index.tsx:206-218`

The right-click menu handler receives the `note` object but ignores it — it just calls `rtlService.toggle()` globally. This is a missed opportunity to add a "Process this note's RTL" action that targets only the selected note's DOM elements.

**Fix:** Change the right-click handler to query `document.querySelectorAll()` scoped to the note's container (identified by its `data-id` or similar attribute), then call `rtlService.processElement()` on each found element. Keep the existing global toggle as a separate menu entry or the toolbar button.

---

## New Features to Add

### P3-FEAT-1 — 4-tab settings layout replacing 2 tabs
**Files:** `src/setting.tsx`

Replace the current "Simple / Advanced" tabs with 4 focused tabs:
- **"Quick"** — Enable toggle, Force Direction radio, Process All button, live stats
- **"Detection"** — Sensitivity, threshold, method selector, min RTL chars, auto-detect, strategy selector
- **"Appearance"** — Dynamic CSS editor, permanent CSS, presets manager
- **"Tools"** — Test panel, action log, import/export, reset

This removes the ambiguity of what "Simple" vs "Advanced" means and groups related controls logically.

---

### P3-FEAT-2 — Detection strategy selector
**Files:** `src/setting.tsx`, `src/utils/rtlDetector.ts`

The `RTLDetector` supports three strategies: `CharacterCode`, `Regex`, `Combined`. Currently there is no UI to select which strategy is active. Power users who experience false positives/negatives with one strategy cannot switch without using the browser console.

**Fix:** Add a radio group in the Detection tab: "Strategy: ◉ Combined (default) ○ Character Code ○ Regex". Wire to `window.blinkoRTL?.detector?.setStrategy(name)`.

---

### P3-FEAT-3 — Target selector chip manager
**Files:** `src/setting.tsx`

The current target selector UI (adding/removing selectors) is not visible from the existing code I read — it exists in the part of setting.tsx around lines 350-388. It likely shows a list with add/remove buttons. This should be surfaced as interactive chips/tags that can be toggled (enabled/disabled) individually without removing them, so users can experiment without permanently deleting selectors.

**Fix:** Render each selector as a pill/chip with a toggle state (green = active, grey = disabled). Disabled selectors go into `disabledSelectors`. No selector is permanently deleted from the list unless the user explicitly removes it. Add a search/filter input above the list for finding selectors quickly.

---

### P3-FEAT-4 — `window.Blinko.api.config` for plugin settings persistence
**Files:** `src/services/storageManager.ts`

The docs show `window.Blinko.api.config.getPluginConfig.query({ pluginName })` and `setPluginConfig.mutate({ pluginName, key, value })` as the official plugin config API. The current plugin uses raw `localStorage`. The official API is more robust (persists across browser sessions in Blinko's database, survives cache clears, and is properly scoped per plugin/user).

**Fix:** Add an alternative save path in `StorageManager` that tries the Blinko API first and falls back to `localStorage`. This is non-breaking: if `window.Blinko.api.config` is available, use it; otherwise continue with the existing `localStorage` approach.

---

### P3-FEAT-5 — `window.Blinko.globalRefresh()` after bulk settings changes
**Files:** `src/setting.tsx`

After "Reset to Defaults", "Import Settings", or loading a preset, call `window.Blinko.globalRefresh()` (exposed in the Blinko API) to ensure any cached rendering is cleared and the plugin's new settings take effect immediately.

---

## New CSS Presets to Add

Add the following presets to `BUILT_IN_PRESETS` in `src/setting.tsx`. Each preset is a named CSS block targeting a specific use case.

### Preset 3 — "Minimal RTL" (content only, no overrides)
```css
/* Minimal RTL — only class-based direction, no aggressive overrides */
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
}
.ltr-force {
    direction: ltr !important;
    text-align: left !important;
}
[dir="rtl"] { direction: rtl; }
[dir="ltr"] { direction: ltr; }
```
**Use case:** Users who only want the plugin to apply direction via classes, with no global rules that might conflict with the host app.

---

### Preset 4 — "Hebrew Long-Form Reading"
```css
/* Optimised for long-form Hebrew articles and blog posts */
.rtl-force, [dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
    font-family: 'David Libre', 'Frank Ruhl Libre', 'Noto Serif Hebrew', serif !important;
    line-height: 1.8 !important;
    letter-spacing: 0.01em !important;
}
.rtl-force p, [dir="rtl"] p {
    margin-bottom: 1.1em !important;
    hyphens: none !important;
}
.rtl-force h1, .rtl-force h2, .rtl-force h3,
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
    font-weight: 700 !important;
    line-height: 1.3 !important;
    margin-bottom: 0.6em !important;
}
.rtl-force blockquote, [dir="rtl"] blockquote {
    border-left: none !important;
    border-right: 4px solid currentColor !important;
    padding-right: 1em !important;
    padding-left: 0 !important;
}
```
**Use case:** Notes that are primarily long-form Hebrew prose, where typography and reading comfort matter.

---

### Preset 5 — "Mixed Hebrew-English (BiDi)"
```css
/* Mixed language — prioritises unicode-bidi isolation for switching contexts */
.markdown-body p,
.markdown-body div,
.markdown-body li,
.vditor-reset p,
.vditor-reset div,
.vditor-reset li {
    unicode-bidi: plaintext !important;
}
.rtl-force {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}
.ltr-force {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}
/* Inline RTL spans within LTR paragraphs */
[dir="rtl"] {
    unicode-bidi: isolate !important;
}
```
**Use case:** Notes that constantly switch between Hebrew and English within the same paragraph, where isolating each direction segment is more important than flipping the whole element.

---

### Preset 6 — "Card Grid RTL" (Blinko Masonry Cards)
```css
/* Optimised for Blinko's card/masonry grid layout */
.card-masonry-grid .markdown-body p,
.card-masonry-grid .markdown-body div,
.card-masonry-grid .markdown-body li {
    unicode-bidi: plaintext !important;
}
.card-masonry-grid .rtl-force,
.card-masonry-grid [dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}
.card-masonry-grid .markdown-body {
    line-height: 1.4 !important;
}
.card-masonry-grid .markdown-body > div {
    margin-bottom: 0.3em !important;
}
/* List items in cards */
.card-masonry-grid .rtl-force ul,
.card-masonry-grid .rtl-force ol,
.card-masonry-grid [dir="rtl"] ul,
.card-masonry-grid [dir="rtl"] ol {
    padding-right: 1.5em !important;
    padding-left: 0 !important;
    list-style-position: inside !important;
}
```
**Use case:** Users whose notes appear primarily in the card/masonry grid view and want tight, well-aligned RTL display in cards.

---

### Preset 7 — "Editor Focus" (Vditor-only)
```css
/* Targets only Vditor editor elements, leaves rest of UI untouched */
.vditor-reset .rtl-force,
.vditor-reset [dir="rtl"],
.vditor-preview .rtl-force,
.vditor-preview [dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}
.vditor-reset .rtl-force ul,
.vditor-reset .rtl-force ol {
    padding-right: 1.5em !important;
    padding-left: 0 !important;
}
.vditor-reset .rtl-force blockquote {
    border-left: none !important;
    border-right: 3px solid currentColor !important;
    padding-right: 0.9em !important;
    padding-left: 0 !important;
}
.vditor-task.rtl-force,
.vditor-task[dir="rtl"] {
    display: block !important;
}
```
**Use case:** Users who only want RTL styling inside the Vditor editor and want the rest of the Blinko UI completely unaffected.

---

### Preset 8 — "Print RTL"
```css
/* Print-optimised RTL — clean output for Hebrew/Arabic printing */
@media print {
    .rtl-force, [dir="rtl"] {
        direction: rtl !important;
        text-align: right !important;
        font-size: 12pt !important;
        line-height: 1.6 !important;
        color: #000 !important;
        background: transparent !important;
    }
    .rtl-force p, [dir="rtl"] p {
        orphans: 3 !important;
        widows: 3 !important;
        page-break-inside: avoid !important;
    }
    .rtl-force h1, .rtl-force h2, .rtl-force h3 {
        page-break-after: avoid !important;
    }
}
```
**Use case:** Users who print or export their Hebrew/Arabic notes and need clean, well-formatted print output.

---

## Implementation Order (Phase 3)

| Step | Item | File(s) | Priority |
|---|---|---|---|
| 1 | P3-UX-6 — Fix settings panel title | `src/setting.tsx:519` | Low (1 line) |
| 2 | P3-UX-1 — Remove duplicate controls | `src/setting.tsx` | High |
| 3 | P3-UX-5 — Collapse action log by default | `src/setting.tsx` | Medium |
| 4 | P3-UX-7 — Live RTL preview in test panel | `src/setting.tsx` | Medium |
| 5 | P3-UX-3 — Toolbar popup state indicator | `src/app.tsx` | High |
| 6 | P3-UX-4 — Fix sensitivity slider labels | `src/app.tsx` | Medium |
| 7 | P3-UX-2 — Add missing settings controls | `src/setting.tsx` | High |
| 8 | P3-UX-8 — Right-click: process single note | `src/index.tsx` | Medium |
| 9 | P3-FEAT-1 — Reorganise to 4-tab layout | `src/setting.tsx` | High |
| 10 | P3-FEAT-2 — Detection strategy selector | `src/setting.tsx` | Low |
| 11 | P3-FEAT-3 — Selector chip manager | `src/setting.tsx` | Medium |
| 12 | P3-FEAT-4 — Blinko API config persistence | `src/services/storageManager.ts` | Low |
| 13 | P3-FEAT-5 — globalRefresh on bulk changes | `src/setting.tsx` | Low |
| 14 | Presets 3–8 | `src/setting.tsx` (BUILT_IN_PRESETS) | Medium |
| 15 | Build | `npm run build:prod` | — |

## Phase 3 Files to Modify

| File | Changes |
|---|---|
| `src/setting.tsx` | Fix title; remove duplicate controls; collapse action log; live test preview; add missing setting controls (`method`, `forceDirection`, `sensitivity`, `processInterval`); reorganise into 4 tabs; add strategy selector; chip-based selector manager; add 6 new built-in presets; call `globalRefresh()` after reset/import/preset load |
| `src/app.tsx` | Add enabled/disabled status badge; fix toggle button state text; fix sensitivity slider label direction |
| `src/index.tsx` | Update right-click menu handler to process note-specific DOM elements; keep global toggle as separate entry |
| `src/services/storageManager.ts` | Add `window.Blinko.api.config` as primary save path with `localStorage` fallback |
