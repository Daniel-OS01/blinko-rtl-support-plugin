# API Reference — Blinko RTL Support Plugin

> **Document type:** External API endpoints, request/response contracts, and auth patterns
> **Version:** 1.0
> **Last updated:** 2026-03-26

---

## Overview

The plugin interacts with two distinct Blinko API surfaces:

| API Surface | Auth | Base | Purpose |
|-------------|------|------|---------|
| tRPC (session) | Session cookie (`credentials: 'include'`) | `/api/trpc/` | Default for all operations |
| REST API v1 | `Authorization: Bearer <token>` | `/api/v1/` | Opt-in alternative for note updates |

---

## tRPC Endpoints

### `ai.writing` — AI Content Generation

**Method:** `POST`
**URL:** `/api/trpc/ai.writing`
**Auth:** Session cookie (`credentials: 'include'`)
**Response type:** `text/event-stream` (SSE streaming)

**Request body:**
```json
{
  "json": {
    "question": "<filled prompt string>",
    "type": "custom"
  }
}
```

**Response stream format:**
```
data: {"result":{"data":{"type":"text_delta","value":"partial text..."}}}
data: {"result":{"data":{"type":"text_delta","value":" more text..."}}}
```

Parse chunks by splitting on `\n`, filtering lines starting with `data: `, stripping the prefix, parsing JSON, and extracting `result.data.value` for `type === "text_delta"`.

**Error conditions:**
| Status | Meaning | Plugin behavior |
|--------|---------|-----------------|
| 401 | No AI provider configured | Throw actionable error: "AI feature requires an API key. In Blinko → Settings → AI..." |
| Other non-2xx | Server error | Throw `AI writing API error: ${status} ${statusText}` |

**Implementation:** `aiPostService.ts` → `collectWritingStream()`

---

### `ai.autoTag` — Automatic Tag Suggestion

**Method:** `POST`
**URL:** `/api/trpc/ai.autoTag`
**Auth:** Session cookie

**Request body:**
```json
{
  "json": {
    "content": "<note text>"
  }
}
```

**Response:**
```json
{
  "result": {
    "data": ["tag1", "tag2", "tag3"]
  }
}
```

**Error conditions:**
| Error | Meaning | Plugin behavior |
|-------|---------|-----------------|
| 401 / "unauthorized" in message | No AI provider | Throw actionable error: "AI auto-tag requires an API key..." |
| Other | Server error | Re-throw as-is |

**Note:** tRPC serializes HTTP errors into JavaScript `Error` objects without preserving the numeric status code. Detect 401 via `err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')`.

**Implementation:** `aiPostService.ts` → `runAutoTag()`

---

### `note.upsert` — Note Content Update (tRPC fallback)

**Method:** `POST`
**URL:** `/api/trpc/note.upsert`
**Auth:** Session cookie

**Request body:**
```json
{
  "json": {
    "id": 123,
    "content": "<updated markdown content>"
  }
}
```

**Response:** Updated note object.

**When used:** When `blinkoApiUrl` or `blinkoApiToken` is empty in AIPostSettings. This is the default path.

**Implementation:** `aiPostService.ts` → `updateNoteContent()` fallback branch

---

## REST API v1

### `POST /api/v1/note/upsert` — Note Content Update

**Method:** `POST`
**URL:** `${blinkoApiUrl}/api/v1/note/upsert`
**Auth:** `Authorization: Bearer <blinkoApiToken>`
**Content-Type:** `application/json`

**Request body:**
```json
{
  "id": 123,
  "content": "<updated markdown content>"
}
```

**Success responses:**
| Status | Meaning |
|--------|---------|
| 200 | Note updated successfully |

**Error responses:**
| Status | Meaning | Plugin behavior |
|--------|---------|-----------------|
| 400 | Bad request (e.g. invalid id) | Throw `REST API note update failed: 400 Bad Request` |
| 401 | Invalid or expired token | Throw `REST API note update failed: 401 Unauthorized` |
| 404 | Note ID not found | Throw `REST API note update failed: 404 Not Found` |

**When used:** When both `blinkoApiUrl` and `blinkoApiToken` are non-empty in AIPostSettings.

**Implementation:** `aiPostService.ts` → `updateNoteContent()` primary branch

**Test Connection (dry-run):**
The Settings panel "🧪 Test Connection" button POSTs `{ id: -99999, content: '__connection_test__' }`. Since no real note has ID `-99999`, a 400 or 404 response indicates auth passed (credentials are valid). Only 401/403 indicate bad credentials.

---

## Obtaining a Bearer Token

1. Open your Blinko instance in a browser
2. Navigate to **Settings → API Keys** (or equivalent path)
3. Generate or copy an existing API key
4. Paste it into **Plugin Settings → AI Post → API Connection → Bearer Token**

**Token format:** Standard JWT (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy`)

**Token lifetime:** Depends on Blinko instance configuration. The JWT `exp` claim indicates expiry. Tokens issued via Blinko's API Keys UI are typically long-lived (years).

**Storage:** Persisted to `localStorage` under `blinko-ai-post-settings.blinkoApiToken`. Any script on the same origin can read localStorage. Consider this when assessing your threat model.

---

## tRPC Helper — `trpcMutate`

Internal utility used throughout `aiPostService.ts`:

```typescript
async function trpcMutate<T>(procedure: string, input: unknown): Promise<T>
```

Constructs the tRPC request URL, POSTs with `credentials: 'include'`, parses the JSON envelope, and returns `result.data`. Throws on non-2xx responses.

---

## Blinko Plugin API

Methods available via `window.Blinko` inside plugin code:

```typescript
window.Blinko.toast.success(message: string): void
window.Blinko.toast.error(message: string): void
window.Blinko.showDialog(config: {
  title: string;
  content: string | HTMLElement;
  onConfirm?: () => void;
  onCancel?: () => void;
}): void
window.Blinko.addRightClickMenu(config: {
  id: string;
  label: string;
  icon?: string;
  onClick: (note: NoteRef) => void;
}): void
window.Blinko.removeRightClickMenu(id: string): void
```

---

## NoteRef Type

The note object passed to right-click menu handlers:

```typescript
interface NoteRef {
  id: number;
  content?: string;
  tags?: Array<{ name: string }>;
  type?: number;   // 0 = Blinko quick note, 1 = Article note
}
```

---

*Document version: 1.0 — Created 2026-03-26*
