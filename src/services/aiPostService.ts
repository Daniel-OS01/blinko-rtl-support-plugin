/**
 * AIPostService
 * =============
 * Provides "Rerun AI Post Processing" and related context-menu actions for
 * the Blinko RTL Support plugin.
 *
 * Responsibilities:
 *  - Persist AIPostSettings to localStorage
 *  - Build a filled prompt from a template ({note} / {tags} substitution)
 *  - Call the Blinko tRPC ai.writing endpoint and collect the streamed result
 *  - Update an existing note via note.upsert
 *  - Trigger AI auto-tagging via ai.autoTag
 */

import { AIPostSettings, DEFAULT_AI_POST_SETTINGS } from '../types';

const STORAGE_KEY = 'blinko-ai-post-settings';

// ─── Base URL resolution ──────────────────────────────────────────────────────

/**
 * Path segments that belong to Blinko's API surface rather than to the
 * instance's own mount point. A user copying a URL out of the API docs, the
 * MCP config or the browser address bar routinely pastes one of these, and
 * appending an API path to it produced URLs like
 * `/api/v1/note/upsert/api/v1/note/list`.
 */
const API_PATH_SEGMENTS = new Set([
  'api', 'trpc', 'v1', 'v2', 'mcp', 'sse',
  'note', 'upsert', 'list', 'detail', 'config',
]);

/**
 * Reduce whatever the user pasted to the instance root.
 *
 * Trailing API segments are stripped one at a time, so a genuine sub-path mount
 * (`https://host/blinko`) survives while `https://host/blinko/api/v1` collapses
 * back to it. An instance actually mounted at a path literally named `/api` is
 * not supportable this way, which is the accepted trade-off.
 *
 * Returns '' when the input cannot be understood as a URL.
 */
export function resolveBlinkoBaseUrl(raw: string): string {
  const trimmed = (raw ?? '').trim();
  if (!trimmed) return '';

  // A bare host is the most common paste; assume https rather than rejecting.
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return '';
  }
  if (!url.hostname) return '';

  const segments = url.pathname.split('/').filter(Boolean);
  while (segments.length > 0 && API_PATH_SEGMENTS.has(segments[segments.length - 1].toLowerCase())) {
    segments.pop();
  }

  const path = segments.length > 0 ? `/${segments.join('/')}` : '';
  return `${url.origin}${path}`;
}

/** Join a resolved base with an API path, without doubling separators. */
export function buildApiUrl(base: string, path: string): string {
  const root = resolveBlinkoBaseUrl(base);
  if (!root) return '';
  return `${root}/${path.replace(/^\/+/, '')}`;
}

/** Minimal shape the service needs from a Blinko Note */
interface NoteRef {
  id?: number | null;
  content?: string | null;
  tags?: Array<{ name?: string | null }> | null;
}

// ─── tRPC fetch helpers ───────────────────────────────────────────────────────

/**
 * The credential Blinko's own client sends.
 *
 * Its tRPC link builds `Authorization: Bearer ${token}` from a store that is
 * persisted to `localStorage["token"]` — the same key the app clears on logout.
 * The plugin runs inside that page, on the same origin, so it can present the
 * identical credential instead of asking the user to paste a second one.
 *
 * A token configured in the plugin's own API Connection panel is used as a
 * fallback, which is what makes the AI actions work when the plugin is loaded
 * outside a logged-in session.
 */
export function getBlinkoAuthToken(configured?: string): string | undefined {
  try {
    const stored = globalThis.localStorage?.getItem('token');
    if (stored) {
      // Persisted through a JSON store, so it may arrive quoted.
      const unquoted = stored.replace(/^"(.*)"$/s, '$1').trim();
      if (unquoted) return unquoted;
    }
  } catch {
    // localStorage unavailable — fall through to the configured token.
  }
  return configured || undefined;
}

/**
 * Headers for a tRPC call.
 *
 * `trpc-accept: application/jsonl` is sent only for a streaming procedure. It
 * is not a free upgrade: with that header Blinko answers **HTTP 200 even for
 * failures** and puts the real error inside the stream body, so a plain
 * mutation sent that way loses its status code and no longer parses as JSON.
 * Without it, a batched mutation returns a normal status and a clean
 * `[{result|error}]` array.
 */
