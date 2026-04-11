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

/** Minimal shape the service needs from a Blinko Note */
export interface NoteRef {
  id?: number | null;
  content?: string | null;
  tags?: Array<{ name?: string | null }> | null;
}

// ─── tRPC fetch helpers ───────────────────────────────────────────────────────

/** Fire a tRPC mutation and return the parsed JSON response body. */
async function trpcMutate<T = unknown>(
  procedure: string,
  input: unknown,
): Promise<T> {
  const res = await fetch(`/api/trpc/${procedure}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-trpc-source': 'blinko-rtl-plugin',
    },
    credentials: 'include',
    body: JSON.stringify({ json: input }),
  });
  if (!res.ok) {
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
async function collectWritingStream(prompt: string): Promise<string> {
  const res = await fetch('/api/trpc/ai.writing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream, application/json',
      // Include tRPC source header so Blinko's middleware recognises this as a
      // legitimate plugin request (some Blinko versions gate on this header).
      'x-trpc-source': 'blinko-rtl-plugin',
    },
    credentials: 'include',
    body: JSON.stringify({ json: { question: prompt, type: 'custom' } }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(
        'AI feature requires an API key. In Blinko → Settings → AI, configure your ' +
        'AI provider (OpenAI, Anthropic, Ollama, etc.) and save. Then retry this action.'
      );
    }
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
    return this.settings.customPrompt
      // Use replacer functions to prevent regex substitution vulnerabilities (e.g. user inputting '$&')
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
    return collectWritingStream(prompt);
  }

  /**
   * Auto-tag a note using Blinko's built-in ai.autoTag endpoint.
   * Returns the list of suggested tag strings.
   */
  async runAutoTag(note: NoteRef): Promise<string[]> {
    const content = (note.content ?? '').trim();
    if (!content) return [];
    try {
      const result = await trpcMutate<string[]>('ai.autoTag', { content });
      return Array.isArray(result) ? result : [];
    } catch (err: any) {
      if (err?.message?.includes('401') || err?.message?.toLowerCase().includes('unauthorized')) {
        throw new Error(
          'AI auto-tag requires an API key. In Blinko → Settings → AI, configure your ' +
          'AI provider (OpenAI, Anthropic, Ollama, etc.) and save. Then retry this action.'
        );
      }
      throw err;
    }
  }

  /**
   * Overwrite an existing note's content.
   * Uses the Blinko REST API v1 with Bearer token when credentials are configured,
   * falling back to the tRPC session-cookie path.
   */
  async updateNoteContent(noteId: number, content: string): Promise<void> {
    const s = this.getSettings();
    if (s.blinkoApiUrl && s.blinkoApiToken) {
      const url = `${s.blinkoApiUrl.replace(/\/$/, '')}/api/v1/note/upsert`;
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
    await trpcMutate('note.upsert', { id: noteId, content });
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
