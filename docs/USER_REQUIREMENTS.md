# User Requirements — Blinko RTL Support Plugin

> **Document type:** Requirements specification & acceptance criteria
> **Version:** 3.0
> **Branch:** `claude/fix-hebrew-text-note-focus-ddReT`
> **Last updated:** 2026-03-27

---

## Table of Contents

1. [Original Request (Verbatim)](#1-original-request-verbatim)
2. [Interpreted Requirements](#2-interpreted-requirements)
3. [Scope Boundaries & Assumptions](#3-scope-boundaries--assumptions)
4. [Acceptance Criteria](#4-acceptance-criteria)
5. [Out-of-Scope Items](#5-out-of-scope-items)
6. [Version History](#6-version-history)

---

## 1. Original Request (Verbatim)

### Session 1 — PR Review Task (2026-03-25)

> "analyze open pull requests for the blinko-rtl-support-plugin and make autonomous merge/archive decisions. The following pull requests are to be reviewed: [#65–#77, 13 total PRs listing UI/UX enhancements, RTL fixes, accessibility, AI context menu features]"

### Session 2 — Bug Fix & Feature Request (2026-03-25, after PR archival)

> "almost all if not all the features you implemented last commit dont work: [PR summary describing 4 bug fixes / features]... try change maybe those will work: [table of archived PRs]"

### Session 5 — Multi-Bug Fix + UI Reorganisation (2026-03-27)

> "fix, improve and enhance: there are still issues,
> 1. when typeing in hebrew the text flikers and jumps LTR than RTL on every letter.
> 2. clicking outside the note closing the note, it works, but pressing one time on the note not working, it should work when pressing on the text and in all the area in where i marked red in the image
> 3. the defaults should be: Minimum RTL Characters: 1 / Advanced Configuration > Dark Mode Plugin UI on > all other off / Compact Date/Time Display on / Single-Tap to Open Notes on / Android Back Button Closes Note on / Tap Outside to Close Note on / AI Error Guidance (401 Intercept) on / Reduce / Disable Animations on
> 4. Dynamic CSS Rules and Permanent CSS Settings and Test RTL Detection and Advanced Actions should not be in UI/UX and AI Post tabs — add another tab only for testing and export and import settings
> 5. ai not workig even when all configured and build in ai tag works [test returning empty + 500 on connection test]"

---

### Session 3 — Detailed Bug Report + API Credentials (2026-03-25)

> "same errors, same missing features / nothing changed, still nothing works, and you didn't add the features i requested / single press on blinko type notes not working, the settings missing many features, make sure you build the tabs correctly. / AI processing failed: AI writing API error: 401 / Auto-tag failed: tRPC ai.autoTag failed: 401 / you can use this [curl command with Bearer token] to reformat / ive attached many examples and full blinko documentation [URLs] / check here as example for ai usage: [blinko-ai-comments-plugin URL] [3 screenshots]"

**Provided API credentials:**
```
URL:   https://blink.psy-tech.link/api/v1/note/upsert
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsIm5hbWUiOiJEYW5pZWwiLCJzdWIiOiIxIiwiZXhwIjo0OTI3OTc3MDcyLCJpYXQiOjE3NzQzNzcwNzJ9.A3bX0_PXQEQaxlcGhEzEHpmrK5ke6y28KWEFZ5a-46Q
```

---

## 2. Interpreted Requirements

### REQ-01 — Single-tap for Blinko Quick Notes (NoteType=0)

**Source:** Sessions 2 & 3 user reports
**Priority:** Critical
**Summary:** The `singleTapOpenNote` feature only worked for Article notes (NoteType=1) that have `h1/h2/h3` heading elements. Blinko quick notes (NoteType=0, the default capture type) have no heading elements — only `<p>` text — so the `openBtn` selector returned `null`, causing single-tap to silently do nothing.

**Interpreted requirement:** Single-tap must work for **both** note types. When no dedicated opener element is found, the plugin must fall back to a mechanism that triggers Blinko's own React click handler on the card.

---

### REQ-02 — Actionable AI Error Messages

**Source:** Session 3 error logs — `AI writing API error: 401` and `tRPC ai.autoTag failed: 401`
**Priority:** High
**Summary:** AI features fail with raw HTTP 401 errors when Blinko's AI provider is not configured. The error messages give users no guidance.

**Interpreted requirement:** Error messages for 401 responses on AI endpoints must include step-by-step instructions telling the user to configure their AI provider in Blinko Settings → AI.

---

### REQ-03 — REST API v1 Note Update with Bearer Token

**Source:** Session 3, user-provided curl command with Bearer token
**Priority:** High
**Summary:** The `note.upsert` calls used only tRPC with session-cookie auth. In some deployment configurations, tRPC auth fails. The user provided a REST API v1 endpoint and Bearer token as an alternative auth path.

**Interpreted requirement:** The plugin must support Blinko REST API v1 (`/api/v1/note/upsert`) with `Authorization: Bearer <token>` for note content updates, as an opt-in alternative to tRPC. The REST path should be used when the user has configured `blinkoApiUrl` + `blinkoApiToken` in settings.

---

### REQ-04 — API Connection Settings UI

**Source:** Session 3, derived from REQ-03
**Priority:** High
**Summary:** Users need a UI to enter and persist their Blinko instance URL and Bearer token without editing code or localStorage directly.

**Interpreted requirement:** The AI Post tab in Settings must include an "API Connection" section with:
- Blinko instance URL text input
- Bearer token password input with show/hide toggle
- A "Test Connection" button that verifies credentials and shows a success/failure result inline

---

### REQ-05 — Settings Tabs Built Correctly

**Source:** Session 3 — "the settings missing many features, make sure you build the tabs correctly"
**Priority:** Medium
**Summary:** User reported that settings tabs were missing features. The required tab structure is:
- Simple tab
- Advanced tab
- UI/UX tab with 5 sub-tabs: Typography, Navigation, Accessibility, Layout, UX Audit
- AI Post tab with all controls

**Interpreted requirement:** Verify and ensure all settings tabs and sub-tabs are present and populated correctly.

---

### REQ-06 — PR Archive Decisions (Session 1)

**Source:** Session 1
**Priority:** High
**Summary:** 13 open PRs (#65–#77) needed review decisions. PR #78 was identified as having already merged implementations of all 13 PRs.

**Interpreted requirement:** Archive all 13 PRs with explanatory comments noting that their features were already incorporated via PR #78.

---

### REQ-07 — Fix RTL Text Flickering During Hebrew Typing

**Source:** Session 5
**Priority:** Critical
**Summary:** When typing Hebrew characters one by one in the Blinko Vditor editor, the text visibly jumps between LTR and RTL on every keypress. The `MutationObserver` fires a `characterData` mutation on each keystroke, triggering `processElement()` which toggles `rtl-force`/`ltr-force` CSS classes, causing a visible layout reflow.

**Interpreted requirement:** RTL class toggling must NOT fire on every keypress inside editable elements (`[contenteditable]`, `textarea`, `input`). These elements have `unicode-bidi: plaintext` via injected CSS, so the browser handles per-character BiDi natively without requiring direction class changes.

---

### REQ-08 — Single-Tap Note Open Covers Full Card Area

**Source:** Session 5 — "pressing one time on the note not working, it should work when pressing on the text and in all the area"
**Priority:** Critical
**Summary:** The `singleTapOpenNote` feature did not reliably open notes when the user tapped on body text (`<p>` elements) within the card. The previous implementation tried to find a dedicated "opener element" (heading, link) and redirect the click there — which could silently fail for several card layouts.

**Interpreted requirement:** Clicking anywhere on the card that is not an interactive control (button, link, input, action toolbar) must reliably open the note. The mechanism must work for both quick-note (NoteType=0) and article (NoteType=1) card types. Broader card selectors must also be used to cover all Blinko card class variants.

---

### REQ-09 — Update Plugin Default Settings

**Source:** Session 5 — explicit list of expected defaults
**Priority:** High
**Summary:** Multiple default settings were incorrect. Users who clear storage or install fresh get wrong defaults.

**Interpreted requirement:** The following defaults must be applied in `DEFAULT_SETTINGS` and `DEFAULT_UIUX_SETTINGS`:

| Setting | Old default | New default |
|---------|------------|------------|
| `minRTLChars` | 2 | 1 |
| `darkMode` (plugin UI) | false | true |
| `compactDatetime` | false | true |
| `singleTapOpenNote` | false | true |
| `backButtonClosesNote` | false | true |
| `tapOutsideClosesNote` | false | true |
| `reduceMotion` | false | true |
| `interceptAIErrors` | true | true (unchanged) |

---

### REQ-10 — New "Tools" Tab for Testing, CSS, and Export/Import

**Source:** Session 5 — "Dynamic CSS Rules and Permanent CSS Settings and Test RTL Detection and Advanced Actions should not be in UI/UX and AI Post tabs — add another tab only for testing and export and import settings"
**Priority:** High
**Summary:** Four heavyweight sections (Dynamic CSS Rules, Permanent CSS Settings, Test RTL Detection, Advanced Actions with export/import) were rendered outside any tab wrapper, always visible. This cluttered the settings panel. The user wants a dedicated tab for these power-user and diagnostic tools.

**Interpreted requirement:** Create a fifth `🧪 Tools` tab in `setting.tsx`. Move all four sections into it. The Advanced and AI Post tabs must not contain these sections.

---

### REQ-11 — Fix AI Post-Processing (SSE Response Parsing)

**Source:** Session 5 — "ai not working even when all configured and built-in ai tag works"
**Priority:** High
**Summary:** The `collectWritingStream()` function was extracting SSE chunk data from the wrong field path (`result.data.json.chunk.textDelta`) instead of the documented path (`result.data.type/value` per `API_REFERENCE.md`). This caused all AI responses to return empty strings silently.

**Interpreted requirement:** The SSE parser must extract text from `result.data.type === 'text_delta'` and `result.data.value`. Legacy fallback paths (`text-delta/textDelta`) should be retained for backward compatibility. Add `x-trpc-source` header to all tRPC requests to satisfy any server-side middleware guards.

---

### REQ-12 — Fix Connection Test (500 Error)

**Source:** Session 5 — "⚠️ Unexpected response: 500" on Test Connection button
**Priority:** High
**Summary:** The "Test Connection" button POSTed to `/api/v1/note/upsert` with `id: -99999`. Blinko returned HTTP 500 for this invalid ID instead of 400. The test logic treated 500 as an unexpected failure, displaying a warning even when credentials were correct.

**Interpreted requirement:** Replace the POST dry-run with a read-only `GET /api/v1/note/list?page=1&pageSize=1` request. A 200 response confirms valid credentials. Only 401/403 indicates auth failure. This eliminates the server-side 500 caused by invalid input and avoids any risk of accidental data mutation.

---

## 3. Scope Boundaries & Assumptions

| Boundary | Decision |
|----------|----------|
| **Platform targets** | Windows, Android, Web only. iOS/macOS explicitly excluded per prior session confirmation. |
| **Blinko version** | Plugin operates as a CSS/JS injection layer; does not own Blinko core source. Core changes cannot be made directly. |
| **Auth mechanism** | REST API v1 Bearer token is opt-in; session-cookie tRPC remains the default fallback. |
| **AI provider** | 401 errors on AI endpoints indicate Blinko server misconfiguration, not a plugin bug. Plugin can only display better error messages. |
| **Token storage** | Bearer token stored in `localStorage` via the existing `blinko-ai-post-settings` key — same as all other plugin settings. No additional encryption implemented (token is already in user's browser). |
| **Connection test endpoint** | Test Connection now uses `GET /api/v1/note/list?page=1&pageSize=1` (read-only). 200 = auth valid; 401/403 = bad token. The previous `id:-99999` POST approach was retired after it produced HTTP 500 (see REQ-12). |
| **Quick note click dispatch** | Single-tap now dispatches the click on the element the user actually tapped (bubbling up to the card's React onClick). The previous openBtn-search heuristic was fragile and is removed. |
| **Editable element BiDi** | Direction classes are NOT applied to `[contenteditable]`, `textarea`, or `input` elements during `characterData` mutations. The browser handles per-character BiDi via `unicode-bidi: plaintext` (REQ-07). |

---

## 4. Acceptance Criteria

### AC-01 — Quick Note Single Tap

- [ ] Tapping a Blinko quick note (NoteType=0, `<p>` text only) in single-tap mode opens the note detail view
- [ ] Tapping a Blinko Article note (NoteType=1, has headings) still works correctly
- [ ] No infinite click loop (no stack overflow; no duplicate opens)
- [ ] Context menu does NOT appear on single tap
- [ ] Re-entry guard prevents double-firing

### AC-02 — AI Error Messages

- [ ] `collectWritingStream()` 401 → toast reads "AI feature requires an API key. In Blinko → Settings → AI, configure your AI provider..."
- [ ] `runAutoTag()` 401 → same actionable message
- [ ] Non-401 errors retain their existing raw `${status} ${statusText}` message format

### AC-03 — REST API v1 Note Updates

- [ ] `updateNoteContent()` uses `Bearer` auth when `blinkoApiUrl` + `blinkoApiToken` are set
- [ ] `updateNoteContent()` falls back to tRPC when credentials are empty
- [ ] REST path throws `REST API note update failed: ${status}` on non-OK response

### AC-04 — API Connection UI

- [ ] URL input persists to `blinko-ai-post-settings.blinkoApiUrl`
- [ ] Token input persists to `blinko-ai-post-settings.blinkoApiToken`
- [ ] Token field defaults to `type="password"`; Show/Hide toggle works
- [ ] Test Connection button is disabled when URL or token is empty
- [ ] Test Connection shows ✅ on HTTP 200/400/404; ❌ on 401/403; ⚠️ on other statuses
- [ ] Connection result clears on next test attempt

### AC-05 — Settings Tabs

- [ ] All top-level tabs present: Simple, Advanced, UI/UX, AI Post
- [ ] UI/UX has 5 sub-tabs: Typography, Navigation, Accessibility, Layout, UX Audit
- [ ] AI Post tab has: header, menu item toggles, preview toggle, prompt editor, save/reset buttons, test button, API Connection section, How It Works box

### AC-06 — PR Archive

- [ ] All 13 PRs (#65–#77) have archive/close comments explaining the PR #78 situation
- [ ] No live PRs remain open that duplicate merged work

### AC-07 — RTL Typing (no flicker)

- [ ] Typing Hebrew characters one by one in the Blinko editor does not cause a visible LTR↔RTL jump per keystroke
- [ ] After typing stops and the editor loses focus, direction classes are still applied correctly when `processAllElements()` runs

### AC-08 — Single-Tap Full Card Area

- [ ] Tapping the body text (`<p>`) of a quick note opens the note — not just the heading/title area
- [ ] Tapping outside interactive controls (buttons, menus, tags) on any card type opens the note
- [ ] Re-entry guard still prevents double-open

### AC-09 — Default Settings Applied

- [ ] Fresh install (no localStorage) defaults: `minRTLChars=1`, `darkMode=true`, `compactDatetime=true`, `singleTapOpenNote=true`, `backButtonClosesNote=true`, `tapOutsideClosesNote=true`, `reduceMotion=true`, `interceptAIErrors=true`

### AC-10 — Tools Tab

- [ ] Settings panel has 5 tabs: Simple, Advanced, UI/UX, AI Post, 🧪 Tools
- [ ] Dynamic CSS Rules, Permanent CSS Settings, Test RTL Detection, Advanced Actions are ONLY in the Tools tab
- [ ] Export and Import settings buttons are present in Tools tab

### AC-11 — AI Post-Processing Works

- [ ] `🧪 Run Test` button returns AI-generated text (not empty string, not 401 error) when AI provider is configured in Blinko
- [ ] SSE chunk extraction reads `result.data.value` field

### AC-12 — Connection Test Passes

- [ ] `🧪 Test Connection` shows ✅ when URL and token are valid (HTTP 200 from GET `/api/v1/note/list`)
- [ ] Shows ❌ on 401/403; shows ⚠️ on other unexpected status codes

---

## 5. Out-of-Scope Items

| Item | Reason |
|------|--------|
| Fixing Blinko's own AI provider configuration | Server-side — outside plugin control |
| iOS/macOS platform support | Explicitly excluded by user |
| Blinko core source modifications | Plugin is injection-layer only |
| JWT token encryption at rest | Token already in user's localStorage; in-scope for a future security hardening pass |
| Multi-account token management | Single token per instance covers current use case |
| Offline note sync | Requires Blinko core changes |

---

## 6. Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-24 | Claude Code | Initial requirements from PR audit session |
| 2.0 | 2026-03-26 | Claude Code | Added REQ-01 through REQ-05 from bug report session; added API credentials; added acceptance criteria |
| 3.0 | 2026-03-27 | Claude Code | Added Session 5 verbatim request; REQ-07 through REQ-12; updated scope boundaries; added AC-07 through AC-12; branch updated to `claude/fix-hebrew-text-note-focus-ddReT` |