function trpcHeaders(token?: string, streaming = false): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-trpc-source': 'blinko-rtl-plugin',
  };
  if (streaming) headers['trpc-accept'] = 'application/jsonl';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Blinko's client batches every call: `?batch=1` with the input keyed by index.
 * A bare `{json: input}` body is a different wire format, and the response
 * envelope differs too, so both sides are kept in this one place.
 */
function trpcUrl(procedure: string): string {
  return `/api/trpc/${procedure}?batch=1`;
}

function trpcBody(input: unknown): string {
  return JSON.stringify({ 0: { json: input } });
}

/** Pull the payload out of a batched tRPC response, or throw its error. */
function unwrapTrpc<T>(body: any, procedure: string): T {
  const entry = Array.isArray(body) ? body[0] : body;
  const errorMessage =
    entry?.error?.json?.message ?? entry?.error?.message ?? body?.error?.json?.message;
  if (errorMessage) throw new Error(`${procedure}: ${errorMessage}`);
  return (entry?.result?.data?.json ?? entry?.result?.data ?? entry) as T;
}

/**
 * A 401 means Blinko did not recognise the caller, which is a different problem
 * from Blinko having no AI provider configured — the message used to claim the
 * latter and sent users to the wrong settings page.
 */
function unauthorizedError(action: string): Error {
  return new Error(
    `${action} failed: Blinko rejected the request as unauthenticated (401). ` +
    'Sign in to Blinko in this browser tab, or set a Bearer Token in this plugin\'s ' +
    'API Connection section (Blinko → Settings → API Keys) and use Test Connection. ' +
    'If the token is valid, check that an AI provider is configured in Blinko → Settings → AI.'
  );
}

/** Fire a tRPC mutation and return the parsed payload. */
async function trpcMutate<T = unknown>(
  procedure: string,
  input: unknown,
  token?: string,
): Promise<T> {
  const res = await fetch(trpcUrl(procedure), {
    method: 'POST',
    headers: trpcHeaders(token, false),
    credentials: 'include',
    body: trpcBody(input),
  });
  if (!res.ok) {
    if (res.status === 401) throw unauthorizedError(procedure);
    if (res.status === 404) {
      throw new Error(`${procedure} is not available on this Blinko instance (404).`);
    }
    throw new Error(`tRPC ${procedure} failed: ${res.status} ${res.statusText}`);
  }
  return unwrapTrpc<T>(await res.json(), procedure);
}

/**
 * Recursively pull streamed text out of one decoded chunk.
 *
 * ai.writing yields `{type:"text-delta", textDelta}` in the app's own consumer,
 * but the chunk arrives wrapped in the batch-stream envelope, and older Blinko
 * builds used `{type:"text_delta", value}`. Searching the decoded object keeps
 * all of those working without guessing at one envelope shape.
 */
function extractStreamedText(node: unknown, depth = 0): string {
  if (node == null || depth > 8) return '';
  if (Array.isArray(node)) return node.map(n => extractStreamedText(n, depth + 1)).join('');
  // Numbers and strings appear as positional markers in the batch-stream
  // envelope. `in` throws on a primitive, so stop before the key walk below.
  if (typeof node !== 'object') return '';

  const obj = node as Record<string, any>;
  if (obj.type === 'text-delta' && typeof obj.textDelta === 'string') return obj.textDelta;
  if (obj.type === 'text_delta' && typeof obj.value === 'string') return obj.value;
  if (obj.type === 'text' && typeof obj.text === 'string') return obj.text;
  if (obj.type === 'error') {
    throw new Error(obj.error?.name ?? obj.error?.message ?? 'AI returned an error');
  }

  // A tRPC error frame. In jsonl mode these arrive inside a 200 response, so
  // this is the only place an auth failure surfaces for a streaming call.
  const trpcError = obj.error?.json ?? obj.error;
  if (trpcError && (trpcError.message || trpcError.data)) {
    if (trpcError.data?.httpStatus === 401) throw unauthorizedError('AI writing');
    throw new Error(trpcError.message ?? 'AI request failed');
  }

  let out = '';
  for (const key of ['json', 'data', 'result', 'chunk', 'value']) {
    if (key in obj) out += extractStreamedText(obj[key], depth + 1);
  }
  return out;
}

