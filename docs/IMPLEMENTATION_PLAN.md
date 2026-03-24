# Implementation Plan: AI Context Menu + UX Audit + Fork Analysis

**Branch:** `feature/ai-context-menu-ux-audit-fork-analysis`
**Date:** 2026-03-24
**Scope:** Three integrated workstreams delivered in a single branch

---

## Table of Contents

1. [Part 1 — Aloklok Fork Analysis](#part-1--aloklok-fork-analysis)
2. [Part 2 — Extended UX/UI Audit (20 new items)](#part-2--extended-uxui-audit-20-new-items)
3. [Part 3 — AI Post Processing Context Menu](#part-3--ai-post-processing-context-menu)
4. [File Change Manifest](#file-change-manifest)
5. [Verification Steps](#verification-steps)

---

## Part 1 — Aloklok Fork Analysis

### Fork Status (as of 2026-03-05)
- **162 commits AHEAD** of upstream `blinko-space/blinko`
- **18 commits BEHIND** upstream
- Fork owner: Aloklok (郑嘉乐, GitHub ID 13984522)
- Active dependabot branches present

### Curated Commit Inventory (Top 20 of 162)

#### Features (+)
| SHA | Date | Title |
|---|---|---|
| `f7026780` | 2026-03-05 | Add thinking mode config for DeepSeek R1 / reasoning models |
| `c34547b1` | 2026-02-14 | Smart AI tag polling with safety guards |
| `1eaed8c3` | 2026-02-09 | Resource manager overhaul + auth cache optimization |
| `9d9ced3e` | 2026-02-09 | Unified PC recording button + AI tag account isolation |
| `7e5a2acb` | 2026-02-15 | AI polling with tag/content change detection |

#### Performance (⚡)
| SHA | Date | Title |
|---|---|---|
| `bbaf5bf7` | 2026-02-09 | JS vendor split, dynamic icons, CSS trimming, DB indexing |
| `71897dce` | 2026-02-10 | Vite chunking + async icon loading |
| `e29dfc24` | 2026-02-10 | Dual URL strategy, pg-boss connection timeout fix |
| `fa29c0b6` | 2026-02-09 | Switch font CDN to loli.net for performance |
| `f47932a3` | 2026-02-08 | Native fetch/lodash + lazy loading for heavy libs |

#### UI/UX Bug Fixes (🐛)
| SHA | Date | Title |
|---|---|---|
| `82c31233` | 2026-03-05 | Fix duplicate/premature AI tag polling notifications |
| `a0869b04` | 2026-02-20 | Mobile: voice/attachment delete icon visibility |
| `75cfe7ba` | 2026-02-20 | iOS Safari: prevent blob URL query param append |
| `8da45370` | 2026-02-08 | Tag text/bg color collision via --primary-rgb fallback |
| `cb12c096` | 2026-02-08 | Card image visibility + redundant loading states |
| `84db3ebd` | 2026-02-14 | iOS: remove MediaRecorder timeslice → fix audio truncation |
| `972c4562` | 2026-02-15 | AI settings switch visibility + select layout issues |

#### Refactoring (♻️)
| SHA | Date | Title |
|---|---|---|
| `be4fd14e` | 2026-02-08 | Migrate DnD: @hello-pangea/dnd → @dnd-kit (build fix) |
| `314332c2` | 2026-02-09 | Decouple auth from seed script + optimize startup |

#### Accessibility (♿)
| SHA | Date | Title |
|---|---|---|
| `f4bd0428` | 2026-02-10 | ARIA labels + form compliance + rAF interaction performance |

> **Infrastructure / Docker (~50 commits, Feb 12–14):** Prisma 7 upgrade, Node 22 base image, Zeabur deployment, npm legacy-peer-deps. Not user-facing.

### Compatibility Assessment

| Category | Plugin-addressable? | Action |
|---|---|---|
| CSS-based UI fixes (icon visibility, color collision, card states) | ✅ Yes | Add CSS rules to `Blinko-UIUX.css` |
| ARIA label injection | ✅ Partial | JS attribute injection in `UIUXService` |
| DnD library migration (`@dnd-kit`) | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| iOS audio/image fixes | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| AI features (thinking mode, polling) | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| Performance (Vite chunking, DB indexing) | ❌ Core only | Submit PR to `Daniel-OS01/blinko` |
| Docker/Prisma infrastructure | ❌ Core only | Low priority; wait for upstream Prisma 7 |

### Merge Risk

| Risk Level | Commits | Reason |
|---|---|---|
| 🟢 Low | CSS/style commits | No conflicts expected |
| 🟡 Medium | Store/component refactors | Need rebase against current main |
| 🔴 High | Prisma 7 + Docker chain (~50) | Wait for upstream to adopt Prisma 7 first |

---

## Part 2 — Extended UX/UI Audit (20 new items)

These items are added to the plugin's existing UX Audit sub-tab, expanding from 15 to 35 documented issues. Each entry follows the format:

> **Current state** → Proposed enhancement → Expected benefit → Complexity

### From Aloklok Fork (CSS-injectable via plugin)

1. **Mobile delete icons invisible** (`a0869b04`)
   Voice/attachment delete icons have near-zero opacity on mobile → CSS `opacity` + `min-width` fix → prevents accidental retained attachments → **Low**

2. **Custom icon input label overlap** (`cd9419b7`)
   Settings icon label overlaps the text input field → CSS `z-index`/`position` fix → cleaner settings form → **Low**

3. **Tag text clashes with background on custom themes** (`8da45370`)
   Custom primary colors cause tag text to disappear → CSS `--primary-rgb` fallback + contrast enforcement → consistent tag readability → **Low**

4. **Card images show loading spinner after full load** (`cb12c096`)
   Loaded images continue showing animated spinner → CSS `animation` kill on `[complete]` state → less visual noise → **Low**

5. **Duplicate/premature AI tag alerts** (`82c31233`)
   AI auto-tag fires multiple notifications for the same tagging cycle → JS debounce + timestamp guard in notification handler → less interruption → **Medium (JS)**

### Independent UX Audit

6. **No search-term highlighting in results**
   Matched keywords are not highlighted in result cards → Highlight matched substrings with `<mark>` injection → faster visual scanning → **Medium (JS; ideal: core)**

7. **No multi-select for batch operations**
   Deleting/archiving multiple notes requires repeating the same action → Checkbox overlay + bulk action toolbar → major productivity gain for power users → **High (core)**

8. **No offline / connectivity indicator**
   App silently fails when server is unreachable → `navigator.onLine` listener + CSS status banner → prevents confusion and lost edits → **Low (JS+CSS)**

9. **No estimated reading time on long notes**
   Users cannot gauge note length at a glance → JS word-count badge (200 wpm) injected into card footer → better note triage → **Low (JS)**

10. **No keyboard shortcuts**
    No `Ctrl+N` (new note), `Ctrl+Enter` (submit), `/` (search focus) → JS `keydown` global listener → power-user productivity → **Medium (JS)**

11. **Dark mode is not OLED-black**
    Current dark mode uses `#1a1a2e` instead of `#000000` → CSS custom property override for `--background` and `--card` → battery saving on AMOLED devices → **Low (CSS)**

12. **Quick note templates missing**
    No way to start from a pre-structured template → Template picker in editor footer → faster structured capture → **High (core)**

13. **No file upload progress indicator**
    File attachments appear to hang during upload with no feedback → Progress bar UI during upload → user confidence; prevents duplicate uploads → **Medium (core)**

14. **Empty note list has no onboarding call-to-action**
    First-time users see a blank page → CSS `:empty` + JS content injection with "Create your first note" guidance → reduces new-user abandonment → **Low (JS+CSS)**

15. **Error messages are generic ("Something went wrong")**
    Backend errors are swallowed into a single generic toast → Specific, actionable error messages with recovery links → less user frustration → **Medium (core)**

16. **No undo after accidental note delete**
    Recycling a note is immediate with no undo window → Toast with "Undo" action within 5s → prevents data-loss anxiety → **Medium (core)**

17. **Pinned notes visually identical to unpinned**
    No visual distinction between pinned and normal note cards → CSS pseudo-element pin badge in card corner → at-a-glance identification → **Low (CSS)**

18. **Cross-platform font rendering inconsistency**
    Different OS-default fonts render with different metrics, shifting layout → CSS `font-family: system-ui, -apple-system, ...` normalization → consistent reading experience → **Low (CSS)**

19. **No in-note heading outline / jump-to-section**
    Long article notes have no navigation sidebar or anchor links → JS TOC injection (parse `## headings`, render sticky list) → fast navigation in long notes → **Medium (JS)**

20. **Tag hierarchy (#parent/child) not visually distinct**
    `#Main/Sub/Topic` tags display as flat pills with no nesting cue → CSS indentation + color-step for each slash level → cognitive structure, reduces misreads → **Low (CSS)**

---

## Part 3 — AI Post Processing Context Menu

### User Story

> As a Blinko user who writes notes quickly and then processes them with a structured AI prompt, I want to be able to right-click any existing note and trigger AI post-processing on demand, even when the automatic AI post-processing setting is turned off.

### New Right-Click Menu Items (4 total)

| Menu Item | Label | Icon | Behaviour |
|---|---|---|---|
| `ai-rerun-processing` | 🤖 Rerun AI Processing | `material-symbols:auto-fix` | Runs the full prompt template against the note; shows preview dialog before applying |
| `ai-auto-tag` | 🏷️ AI Auto-Tag | `material-symbols:label` | Calls `ai.autoTag` and toasts the suggested tags |
| `copy-note-content` | 📋 Copy as Markdown | `material-symbols:content-copy` | Copies raw note markdown to the clipboard |
| `export-note-md` | ⬇️ Export as .md | `material-symbols:download` | Downloads the note as a `.md` file |

### Prompt Template

Stored in `localStorage` under key `blinko-ai-post-settings`, field `customPrompt`. Default is the user's structured prompt (see `DEFAULT_AI_POST_PROMPT` in `types.ts`). Variables:

| Variable | Substituted With |
|---|---|
| `{note}` | `note.content` |
| `{tags}` | Comma-joined `note.tags[].name` |

### API Call Chain (Rerun AI Processing)

```
User clicks "🤖 Rerun AI Processing"
  │
  ├── 1. Read note.id, note.content, note.tags from the Note object
  ├── 2. Build prompt string (template substitution)
  ├── 3. POST /api/trpc/ai.writing  { json: { question: prompt, type: "custom" } }
  │       ↳ Response: SSE text/event-stream (tRPC streaming)
  │       ↳ Parse text-delta chunks → accumulate fullText
  ├── 4a. If showPreviewBeforeApply:
  │       ↳ window.Blinko.showDialog() with preview + Apply / Cancel buttons
  │       ↳ On Apply: POST /api/trpc/note.upsert { json: { id, content: fullText } }
  └── 4b. If auto-apply:
          ↳ POST /api/trpc/note.upsert { json: { id, content: fullText } }
```

### Settings Panel (new "🤖 AI Post" top-level tab)

| Setting | Type | Default | Description |
|---|---|---|---|
| Enable "Rerun AI" menu item | Toggle | `true` | Shows/hides the main menu item |
| Enable AI Auto-Tag menu item | Toggle | `true` | Shows/hides the auto-tag shortcut |
| Enable Copy Markdown menu item | Toggle | `true` | Shows/hides the copy action |
| Enable Export .md menu item | Toggle | `true` | Shows/hides the export action |
| Show preview before applying | Toggle | `true` | Preview dialog vs immediate overwrite |
| Custom AI Prompt | Textarea | (user's structured prompt) | Editable with {note}/{tags} variable hints |
| Reset to Default Prompt | Button | — | Restores `DEFAULT_AI_POST_PROMPT` |
| Test on sample text | Button | — | Runs the API with sample content, shows result |

---

## File Change Manifest

### New Files
| File | Purpose |
|---|---|
| `src/services/aiPostService.ts` | AIPostService: prompt building, tRPC calls, note update, export/copy utilities |
| `docs/IMPLEMENTATION_PLAN.md` | This document |
| `docs/RESEARCH_FINDINGS.md` | Blinko app architecture & plugin injection research |

### Modified Files
| File | Changes |
|---|---|
| `src/types.ts` | Add `AIPostSettings`, `DEFAULT_AI_POST_SETTINGS`, `DEFAULT_AI_POST_PROMPT` |
| `src/index.tsx` | Import `AIPostService`; instantiate; register 4 new `addRightClickMenu` entries |
| `src/setting.tsx` | Add `'aipost'` to `activeTab` union; add AI Post tab UI with prompt editor; expand UX Audit tab |

---

## Verification Steps

```bash
# 1. TypeScript — zero errors
npx tsc --noEmit

# 2. Build
bun run build

# 3. Manual smoke test
#    a. Open Blinko, right-click any note
#    b. Verify 4 new menu items appear
#    c. Click "🤖 Rerun AI Processing" → preview dialog appears
#    d. Click Apply → note content updated
#    e. Plugin Settings → "🤖 AI Post" tab → prompt editor present
#    f. Plugin Settings → UI/UX → "📋 UX Audit" → Aloklok section + 20 new items
```
