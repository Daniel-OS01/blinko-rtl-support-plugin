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
    headers: { 'Content-Type': 'application/json' },
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
    },
    credentials: 'include',
    body: JSON.stringify({ json: { question: prompt, type: 'custom' } }),
  });

  if (!res.ok) {
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
          // Handle different tRPC streaming envelope shapes
          const chunk =
            (data?.result as any)?.data?.json?.chunk ??
            (data?.result as any)?.data?.chunk ??
            (data as any)?.chunk ??
            (data as any)?.data?.chunk;

          if (chunk?.type === 'text-delta' && typeof chunk.textDelta === 'string') {
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
      .replace(/\{note\}/g, content)
      .replace(/\{tags\}/g, tags);
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
    const result = await trpcMutate<string[]>('ai.autoTag', { content });
    return Array.isArray(result) ? result : [];
  }

  /**
   * Overwrite an existing note's content via note.upsert.
   */
  async updateNoteContent(noteId: number, content: string): Promise<void> {
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
