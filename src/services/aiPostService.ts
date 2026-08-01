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
 * Headers for a tRPC call, including the API token when one is configured.
 *
 * Blinko's AI procedures live only on tRPC — there is no REST equivalent
 * (`/api/v1/ai/*` is a 404) — and they answer 401 when the caller cannot be
 * identified. Session cookies alone are not always enough, so the configured
 * bearer token is sent as well when the user has supplied one.
 */
function trpcHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-trpc-source': 'blinko-rtl-plugin',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * A 401 from Blinko means the request was not authenticated — a different
 * problem from Blinko having no AI provider configured, which this used to
 * claim and which sent users to the wrong settings page.
 */
function unauthorizedError(action: string): Error {
  return new Error(
    `${action} failed: Blinko rejected the request as unauthenticated (401). ` +
    'Set "Blinko Instance URL" and "Bearer Token" in this plugin\'s API Connection ' +
    'section (token from Blinko → Settings → API Keys), then use Test Connection. ' +
    'If the token is valid, check that an AI provider is configured in Blinko → Settings → AI.'
  );
}

/** Fire a tRPC mutation and return the parsed JSON response body. */
async function trpcMutate<T = unknown>(
  procedure: string,
  input: unknown,
  token?: string,
): Promise<T> {
  const res = await fetch(`/api/trpc/${procedure}`, {
    method: 'POST',
    headers: trpcHeaders(token),
    credentials: 'include',
    body: JSON.stringify({ json: input }),
  });
  if (!res.ok) {
    if (res.status === 401) throw unauthorizedError(procedure);
    throw new Error(`tRPC ${procedure} failed: ${res.status} ${res.statusText}`);
  }
  const body = await res.json();
  // tRPC v10/v11 wraps the result in { result: { data: { json: ... } } }
  return (
    body?.[0]?.result?.data?.json ??
    body?.result?.data?.json ??
    body
  ) as T;
}

/**
 * Call the streaming ai.writing endpoint and accumulate all text-delta chunks.
 * Falls back to a best-effort JSON parse if the response is not SSE.
 */
async function collectWritingStream(prompt: string, token?: string): Promise<string> {
  const res = await fetch('/api/trpc/ai.writing', {
    method: 'POST',
    headers: {
      ...trpcHeaders(token),
      'Accept': 'text/event-stream, application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ json: { question: prompt, type: 'custom' } }),
  });

  if (!res.ok) {
    if (res.status === 401) throw unauthorizedError('AI writing');
    throw new Error(`AI writing API error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get('Content-Type') ?? '';

  // ── SSE / streaming path ──────────────────────────────────────────────────
  if (contentType.includes('text/event-stream') || contentType.includes('text/plain')) {
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
          const data = JSON.parse(jsonStr) as Record<string, unknown>;
          // Blinko SSE envelope (per API_REFERENCE.md):
          //   {"result":{"data":{"type":"text_delta","value":"..."}}}
          // Also handle legacy / alternate shapes as fallbacks.
          const chunk =
            (data?.result as any)?.data ??
            (data?.result as any)?.data?.json?.chunk ??
            (data as any)?.data ??
            (data as any)?.chunk;

          if (chunk?.type === 'text_delta' && typeof chunk.value === 'string') {
            // Primary format (Blinko API_REFERENCE.md spec)
            fullText += chunk.value;
          } else if (chunk?.type === 'text-delta' && typeof chunk.textDelta === 'string') {
            // Legacy format fallback
            fullText += chunk.textDelta;
          } else if (chunk?.type === 'text' && typeof chunk.text === 'string') {
            fullText += chunk.text;
          } else if (typeof chunk === 'string') {
            fullText += chunk;
          }
        } catch {
          // ignore malformed SSE lines
        }
      }
    }
    return fullText.trim();
  }

  // ── JSON / batch path (non-streaming fallback) ────────────────────────────
  const body = await res.json();
  const result =
    body?.[0]?.result?.data?.json ??
    body?.result?.data?.json ??
    body?.json ??
    '';
  if (typeof result === 'string') return result.trim();
  return JSON.stringify(result);
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
    return collectWritingStream(prompt, this.settings.blinkoApiToken || undefined);
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
      this.settings.blinkoApiToken || undefined,
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
    await trpcMutate('note.upsert', { id: noteId, content }, s.blinkoApiToken || undefined);
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