/**
 * Call the streaming ai.writing endpoint and accumulate all text-delta chunks.
 * Falls back to a best-effort JSON parse if the response is not SSE.
 */
async function collectWritingStream(
  prompt: string,
  noteContent: string,
  token?: string,
): Promise<string> {
  const res = await fetch(trpcUrl('ai.writing'), {
    method: 'POST',
    headers: trpcHeaders(token, true),
    credentials: 'include',
    // The app calls ai.writing.mutate({question, type, content}); `content` was
    // previously omitted, so the procedure received a partial input.
    body: trpcBody({ question: prompt, type: 'custom', content: noteContent }),
  });

  if (!res.ok) {
    if (res.status === 401) throw unauthorizedError('AI writing');
    if (res.status === 404) {
      throw new Error('ai.writing is not available on this Blinko instance (404).');
    }
    throw new Error(`AI writing API error: ${res.status} ${res.statusText}`);
  }

  // The response is newline-delimited JSON because that is what `trpc-accept`
  // asked for — but Blinko still labels it `application/json`, so the header
  // cannot be used to decide how to read it. Parsing it as a single JSON
  // document fails on the second line.
  let raw = '';
  if (res.body && typeof (res.body as any).getReader === 'function') {
    const reader = (res.body as ReadableStream<Uint8Array>).getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } else {
    raw = await res.text();
  }

  let fullText = '';
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Tolerate SSE framing as well as bare jsonl.
    const payload = trimmed.startsWith('data:') ? trimmed.slice(5).trim() : trimmed;
    if (!payload || payload === '[DONE]') continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload);
    } catch {
      continue; // partial or non-JSON line
    }
    // An error frame throws out of here — in jsonl mode it arrives inside an
    // HTTP 200, so this is the only place an auth failure surfaces.
    fullText += extractStreamedText(parsed);
  }

  if (fullText.trim()) return fullText.trim();

  // Nothing streamed: fall back to reading the body as one JSON document.
  try {
    const body = JSON.parse(raw);
    const result = unwrapTrpc<unknown>(body, 'ai.writing');
    if (typeof result === 'string') return result.trim();
    const salvaged = extractStreamedText(body);
    if (salvaged.trim()) return salvaged.trim();
  } catch (err) {
    if (err instanceof Error && !(err instanceof SyntaxError)) throw err;
  }

  return '';
}

// ─── AIPostService ────────────────────────────────────────────────────────────

export class AIPostService {
  private settings: AIPostSettings;

  constructor() {
    this.settings = this.load();
  }

  // ── Persistence ─────────────────────────────────────────────────────────

