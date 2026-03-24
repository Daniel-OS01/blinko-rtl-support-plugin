# Research Findings: Blinko App Architecture & Plugin Injection

**Prepared:** 2026-03-24
**Scope:** Everything discovered while building the AI Post Processing + UX Audit features

---

## Table of Contents

1. [Blinko Application Architecture](#1-blinko-application-architecture)
2. [Plugin System — How Injection Works](#2-plugin-system--how-injection-works)
3. [Plugin API Reference (window.Blinko)](#3-plugin-api-reference-windowblinko)
4. [tRPC API — How to Call from a Plugin](#4-trpc-api--how-to-call-from-a-plugin)
5. [AI Subsystem](#5-ai-subsystem)
6. [Note Data Shape](#6-note-data-shape)
7. [Config Keys (Blinko Settings)](#7-config-keys-blinko-settings)
8. [Aloklok Fork Analysis Summary](#8-aloklok-fork-analysis-summary)
9. [Key Constraints & Edge Cases](#9-key-constraints--edge-cases)
10. [Conventions & Patterns Observed](#10-conventions--patterns-observed)

---

## 1. Blinko Application Architecture

### Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + React 18 |
| State management | MobX (`makeAutoObservable`) + custom `Store` base |
| Styling | Tailwind CSS v4 + HeroUI component library |
| API layer | tRPC v11 (HTTP + SSE streaming) |
| Database ORM | Prisma 7 (PostgreSQL primary; SQLite optional) |
| Auth | next-auth / custom session |
| Build | Turbo monorepo; Vite for plugin bundling |
| Editor | Vditor (Markdown WYSIWYG) |
| Drag-and-drop | @dnd-kit (migrated from @hello-pangea/dnd in Aloklok fork) |
| AI SDK | Vercel AI SDK (`ai` package) |
| Job queue | pg-boss (PostgreSQL-backed) |
| Embedding | Custom embedding pipeline (configurable model) |

### Directory Layout (blinko core app, inferred from types)

```
blinko/
├── src/
│   ├── server/
│   │   ├── routers/
│   │   │   ├── _app.ts         ← root tRPC router (combines all sub-routers)
│   │   │   ├── ai.ts           ← AI operations (writing, autoTag, completions…)
│   │   │   ├── note.ts         ← Note CRUD (upsert, list, delete…)
│   │   │   ├── config.ts       ← App configuration (isUseAI, aiPostProcessingPrompt…)
│   │   │   ├── tag.ts          ← Tag management
│   │   │   ├── attachment.ts   ← File/media handling
│   │   │   ├── plugin.ts       ← Plugin registry and manifest
│   │   │   ├── user.ts         ← User profile/settings
│   │   │   └── …
│   │   ├── context.ts          ← tRPC context (User shape)
│   │   ├── types.ts            ← Shared types (Note, Tag, Config, etc.)
│   │   └── plugins/            ← Plugin loader helpers
│   ├── store/
│   │   ├── plugin/
│   │   │   └── pluginApiStore.ts  ← window.Blinko implementation
│   │   ├── standard/
│   │   │   └── base.ts            ← Store base class
│   │   └── …
│   └── components/
│       ├── Common/
│       │   └── Editor/
│       │       └── editorStore.ts  ← Editor state (accessible via getActiveEditorStore)
│       └── …
└── plugin.json                 ← Plugin manifest schema
```

### Note Types

```ts
enum NoteType {
  BLINKO = 0,   // quick-capture "blinko" — single-tap vs double-tap difference
  NOTE   = 1,   // structured article note
}
```

This is important for UX: the double-tap inconsistency between types is a documented issue.

---

## 2. Plugin System — How Injection Works

### Loading Mechanism

Plugins are loaded via **SystemJS** (`System.register`). The plugin bundle is a UMD-style module registered with the System loader. Blinko's frontend loads the plugin bundle at runtime and calls the plugin class's lifecycle methods.

```ts
// Plugin entry point pattern (src/index.tsx)
System.register([], (exports) => ({
  execute: () => {
    // Instantiate services here
    exports('default', class Plugin implements BasePlugin {
      withSettingPanel = true;
      renderSettingPanel = () => HTMLElement;   // injected into settings page
      async init() { /* register menu items, toolbar icons etc. */ }
      destroy() { /* clean up listeners, classes, observers */ }
    });
  }
}));
```

### Plugin Lifecycle

| Method | When Called | Purpose |
|---|---|---|
| `constructor()` | On plugin load | Copy plugin.json metadata via `Object.assign(this, plugin)` |
| `init()` | After Blinko app is ready | Register toolbar icons, right-click menus, i18n bundles |
| `renderSettingPanel()` | When user opens Settings → plugin | Return a DOM element (rendered with Preact in this plugin) |
| `destroy()` | On plugin disable/unload | Remove event listeners, body classes, DOM elements |

### window.Blinko — The Plugin API Surface

`window.Blinko` is an instance of `PluginApiStore` (MobX observable). It is the **only sanctioned bridge** between the plugin and the Blinko frontend.

```ts
// From: node_modules/blinko/dist/types/src/store/plugin/pluginApiStore.d.ts
class PluginApiStore {
  // Registration APIs
  addToolBarIcon(options: ToolbarIcon): void;
  addRightClickMenu(options: RightClickMenu): void;
  addAiWritePrompt(name: string, prompt: string, icon?: string): void;
  addCardFooterSlot(options: CardFooterSlot): void;
  addEditorFooterSlot(options: EditorFooterSlot): void;

  // Dialog management
  showDialog(options: DialogOptions): void;
  closeDialog(): void;

  // Editor access
  getActiveEditorStore(): EditorStore | null;
  getEditorMetadata(): any;
  setEditorMetadata(metadata: any): boolean;
  closeToolBarContent(name: string): void;
}
```

**Important:** `window.Blinko` does **not** expose the tRPC client directly. To call backend APIs, plugins must use raw `fetch()` calls to the tRPC HTTP endpoint (see §4).

### MutationObserver Pattern

Since Blinko is a React SPA, DOM nodes are added/removed dynamically. The correct pattern for enhancing notes is:

```ts
const observer = new MutationObserver(markAndListen);
observer.observe(document.body, { childList: true, subtree: true });
// Always store cleanup:
this.cleanup = () => observer.disconnect();
```

---

## 3. Plugin API Reference (window.Blinko)

### RightClickMenu

```ts
type RightClickMenu = {
  name: string;        // unique identifier
  label: string;       // displayed text (supports emoji prefix)
  icon?: string;       // iconify icon name, e.g. 'material-symbols:auto-fix'
  onClick: (note: Note) => void;  // ← NOTE OBJECT is passed here!
  disabled?: boolean;
};
```

**Critical:** The `onClick` receives the full `Note` object. This is how the plugin gets `note.id`, `note.content`, `note.tags`, etc.

### ToolbarIcon

```ts
type ToolbarIcon = {
  name: string;
  icon: string;         // SVG string or iconify name
  tooltip: string;
  content?: (mode?: 'create' | 'edit' | 'comment') => HTMLElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
  onClick?: () => void;
};
```

### DialogOptions

```ts
type DialogOptions = {
  title: string;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "full";
  content: () => HTMLElement;  // factory function, not the element itself
};
```

### CardFooterSlot

```ts
type CardFooterSlot = {
  name: string;
  content: (note?: Note) => HTMLElement;
  showCondition?: (note: Note) => boolean;
  hideCondition?: (note: Note) => boolean;
  // … order, style, maxWidth, onClick, onHover, onLeave
};
```

### addAiWritePrompt

Adds a custom prompt to the **editor's AI writing dropdown** (different from right-click menu). Appears when user clicks AI writing icon inside the note editor.

```ts
window.Blinko.addAiWritePrompt('My Prompt', 'Prompt template text', 'iconify:icon-name');
```

### Toast

```ts
window.Blinko.toast.success('Message');
window.Blinko.toast.error('Message');
// (inferred from usage — not in official types)
```

### i18n

```ts
window.Blinko.i18n.addResourceBundle('en', 'translation', { key: 'value' });
window.Blinko.i18n.t('key');
```

---

## 4. tRPC API — How to Call from a Plugin

### Why Direct Fetch?

`window.Blinko` does not expose the tRPC React client. Plugins must call the backend via raw `fetch()`. The browser session cookie handles authentication automatically (`credentials: 'include'`).

### Endpoint Pattern

```
POST /api/trpc/<router>.<procedure>
Content-Type: application/json
Body: { "json": <input_object> }
```

### Non-Streaming Mutation (example: note.upsert)

```ts
const res = await fetch('/api/trpc/note.upsert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ json: { id: noteId, content: newContent } }),
});
const body = await res.json();
// Result is at: body?.[0]?.result?.data?.json  OR  body?.result?.data?.json
```

### Streaming Mutation (example: ai.writing)

The `ai.writing` endpoint returns an **SSE (Server-Sent Events) stream** when `Accept: text/event-stream` is requested.

```ts
const res = await fetch('/api/trpc/ai.writing', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream, application/json',
  },
  credentials: 'include',
  body: JSON.stringify({ json: { question: promptText, type: 'custom' } }),
});

const reader = res.body!.getReader();
const decoder = new TextDecoder();
let buffer = '';
let fullText = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';

  for (const line of lines) {
    if (!line.startsWith('data:')) continue;
    const jsonStr = line.slice(5).trim();
    if (!jsonStr || jsonStr === '[DONE]') continue;
    try {
      const data = JSON.parse(jsonStr);
      const chunk =
        data?.result?.data?.json?.chunk ??
        data?.result?.data?.chunk ??
        data?.chunk;
      if (chunk?.type === 'text-delta') fullText += chunk.textDelta;
    } catch {}
  }
}
```

### SSE Chunk Shape (inferred from Vercel AI SDK + tRPC v11)

```json
{
  "result": {
    "data": {
      "json": {
        "chunk": {
          "type": "text-delta",
          "textDelta": "Hello "
        }
      }
    }
  }
}
```

Alternative envelope shapes also seen in the wild; the service handles all of them with fallback chain selectors.

---

## 5. AI Subsystem

### Available AI Router Procedures

| Procedure | Input | Output | Notes |
|---|---|---|---|
| `ai.writing` | `{ question, type?: 'custom'\|'expand'\|'polish', content? }` | `AsyncGenerator<TextStreamPart>` | Streaming; use for AI post-processing |
| `ai.autoTag` | `{ content: string }` | `string[]` | Non-streaming; returns tag suggestions |
| `ai.autoEmoji` | `{ content: string }` | `string[]` | Non-streaming; returns emoji suggestions |
| `ai.completions` | `{ question, conversations[], withTools?, withOnline?, withRAG?, systemPrompt? }` | `AsyncGenerator` | Streaming; general chat |
| `ai.AIComment` | `{ content, noteId }` | `any` | Non-streaming; adds AI comment to note |
| `ai.speechToText` | `{ filePath }` | `void` | Converts audio attachment to text |
| `ai.embeddingUpsert` | `{ type, id, content }` | `{ ok: true }` | Upsert vector embedding |
| `ai.embeddingDelete` | `{ id }` | `{ ok: boolean }` | Delete vector embedding |
| `ai.rebuildingEmbeddings` | `{ force? }` | `AsyncGenerator<ProgressResult>` | Streaming; rebuild all embeddings |
| `ai.testConnect` | `{}` | `{ success: boolean }` | Test AI provider connectivity |

### AI Post Processing Config Keys

These are stored in the Blinko global config (not per-user preferences):

```ts
isUseAiPostProcessing: boolean      // master toggle (user can disable system-wide)
aiPostProcessingPrompt: string      // default prompt template with {note}/{tags}
aiPostProcessingMode: string        // "customization" | "enhance" | "tags_only" | …
```

**Key insight:** The plugin's "Rerun AI Processing" feature works *independently* of `isUseAiPostProcessing`. Even when the user has turned off auto-processing, the plugin can still trigger on-demand processing because it calls `ai.writing` directly, bypassing the automatic trigger.

### Prompt Variables

| Variable | Description |
|---|---|
| `{note}` | Full `note.content` (raw Markdown) |
| `{tags}` | Comma-separated `note.tags[].name` |

---

## 6. Note Data Shape

```ts
// From: blinko/dist/types/src/server/types.d.ts
type Note = Partial<NonNullable<RouterOutput['notes']['list'][0]>>;

// Inferred fields (from router outputs and usage patterns):
interface NoteFields {
  id: number;
  content: string | null;
  type: NoteType;           // 0 = BLINKO, 1 = NOTE
  isTop: boolean | null;    // pinned
  isArchived: boolean | null;
  isRecycle: boolean | null;
  isShare: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  attachments: Attachment[];
  tags: Tag[];
  metadata: any;
  references: number[];     // related note IDs
}
```

### note.upsert Input

```ts
{
  id?: number;              // omit for create; provide for update
  content?: string | null;
  type?: NoteType | -1;
  createdAt?: Date;
  updatedAt?: Date;
  isArchived?: boolean | null;
  isRecycle?: boolean | null;
  isShare?: boolean | null;
  isTop?: boolean | null;
  metadata?: any;
  references?: number[];
  attachments?: Array<{ path, type, name, size }>;
}
```

---

## 7. Config Keys (Blinko Settings)

These are the server-side config keys (used in `config.list` / `config.upsert`):

```ts
// AI
"isUseAI"                    // global AI on/off
"aiModelProvider"            // 'openai' | 'anthropic' | 'ollama' | ...
"aiApiKey"
"aiApiEndpoint"
"aiApiVersion"
"aiModel"
"isUseAiPostProcessing"      // auto post-process on note creation
"aiPostProcessingPrompt"     // {note}/{tags} template
"aiPostProcessingMode"       // 'customization' | ...
"embeddingModel"
"embeddingDimensions"
"embeddingTopK"
"embeddingScore"
"tavilyApiKey"               // web search for RAG

// Storage
"objectStorage"              // 's3' | 'local'
"s3AccessKeyId" / "s3AccessKeySecret" / "s3Endpoint" / "s3Bucket" / "s3Region"
"localCustomPath"

// Archive
"isAutoArchived"
"autoArchivedDays"

// Proxy
"isUseHttpProxy"
"httpProxyHost" / "httpProxyPort" / "httpProxyUsername" / "httpProxyPassword"

// UI (per-user preferences, separate from config)
"theme"                     // 'dark' | 'light' | 'system'
"language"                  // 'en' | 'zh' | 'he' | ...
"timeFormat"
"isHiddenMobileBar"
"isOrderByCreateTime"
"themeColor" / "themeForegroundColor"
"maxHomePageWidth"
"toolbarVisibility"
"textFoldLength"
"smallDeviceCardColumns" / "mediumDeviceCardColumns" / "largeDeviceCardColumns"
```

---

## 8. Aloklok Fork Analysis Summary

### Fork Identity

```
Owner:     Aloklok (郑嘉乐, ID 13984522)
Repo:      https://github.com/Aloklok/blinko
Base:      blinko-space/blinko (upstream)
Status:    162 commits ahead, 18 commits behind (as of 2026-03-05)
```

### Why This Fork Matters

The Aloklok fork is the **most active known fork** of Blinko with production-quality changes. `Daniel-OS01/blinko` is itself based on this fork. Understanding Aloklok's changes informs both:
1. What CSS/JS fixes can be backported to the plugin
2. What PRs are worth submitting to the core repository

### High-Value Non-Upstream Commits (from `daniel-os01/blinko` perspective)

These commits exist in Aloklok but may not be in Daniel-OS01's fork yet:

| Priority | SHA | Title | Why It Matters |
|---|---|---|---|
| 🔴 High | `f7026780` | DeepSeek R1 thinking mode config | New AI capability; users on reasoning models need this |
| 🔴 High | `84db3ebd` | iOS MediaRecorder timeslice fix | Audio attachments truncated on iPhone — UX blocker |
| 🔴 High | `75cfe7ba` | iOS Safari blob URL fix | Images fail to load on Safari — UX blocker |
| 🟡 Med | `f4bd0428` | ARIA labels + rAF performance | Accessibility + interaction smoothness |
| 🟡 Med | `a0869b04` | Mobile delete icon visibility | Attachment management difficult on mobile |
| 🟡 Med | `3900a159` | AI tag UX: instant feedback + stability | Reduces perceived latency of AI features |
| 🟢 Low | `bbaf5bf7` | Vite vendor split + async icons | Build size reduction; faster initial load |
| 🟢 Low | `be4fd14e` | @dnd-kit migration | Fixes build failure on some environments |

---

## 9. Key Constraints & Edge Cases

### Plugin Cannot…

- **Access React component state directly.** Plugins live in a separate SystemJS module with no React context access.
- **Import from the Blinko source.** Only `node_modules/blinko/dist/types/` (type declarations only) and `blinko` package (`BasePlugin`) are available.
- **Use React hooks in non-Preact contexts.** The plugin uses Preact (`preact/hooks`), not React. The two are compatible via the `preact/compat` alias.
- **Call tRPC procedures without authentication.** The session cookie must be present. Plugins called from non-authenticated contexts (e.g., public share links) will get 401 errors.

### AI Post Processing Edge Cases

| Scenario | Handling |
|---|---|
| `note.content` is empty | Toast error: "Note has no content to process" |
| AI API returns empty string | Toast error: "AI returned empty response" |
| `ai.writing` returns 401 | User not logged in or session expired |
| `ai.writing` returns 500 | Backend AI provider misconfigured |
| Streaming response has no `text-delta` chunks | JSON fallback path in `collectWritingStream` |
| `note.id` is null/undefined | Toast error: "Note ID not available" |
| `showPreviewBeforeApply = false` | Note content overwritten immediately (no undo in v1) |

### CSS Injection Fragility

Blinko's class names are generated by Tailwind (some are stable utility classes, some are component-specific). CSS selectors that target component-specific classes may break on Blinko version updates. The preferred approach is:

1. Target **semantic HTML attributes** (`[data-type="note"]`, `[role="listitem"]`)
2. Target **CSS custom properties** (`--primary`, `--background`) rather than specific values
3. Use **`:has()` pseudo-class** where supported to minimise selector brittleness

### MutationObserver Memory Leaks

Every `MutationObserver` **must** be disconnected in the plugin's `destroy()` method. The existing `UIUXService.destroy()` pattern is correct and should be followed for any new observers.

### tRPC Response Shape Variability

The envelope shape of tRPC v11 SSE responses can vary:
- `data.result.data.json.chunk` (v11 default)
- `data.result.data.chunk` (seen in some tRPC adapters)
- `data.chunk` (legacy / custom adapter)

The `AIPostService.collectWritingStream()` handles all three with a fallback chain.

---

## 10. Conventions & Patterns Observed

### Plugin Code Style

- **Preact** (not React) for all JSX. Import from `preact` and `preact/hooks`, not `react`.
- **Inline styles** for all settings panel UI — avoids CSS class name collisions with Blinko's Tailwind.
- **TypeScript strict mode.** All new code must pass `tsc --noEmit` without errors.
- **Services as plain classes** (no decorators, no React context). Instantiated once in `index.tsx` and exposed on `window` for settings panel access.
- **localStorage** for all plugin-side persistence. Key convention: `blinko-<service>-settings`.
- **`{ ...DEFAULT_SETTINGS, ...parsedJSON }`** merge pattern for forward-compatible settings evolution.

### Settings Panel Pattern

```tsx
// Settings panels use inline styles throughout (not Tailwind/CSS modules)
const isDark = settings.darkMode;
<div style={{ background: isDark ? '#333' : '#fafafa', padding: '20px' }}>
  <h3 style={{ color: isDark ? '#fff' : '#333' }}>Section Title</h3>
  ...
</div>
```

### Dark Mode

The settings panel reads `settings.darkMode` (from `RTLSettings`) to theme itself. All UI in the settings panel must be conditioned on this value.

### Toast Convention

```ts
window.Blinko.toast.success('Message');   // green
window.Blinko.toast.error('Message');     // red
```

Toasts are transient — do not rely on them for important state communication.

### Version Management

The plugin version is defined in `plugin.json` and injected as `__PLUGIN_VERSION__` by Vite. The `bun run release` workflow auto-bumps the version. Do not manually edit `plugin.json` version.

### Build System

```bash
bun run dev     # watch mode, outputs to dist/
bun run build   # production build
npx tsc --noEmit  # type-check only (no emit)
```

Output: `dist/index.js` (SystemJS bundle) + `dist/plugin.json` copy.
