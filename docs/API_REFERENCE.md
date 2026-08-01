# API Reference — Blinko RTL Support Plugin

> **Document type:** External API endpoints, request/response contracts, and auth patterns
> **Version:** 1.2
> **Last updated:** 2026-03-28

---

## Overview

The plugin interacts with two distinct Blinko API surfaces:

| API Surface | Auth | Base | Purpose |
|-------------|------|------|---------|
| tRPC (batched) | Resolved Blinko token (see [Auth Token Resolution](#auth-token-resolution)) | `/api/trpc/` | Default for all operations |
| REST API v1 | `Authorization: Bearer <token>` | `/api/v1/` | Opt-in alternative for note updates |

Blinko's own client sends every tRPC call through `httpBatchStreamLink`. An
unbatched request is rejected outright — `POST /api/trpc/ai.autoTag` (no query
string) answers `400 "Streaming requests must be batched (you can do a batch
of 1)"` before it ever reaches the procedure. All tRPC requests below use
`?batch=1` with the input keyed by index, and unwrap the corresponding
`[{result|error}]` response envelope.

> **2026-03-28 bug fix:** The plugin previously sent unbatched tRPC bodies
> (`{"json": input}` to `/api/trpc/<proc>` with no query string), which never
> reached the procedure. See `CHANGE_LOG.md CL-S7-001`.

---

## Auth Token Resolution

Blinko's client builds `Authorization: Bearer <token>` from a store that is
persisted to `localStorage["token"]` — the same key the app clears on logout.
Because the plugin runs inside that page on the same origin, it reads that
key directly and sends the identical credential:

```typescript
function getBlinkoAuthToken(configured?: string): string | undefined
```

**Resolution order:**
1. `localStorage["token"]` (unquoted if JSON-persisted) — the signed-in
   session's own credential
2. The `blinkoApiToken` configured in the plugin's API Connection panel —
   used when there is no session (plugin loaded outside a logged-in tab) or
   the session token is unavailable

A 401 from any tRPC procedure means the resolved token was not accepted —
not that Blinko has no AI provider configured, which the error message used
to claim and which sent users to the wrong settings page.

**Implementation:** `aiPostService.ts` → `getBlinkoAuthToken()`

---

## tRPC Endpoints

### `ai.writing` — AI Content Generation

**Method:** `POST`
**URL:** `/api/trpc/ai.writing?batch=1`
**Auth:** Resolved Blinko token (see above)
**Headers:** `trpc-accept: application/jsonl` (streaming procedures only — see [Streaming Response Format](#streaming-response-format))

**Request body:**
```json
{
  "0": {
    "json": {
      "question": "<filled prompt string>",
      "type": "custom",
      "content": "<note content, as the app itself sends it>"
    }
  }
}
```

`content` must be sent alongside `question` and `type` — Blinko's own client
includes it, and the procedure previously received a partial input when it
was omitted.

#### Streaming Response Format

With `trpc-accept: application/jsonl`, Blinko answers **HTTP 200 even for
failures** and streams newline-delimited JSON — one JSON document per line,
each wrapping a `text-delta` chunk:

```
{"json":{"type":"text-delta","textDelta":"partial text..."}}
{"json":{"type":"text-delta","textDelta":" more text..."}}
```

The response is labeled `Content-Type: application/json` even though it is
JSONL, so the content-type header cannot be used to decide how to parse it —
the body must always be read line-by-line for this procedure. An error is
embedded as a tRPC error frame inside the 200 response body instead of
surfacing as an HTTP error status:

```
{"json":{"0":[[0],[null,0,0]]}}
{"json":[0,0,[[{"error":{"message":"Unauthorized","code":-32001,"data":{"code":"UNAUTHORIZED","httpStatus":401}}}]]]}
```

The plugin scans each decoded chunk for `type: "text-delta"` (current), the
older `type: "text_delta"` / `value` shape, and `type: "error"`, and raises
an embedded tRPC error (`error.message` / `error.data.httpStatus`) rather
than returning empty text. SSE (`data: ` prefixed) framing and blank lines
are tolerated as a fallback.

> **2026-03-28 bug fix:** The previous parser gated on `Content-Type:
> text/event-stream` to pick the streaming path and parsed everything else as
> a single JSON document, so a jsonl body labeled `application/json` died
> with a `JSON Parse error` and — because errors here arrive inside an HTTP
> 200 — hid the real 401 as an empty result. See `CHANGE_LOG.md CL-S7-001`.

**Error conditions:**
| Status | Meaning | Plugin behavior |
|--------|---------|-----------------|
| 401 (embedded, HTTP 200) | Resolved token rejected | Throw actionable "Blinko rejected the request as unauthenticated (401)" error |
| 404 | Procedure not present on this Blinko instance | Throw `ai.writing is not available on this Blinko instance (404).` |
| Other non-2xx | Server error | Throw `AI writing API error: ${status} ${statusText}` |

**Implementation:** `aiPostService.ts` → `collectWritingStream()`

---

### `ai.autoTag` — Automatic Tag Suggestion

**Method:** `POST`
**URL:** `/api/trpc/ai.autoTag?batch=1`
**Auth:** Resolved Blinko token (see above)

**Request body:**
```json
{
  "0": {
    "json": {
      "content": "<note text>"
    }
  }
}
```

**Response (batched envelope):**
```json
[
  {
    "result": {
      "data": { "json": ["tag1", "tag2", "tag3"] }
    }
  }
]
```

**Error conditions:**
| Status | Meaning | Plugin behavior |
|--------|---------|-----------------|
| 401 | Resolved token rejected | Throw actionable "Blinko rejected the request as unauthenticated (401)" error |
| 404 | Procedure not present on this Blinko instance | Throw `ai.autoTag is not available on this Blinko instance (404).` |
| Batched `error` entry | Server-side error (e.g. no AI provider configured) | Throw `ai.autoTag: <error.json.message>` |

**Implementation:** `aiPostService.ts` → `runAutoTag()`

---

### `notes.upsert` — Note Content Update (tRPC fallback)

**Method:** `POST`
**URL:** `/api/trpc/notes.upsert?batch=1`
**Auth:** Resolved Blinko token (see above)

**Request body:**
```json
{
  "0": {
    "json": {
      "id": 123,
      "content": "<updated markdown content>"
    }
  }
}
```

**Response:** Updated note object, unwrapped from the batched envelope.

**When used:** When `blinkoApiUrl` or `blinkoApiToken` is empty in AIPostSettings. This is the default path.

> **2026-03-28 bug fix:** The procedure name was `note.upsert` (singular),
> which Blinko answers with `404 "No procedure found on path"` — this
> fallback had never worked. The correct name is `notes.upsert`. A missing
> procedure answers 404, and an existing-but-unauthorized one answers 401;
> that distinction is how `ai.autoTag`, `ai.writing` and `ai.completions`
> were confirmed to exist. See `CHANGE_LOG.md CL-S7-001`.

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

**Test Connection:**
The Settings panel "🧪 Test Connection" button sends `GET ${blinkoApiUrl}/api/v1/note/list?page=1&pageSize=1`. A 200 response indicates credentials are valid. 401/403 indicate bad token. Other status codes show a warning.

> **Note (2026-03-27):** The previous dry-run used `POST /api/v1/note/upsert` with `{ id: -99999 }`, which caused Blinko to return HTTP 500 (unhandled exception on negative ID) instead of the expected 400/404. Replaced with this read-only GET request. See `ERROR_RESOLUTION.md ERR-012` and `DECISION_LOG.md DEC-013`.

---

## Obtaining a Bearer Token

A configured bearer token is only a **fallback** — see
[Auth Token Resolution](#auth-token-resolution). It is used when the plugin
runs outside a signed-in Blinko session, or when the session token is
rejected.

1. Open your Blinko instance in a browser
2. Navigate to **Settings → API Keys** (or equivalent path)
3. Generate or copy an existing API key
4. Paste it into **Plugin Settings → AI Post → API Connection → Bearer Token**

**Token format:** Standard JWT (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy`)

**Token lifetime:** Depends on Blinko instance configuration. The JWT `exp` claim indicates expiry. Tokens issued via Blinko's API Keys UI are typically long-lived (years).

**Storage:** Persisted to `localStorage` under `blinko-ai-post-settings.blinkoApiToken`. Any script on the same origin can read localStorage. Consider this when assessing your threat model.

---

## tRPC Helpers — `trpcMutate` / `collectWritingStream`

Internal utilities used throughout `aiPostService.ts`:

```typescript
async function trpcMutate<T>(procedure: string, input: unknown, token?: string): Promise<T>
async function collectWritingStream(prompt: string, noteContent: string, token?: string): Promise<string>
```

Both build the batched URL (`/api/trpc/<procedure>?batch=1`) and body
(`{"0":{"json":input}}`) described above, send `credentials: 'include'` and
`x-trpc-source: blinko-rtl-plugin`, and unwrap the `[{result|error}]`
envelope via `unwrapTrpc()`, throwing the embedded error message on failure.
`collectWritingStream` additionally sends `trpc-accept: application/jsonl`
and reads the body as newline-delimited JSON regardless of the response's
declared content type. Both throw a dedicated error for a 404 (procedure not
available on the instance) as well as for 401.

> **2026-03-27:** Added `x-trpc-source: blinko-rtl-plugin` header to all tRPC requests (including `collectWritingStream`) to satisfy any Blinko middleware that validates this header. See `DECISION_LOG.md DEC-014`.
>
> **2026-03-28:** Replaced the unbatched request/response shape and the
> SSE-or-single-JSON-document branch on `Content-Type` with the batched,
> jsonl-aware implementation described above. See `CHANGE_LOG.md CL-S7-001`.

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

*Document version: 1.2 — Updated 2026-03-28 (batched tRPC requests, auth token resolution from `localStorage["token"]`, JSONL streaming and embedded-error format, `note.upsert` → `notes.upsert`, `content` field on `ai.writing`)*