  private load(): AIPostSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_AI_POST_SETTINGS, ...JSON.parse(raw) };
      }
    } catch {
      // ignore parse errors
    }
    return { ...DEFAULT_AI_POST_SETTINGS };
  }

  save(patch: Partial<AIPostSettings>): void {
    this.settings = { ...this.settings, ...patch };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // ignore quota errors
    }
  }

  getSettings(): AIPostSettings {
    return { ...this.settings };
  }

  // ── Prompt building ──────────────────────────────────────────────────────

  buildPrompt(note: NoteRef): string {
    const content = (note.content ?? '').trim();
    const tags = (note.tags ?? [])
      .map(t => t.name ?? '')
      .filter(Boolean)
      .join(', ');
    // Security Pattern: use a replacer function to avoid injection via regex replacement tokens (e.g. $&)
    return this.settings.customPrompt
      .replace(/\{note\}/g, () => content)
      .replace(/\{tags\}/g, () => tags);
  }

  // ── AI operations ────────────────────────────────────────────────────────

  /**
   * Run the full AI post-processing prompt against `note` and return the
   * AI-generated replacement content.
   */
  async runPostProcessing(note: NoteRef): Promise<string> {
    const prompt = this.buildPrompt(note);
    return collectWritingStream(
      prompt,
      (note.content ?? '').trim(),
      getBlinkoAuthToken(this.settings.blinkoApiToken),
    );
  }

  /**
   * Auto-tag a note using Blinko's built-in ai.autoTag endpoint.
   * Returns the list of suggested tag strings.
   */
  async runAutoTag(note: NoteRef): Promise<string[]> {
    const content = (note.content ?? '').trim();
    if (!content) return [];
    const result = await trpcMutate<string[]>(
      'ai.autoTag',
      { content },
      getBlinkoAuthToken(this.settings.blinkoApiToken),
    );
    return Array.isArray(result) ? result : [];
  }

  /**
   * Probe the configured REST credentials.
   *
   * `note/list` is a POST route — a GET returns 404 even against a correct
   * base URL, which is what made the old probe report the right URL as broken.
   *
   * A 2xx is not sufficient on its own: Blinko serves its single-page app as a
   * catch-all, so a wrong base such as `/mcp`, `/sse` or `/v1` answers 200 with
   * HTML. Those were all reported as "Connection successful". The response has
   * to be JSON as well.
   */
  async testConnection(): Promise<{ ok: boolean; status?: number; message: string }> {
    const s = this.getSettings();
    const base = resolveBlinkoBaseUrl(s.blinkoApiUrl);

    if (!base) {
      return { ok: false, message: '❌ Enter your Blinko instance URL, e.g. https://blinko.example.com' };
    }
    if (!s.blinkoApiToken) {
      return { ok: false, message: '❌ Enter a Bearer token (Blinko → Settings → API Keys).' };
    }

    const url = buildApiUrl(base, '/api/v1/note/list');

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${s.blinkoApiToken}`,
        },
        body: JSON.stringify({ page: 1, size: 1 }),
      });
    } catch (err: any) {
      return { ok: false, message: `❌ Could not reach ${base} — ${err?.message ?? String(err)}` };
    }

    const contentType = res.headers.get('Content-Type') ?? '';
    const isJson = contentType.includes('application/json');

    if (res.ok && isJson) {
      return { ok: true, status: res.status, message: '✅ Connection successful — credentials are valid!' };
    }
    if (res.ok && !isJson) {
      return {
        ok: false,
        status: res.status,
        message:
          `❌ ${base} answered with a web page, not a Blinko API response. ` +
          'Use the instance root URL only (no /api, /v1, /mcp or /sse suffix).',
      };
    }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, status: res.status, message: `❌ Auth failed (${res.status}) — check your Bearer token.` };
    }
    if (res.status === 404) {
      return {
        ok: false,
        status: res.status,
        message: `❌ No Blinko API at ${base} (404) — check the instance URL.`,
      };
    }
    return { ok: false, status: res.status, message: `⚠️ Unexpected response: ${res.status} ${res.statusText}` };
  }

  /**
   * Overwrite an existing note's content.
   * Uses the Blinko REST API v1 with Bearer token when credentials are configured,
   * falling back to the tRPC session-cookie path.
   */
  async updateNoteContent(noteId: number, content: string): Promise<void> {
    const s = this.getSettings();
    if (s.blinkoApiUrl && s.blinkoApiToken) {
      const url = buildApiUrl(s.blinkoApiUrl, '/api/v1/note/upsert');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${s.blinkoApiToken}`,
        },
        body: JSON.stringify({ id: noteId, content }),
      });
      if (!res.ok) {
        throw new Error(`REST API note update failed: ${res.status} ${res.statusText}`);
      }
      return;
    }
    // Fallback: tRPC session-cookie path
    // `notes.upsert`, not `note.upsert` — the latter is a 404 ("No procedure
    // found on path"), so this fallback never worked.
    await trpcMutate('notes.upsert', { id: noteId, content }, getBlinkoAuthToken(s.blinkoApiToken));
  }

  // ── Utility ──────────────────────────────────────────────────────────────

  /** Export note content as a Markdown file download. */
  exportNoteAsMarkdown(note: NoteRef): void {
    const content = note.content ?? '';
    const filename = `blinko-note-${note.id ?? Date.now()}.md`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Copy note content to the clipboard. */
  async copyNoteContent(note: NoteRef): Promise<void> {
    const content = note.content ?? '';
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(content);
    } else {
      // legacy fallback
      const ta = document.createElement('textarea');
      ta.value = content;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }
}
