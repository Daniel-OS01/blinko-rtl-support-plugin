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

## Implementation Order

| Step | Bug(s) Fixed | Files Changed |
|---|---|---|
| 1 | Bug 7 | `src/services/constants.ts` — remove `p:has-text()` |
| 2 | Bug 9 | `src/services/constants.ts` — fix dark mode colors |
| 3 | Bug 5, 12 | `src/types.ts` + `src/services/constants.ts` — add missing fields |
| 4 | Bug 10 | `src/services/constants.ts` — set `processInterval: 5000` |
| 5 | Bug 2 | `src/services/rtlService.ts` — add `injectBaseCSS()` method |
| 6 | Bug 3 | `src/services/rtlService.ts` — persist `enabled` in `enable()`/`disable()` |
| 7 | Bug 1 | `src/index.tsx` — fix auto-enable check |
| 8 | Bug 2 (call) | `src/index.tsx` — call `injectBaseCSS()` at startup |
| 9 | Bug 8 | `src/setting.tsx` — use DEFAULT_SETTINGS for initial state |
| 10 | Bug 6 | `src/setting.tsx` — add retry polling in `useEffect` |
| 11 | Bug 11 | Delete `src/config.ts` and `src/renderer.ts` |

---

## Files Modified Summary

| File | Type of Change |
|---|---|
| `src/services/constants.ts` | Remove invalid CSS; fix dark mode colors; add `enableManualToggleBtn`, `threshold` defaults; change `processInterval` to 5000 |
| `src/services/rtlService.ts` | Add `injectBaseCSS()` method + `baseStyleElement` field; persist `enabled` in `enable()`/`disable()` |
| `src/types.ts` | Add `enableManualToggleBtn?: boolean`; make `threshold` non-optional |
| `src/index.tsx` | Fix auto-enable check; call `injectBaseCSS()` at startup |
| `src/setting.tsx` | Use `DEFAULT_SETTINGS` for initial state; add retry polling in `useEffect` |
| `src/config.ts` | **DELETE** |
| `src/renderer.ts` | **DELETE** |
