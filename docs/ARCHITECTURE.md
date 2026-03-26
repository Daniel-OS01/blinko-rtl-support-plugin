# Architecture — Blinko RTL Support Plugin

> **Document type:** System design and component reference
> **Version:** 1.0
> **Last updated:** 2026-03-26

---

## Overview

The plugin is a **CSS/JS injection layer** that runs inside the Blinko web application. It does not modify Blinko's source code; instead it attaches to the running app's DOM and JavaScript environment. Blinko loads plugins via SystemJS, and the plugin exposes itself through `window.Blinko`'s plugin API.

```
┌──────────────────────────────────────────────┐
│              Blinko Web App                  │
│  (Next.js / React / Tailwind / tRPC)         │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │     Plugin Injection Layer             │  │
│  │  ┌──────────┐  ┌─────────────────────┐│  │
│  │  │UIUXService│  │  AIPostService      ││  │
│  │  │          │  │                     ││  │
│  │  │ DOM patch│  │ tRPC / REST API v1  ││  │
│  │  │ CSS vars │  │ calls               ││  │
│  │  │ Events   │  │                     ││  │
│  │  └──────────┘  └─────────────────────┘│  │
│  │  ┌──────────┐  ┌─────────────────────┐│  │
│  │  │RTLService│  │  StorageManager     ││  │
│  │  └──────────┘  └─────────────────────┘│  │
│  │  ┌─────────────────────────────────── ┐│  │
│  │  │ Settings Panel (Preact JSX)        ││  │
│  │  └────────────────────────────────────┘│  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## File Structure

```
src/
├── index.tsx           Plugin entry point — lifecycle hooks, menu registration
├── setting.tsx         Settings panel UI (Preact components, ~2600 lines)
├── types.ts            All TypeScript interfaces and default constants
├── services/
│   ├── uiuxService.ts  UI/UX feature implementation (DOM patches, CSS, events)
│   ├── aiPostService.ts AI post-processing — prompt build, tRPC/REST calls
│   └── rtlService.ts   RTL text direction detection and application
└── utils/
    ├── debounce.ts     Debounce utility with DebouncedFn<T> + cancel()
    └── rtlDetector.ts  RTL script detection (Unicode block ranges)
assets/
└── styles/
    └── Blinko-UIUX.css  Static CSS overrides injected into page
```

---

## Core Services

### UIUXService (`src/services/uiuxService.ts`)

The largest service — manages all DOM patching and event handling. Follows a single `apply()` method that is called on every `updateSettings()`:

```
updateSettings(partial) → this.settings = merge → persist() → apply()
                                                              │
                                          ┌───────────────────┴──────────────────────┐
                                          │                                           │
                                    applyBodyClasses()                    applySingleTap()
                                    applyCustomProperties()               applyBackButton()
                                    applyDynamicStyles()                  applyTapOutsideClose()
                                                                  applyAIErrorInterceptor() OR
                                                                  restoreAIErrorInterceptor()
```

**Key patterns:**
- Each `applyXxx()` method first tears down any prior installation (via stored `xxxCleanup` functions), then reinstalls if the setting is enabled
- `singleTapCleanup`, `backButtonCleanup`, `tapOutsideCleanup`, `aiInterceptorCleanup` are stored as nullable function references
- MutationObserver in `applySingleTap()` is debounced 150ms to prevent observer→DOM-write→observer feedback loops
- Overlay detection in `applyBackButton()` / `applyTapOutsideClose()` uses querySelectorAll + JS visibility filtering (not CSS `:not([style*=...])`) for broad selector-engine compatibility

**Lifecycle:**
```
new UIUXService()  → load settings from localStorage → (settings applied on first updateSettings call)
updateSettings()   → merge → persist → apply
destroy()          → run all cleanup functions → remove body classes → remove CSS vars
```

---

### AIPostService (`src/services/aiPostService.ts`)

Handles AI-powered note operations. Stateless except for settings loaded from localStorage.

```
runPostProcessing(note)
  │
  ├── buildPrompt(note)             — substitutes {note} and {tags} in customPrompt
  └── collectWritingStream(prompt)  — POST /api/trpc/ai.writing (SSE streaming)
                                      parse text-delta chunks → accumulate fullText

