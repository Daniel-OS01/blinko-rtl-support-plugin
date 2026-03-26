# User Requirements — Blinko RTL Support Plugin

> **Document type:** Requirements specification & acceptance criteria
> **Version:** 2.0
> **Branch:** `claude/review-rtl-plugin-prs-OMCOM`
> **Last updated:** 2026-03-26

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

## 3. Scope Boundaries & Assumptions

| Boundary | Decision |
|----------|----------|
| **Platform targets** | Windows, Android, Web only. iOS/macOS explicitly excluded per prior session confirmation. |
| **Blinko version** | Plugin operates as a CSS/JS injection layer; does not own Blinko core source. Core changes cannot be made directly. |
| **Auth mechanism** | REST API v1 Bearer token is opt-in; session-cookie tRPC remains the default fallback. |
| **AI provider** | 401 errors on AI endpoints indicate Blinko server misconfiguration, not a plugin bug. Plugin can only display better error messages. |
| **Token storage** | Bearer token stored in `localStorage` via the existing `blinko-ai-post-settings` key — same as all other plugin settings. No additional encryption implemented (token is already in user's browser). |
| **Dry-run test ID** | Test Connection uses `id: -99999` as a non-existent note ID. A 404/400 response is treated as auth-success (auth passed, note not found). |
| **Quick note fallback** | Dispatching `new MouseEvent('click', { bubbles: true })` on the card itself. Re-entry guard (`card.dataset.opening`) prevents handler recursion. |

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