runAutoTag(note)
  └── trpcMutate('ai.autoTag', { content })

updateNoteContent(noteId, content)
  ├── [if blinkoApiUrl + blinkoApiToken set]
  │     POST /api/v1/note/upsert  { Authorization: Bearer <token> }
  └── [fallback]
        trpcMutate('note.upsert', { id, content })
```

**Auth strategy:**
| Condition | Method |
|-----------|--------|
| `blinkoApiUrl` + `blinkoApiToken` both non-empty | REST API v1 with Bearer token |
| Otherwise | tRPC session-cookie auth |

---

### RTLService (`src/services/rtlService.ts`)

Detects RTL scripts in note content using Unicode block range checks and applies `dir="rtl"` attributes to affected DOM elements.

---

## Data Flow: Settings Persistence

```
User interacts with Settings Panel
         │
         ▼
useState + onChange handler in setting.tsx
         │
         ├── setXxxSettings(updated)          — local Preact state (immediate UI update)
         └── xxxService.save({ key: val })    — persists to localStorage
                   │
                   └── localStorage.setItem('blinko-xxx-settings', JSON.stringify(settings))

On next page load:
new UIUXService() / new AIPostService()
         └── this.load() → localStorage.getItem() → JSON.parse() → { ...DEFAULT, ...saved }
```

**Storage keys:**
| Key | Service | Contents |
|-----|---------|----------|
| `blinko-uiux-settings` | UIUXService | All UIUXSettings fields |
| `blinko-ai-post-settings` | AIPostService | All AIPostSettings fields incl. API credentials |

---

## Data Flow: AI Post Processing

```
User: right-click note → "🤖 Rerun AI Processing"
         │
         ▼
AIPostService.runPostProcessing(note)
         │
         ├── buildPrompt: fill {note} and {tags} in customPrompt template
         │
         └── collectWritingStream(filledPrompt)
                   │
                   └── POST /api/trpc/ai.writing
                             { json: { question: prompt, type: "custom" } }
                             credentials: 'include'
                         │
                         Response: SSE text/event-stream
                         Parse: data: {"result":{"data":{"type":"text_delta","value":"..."}}}
                         Accumulate chunks → fullText

         [if showPreviewBeforeApply]
             window.Blinko.showDialog(preview)
             On Apply: updateNoteContent(note.id, fullText)
         [else]
             updateNoteContent(note.id, fullText)
```

---

## External API Dependencies

See `API_REFERENCE.md` for full endpoint documentation.

| API | Auth | Purpose |
|-----|------|---------|
| `POST /api/trpc/ai.writing` | Session cookie | AI content generation (streaming SSE) |
| `POST /api/trpc/ai.autoTag` | Session cookie | Automatic tag suggestion |
| `POST /api/trpc/note.upsert` | Session cookie | Note content update (fallback) |
| `POST /api/v1/note/upsert` | Bearer token | Note content update (primary when configured) |

---

## Build System

- **Runtime:** Bun 1.x
- **Bundler:** Vite 4.x (`vite.config.ts`)
- **Language:** TypeScript (strict mode)
- **JSX:** Preact (`h` pragma)
- **CSS:** Static file + runtime injection via `<style>` tag
- **Test runner:** Bun test + happy-dom (via `@happy-dom/global-registrator`)

**Build commands:**
```bash
bun install               # Install 252 packages
bun run build             # Development build (default)
bun run build:prod        # Production build (minified)
bun test tests/services/  # Run service tests
```

**Output:** `dist/index_<hash>.js` + `dist/style.css`

---

## Plugin API Surface

The plugin integrates with Blinko via `window.Blinko`:

```typescript
window.Blinko.toast.success(message)          // Show success toast
window.Blinko.toast.error(message)            // Show error toast
window.Blinko.showDialog(config)              // Show modal dialog
window.Blinko.addRightClickMenu(config)       // Register context menu item
window.Blinko.removeRightClickMenu(id)        // Remove context menu item
```

Plugin lifecycle (via `plugin.json` + `index.tsx`):
```typescript
init()     // Called when plugin is enabled
destroy()  // Called when plugin is disabled or unloaded
```

---

*Document version: 1.0 — Created 2026-03-26*
