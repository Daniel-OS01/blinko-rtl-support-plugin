/**
 * Blinko API integration: URL resolution, connection testing, and auth.
 *
 * Verified against a live Blinko instance (blink.psy-tech.link) before these
 * tests were written:
 *
 *   POST /api/v1/note/list        -> 401 application/json   (route exists)
 *   GET  /api/v1/note/list        -> 404 application/json   (GET is not a route)
 *   GET  /mcp/api/v1/note/list    -> 200 text/html          (SPA catch-all)
 *   GET  /sse/api/v1/note/list    -> 200 text/html          (SPA catch-all)
 *   GET  /v1/note/list            -> 200 text/html          (SPA catch-all)
 *   POST /api/trpc/ai.autoTag     -> 401 application/json
 *   POST /api/v1/ai/*             -> 404  (no REST equivalent; tRPC only)
 *
 * Two consequences drive the tests below:
 *
 *  - `note/list` is POST-only, so a GET probe 404s against a *correct* base URL.
 *  - Wrong base URLs land on the single-page-app catch-all, which answers 200
 *    with HTML. Checking `res.ok` alone reports those as successful, so the
 *    content type has to be checked too.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

import { AIPostService, resolveBlinkoBaseUrl, buildApiUrl } from '../src/services/aiPostService';

describe('resolveBlinkoBaseUrl', () => {
  it('accepts the plain instance root', () => {
    expect(resolveBlinkoBaseUrl('https://blink.psy-tech.link')).toBe('https://blink.psy-tech.link');
  });

  it('strips a trailing slash', () => {
    expect(resolveBlinkoBaseUrl('https://blink.psy-tech.link/')).toBe('https://blink.psy-tech.link');
  });

  it('strips API path suffixes users paste by mistake', () => {
    // Every one of these was tried against the live instance and produced a
    // doubled path such as /api/v1/note/upsert/api/v1/note/list.
    const wrong = [
      'https://blink.psy-tech.link/api',
      'https://blink.psy-tech.link/api/',
      'https://blink.psy-tech.link/api/v1',
      'https://blink.psy-tech.link/api/v1/',
      'https://blink.psy-tech.link/api/v1/note',
      'https://blink.psy-tech.link/api/v1/note/upsert',
      'https://blink.psy-tech.link/api/v1/note/list',
      'https://blink.psy-tech.link/api/trpc',
      'https://blink.psy-tech.link/v1',
      'https://blink.psy-tech.link/mcp',
      'https://blink.psy-tech.link/sse',
    ];
    for (const raw of wrong) {
      expect(resolveBlinkoBaseUrl(raw)).toBe('https://blink.psy-tech.link');
    }
  });

  it('assumes https when no scheme is given', () => {
    expect(resolveBlinkoBaseUrl('blink.psy-tech.link')).toBe('https://blink.psy-tech.link');
  });

  it('preserves http for explicitly-http and local instances', () => {
    expect(resolveBlinkoBaseUrl('http://localhost:1111')).toBe('http://localhost:1111');
    expect(resolveBlinkoBaseUrl('http://localhost:1111/api/v1')).toBe('http://localhost:1111');
  });

  it('preserves a genuine sub-path mount', () => {
    // Blinko hosted under a prefix must not have that prefix eaten.
    expect(resolveBlinkoBaseUrl('https://host.example/blinko')).toBe('https://host.example/blinko');
    expect(resolveBlinkoBaseUrl('https://host.example/blinko/api/v1')).toBe('https://host.example/blinko');
  });

  it('trims surrounding whitespace', () => {
    expect(resolveBlinkoBaseUrl('  https://blink.psy-tech.link/api  ')).toBe('https://blink.psy-tech.link');
  });

  it('returns an empty string for unusable input', () => {
    for (const raw of ['', '   ', 'not a url at all ///']) {
      expect(resolveBlinkoBaseUrl(raw)).toBe('');
    }
  });
});

describe('buildApiUrl', () => {
  it('joins without doubling separators', () => {
    expect(buildApiUrl('https://host', '/api/v1/note/list')).toBe('https://host/api/v1/note/list');
    expect(buildApiUrl('https://host/', 'api/v1/note/list')).toBe('https://host/api/v1/note/list');
  });

  it('normalises the base first', () => {
    expect(buildApiUrl('https://host/api/v1/note/upsert', '/api/v1/note/list'))
      .toBe('https://host/api/v1/note/list');
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('AIPostService.testConnection', () => {
  let service: AIPostService;
  let originalFetch: typeof globalThis.fetch;
  let calls: Array<{ url: string; init: RequestInit }>;

  function stubFetch(status: number, contentType: string, body: unknown = {}) {
    calls = [];
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      return {
        ok: status >= 200 && status < 300,
        status,
        statusText: String(status),
        headers: { get: (h: string) => (h.toLowerCase() === 'content-type' ? contentType : null) },
        json: async () => body,
        text: async () => JSON.stringify(body),
      } as any;
    }) as any;
  }

  beforeEach(() => {
    localStorage.clear();
    originalFetch = globalThis.fetch;
    service = new AIPostService();
    service.save({
      blinkoApiUrl: 'https://blink.psy-tech.link',
      blinkoApiToken: 'test-token',
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('probes note/list with POST, because GET is not a route', () => {
    stubFetch(200, 'application/json', { items: [] });
    return service.testConnection().then(() => {
      expect(calls).toHaveLength(1);
      expect(calls[0].init.method).toBe('POST');
      expect(calls[0].url).toBe('https://blink.psy-tech.link/api/v1/note/list');
    });
  });

  it('sends the bearer token', async () => {
    stubFetch(200, 'application/json', { items: [] });
    await service.testConnection();
    expect((calls[0].init.headers as any).Authorization).toBe('Bearer test-token');
  });

  it('succeeds on a JSON 200', async () => {
    stubFetch(200, 'application/json; charset=utf-8', { items: [] });
    const result = await service.testConnection();
    expect(result.ok).toBe(true);
  });

  it('rejects an HTML 200 — the single-page-app catch-all', async () => {
    // This is what /mcp, /sse and /v1 return. Checking res.ok alone reported
    // all three as "Connection successful" while the correct URL reported 404.
    stubFetch(200, 'text/html', '<!doctype html>');
    const result = await service.testConnection();
    expect(result.ok).toBe(false);
    expect(result.message.toLowerCase()).toContain('not a blinko api');
  });

  it('reports a bad token distinctly from a bad URL', async () => {
    stubFetch(401, 'application/json', { message: 'Unauthorized' });
    const result = await service.testConnection();
    expect(result.ok).toBe(false);
    expect(result.message.toLowerCase()).toContain('token');
  });

  it('reports a 404 as a URL problem, not an auth problem', async () => {
    stubFetch(404, 'application/json', { message: 'Not found' });
    const result = await service.testConnection();
    expect(result.ok).toBe(false);
    expect(result.message.toLowerCase()).toContain('url');
  });

  it('normalises a pasted API path before probing', async () => {
    service.save({ blinkoApiUrl: 'https://blink.psy-tech.link/api/v1/note/upsert' });
    stubFetch(200, 'application/json', { items: [] });
    await service.testConnection();
    // Not .../api/v1/note/upsert/api/v1/note/list
    expect(calls[0].url).toBe('https://blink.psy-tech.link/api/v1/note/list');
  });

  it('requires both a URL and a token', async () => {
    service.save({ blinkoApiToken: '' });
    const result = await service.testConnection();
    expect(result.ok).toBe(false);
    expect(result.message.toLowerCase()).toContain('token');
  });
});

describe('AI endpoints carry credentials', () => {
  let service: AIPostService;
  let originalFetch: typeof globalThis.fetch;
  let calls: Array<{ url: string; init: RequestInit }>;

  beforeEach(() => {
    localStorage.clear();
    originalFetch = globalThis.fetch;
    calls = [];
    service = new AIPostService();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function stubFetch(status: number, body: unknown) {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      return {
        ok: status >= 200 && status < 300,
        status,
        statusText: String(status),
        headers: { get: (h: string) => (h.toLowerCase() === 'content-type' ? 'application/json' : null) },
        json: async () => body,
        text: async () => JSON.stringify(body),
      } as any;
    }) as any;
  }

  it('sends the bearer token on ai.autoTag when one is configured', async () => {
    service.save({ blinkoApiUrl: 'https://blink.psy-tech.link', blinkoApiToken: 'tok' });
    stubFetch(200, { result: { data: { json: ['tag'] } } });

    await service.runAutoTag({ content: 'שלום עולם' });

    expect(calls[0].url).toContain('/api/trpc/ai.autoTag');
    expect(calls[0].init.method).toBe('POST');
    expect((calls[0].init.headers as any).Authorization).toBe('Bearer tok');
  });

  it('omits the header entirely when no token is configured', async () => {
    stubFetch(200, { result: { data: { json: [] } } });
    await service.runAutoTag({ content: 'שלום עולם' });
    expect((calls[0].init.headers as any).Authorization).toBeUndefined();
  });

  it('describes a 401 as an authentication failure, not a missing AI provider', async () => {
    // The old message told users to configure an AI provider in Blinko, which
    // is a different problem — 401 is Blinko rejecting the caller's identity.
    stubFetch(401, { error: { json: { message: 'Unauthorized' } } });

    await expect(service.runAutoTag({ content: 'שלום עולם' })).rejects.toThrow(/401|authenticat/i);
    try {
      await service.runAutoTag({ content: 'שלום עולם' });
    } catch (err) {
      expect((err as Error).message).not.toMatch(/configure your AI provider/i);
    }
  });

  it('sends the bearer token on ai.writing too', async () => {
    service.save({ blinkoApiUrl: 'https://blink.psy-tech.link', blinkoApiToken: 'tok' });
    stubFetch(200, { result: { data: { json: 'done' } } });

    await service.runPostProcessing({ content: 'note' });

    expect(calls[0].url).toContain('/api/trpc/ai.writing');
    expect((calls[0].init.headers as any).Authorization).toBe('Bearer tok');
  });
});

describe('updateNoteContent', () => {
  let service: AIPostService;
  let originalFetch: typeof globalThis.fetch;
  let calls: Array<{ url: string; init: RequestInit }>;

  beforeEach(() => {
    localStorage.clear();
    originalFetch = globalThis.fetch;
    calls = [];
    service = new AIPostService();
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: { get: () => 'application/json' },
        json: async () => ({}),
        text: async () => '{}',
      } as any;
    }) as any;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('never doubles the API path, whatever the user pasted', async () => {
    for (const pasted of [
      'https://blink.psy-tech.link',
      'https://blink.psy-tech.link/',
      'https://blink.psy-tech.link/api',
      'https://blink.psy-tech.link/api/v1',
      'https://blink.psy-tech.link/api/v1/note/upsert',
    ]) {
      calls = [];
      service.save({ blinkoApiUrl: pasted, blinkoApiToken: 'tok' });
      await service.updateNoteContent(1, 'content');
      expect(calls[0].url).toBe('https://blink.psy-tech.link/api/v1/note/upsert');
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Wire protocol, derived from Blinko's own client bundle and from captured
// browser payloads:
//
//   POST /api/trpc/<proc>?batch=1
//   body    {"0":{"json":{...}}}
//   headers Authorization: Bearer <localStorage["token"]>
//           trpc-accept: application/jsonl
//
//   ai.writing.mutate({question, type, content}) yields {type:"text-delta", textDelta}
//
// A procedure that does not exist answers 404 ("No procedure found"), so the
// 401s seen on ai.autoTag / ai.writing / ai.completions confirm all three exist
// and that the calls were simply unauthenticated.
// ─────────────────────────────────────────────────────────────────────────────

describe('tRPC wire protocol', () => {
  let service: AIPostService;
  let originalFetch: typeof globalThis.fetch;
  let calls: Array<{ url: string; init: any }>;

  function stubJson(body: unknown, status = 200) {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      return {
        ok: status >= 200 && status < 300,
        status,
        statusText: String(status),
        headers: { get: (h: string) => (h.toLowerCase() === 'content-type' ? 'application/json' : null) },
        json: async () => body,
        text: async () => JSON.stringify(body),
      } as any;
    }) as any;
  }

  /** A jsonl body, as httpBatchStreamLink returns for a streaming procedure. */
  function stubStream(lines: string[]) {
    globalThis.fetch = (async (url: any, init: any = {}) => {
      calls.push({ url: String(url), init });
      const encoder = new TextEncoder();
      let i = 0;
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: { get: (h: string) => (h.toLowerCase() === 'content-type' ? 'application/jsonl' : null) },
        body: {
          getReader: () => ({
            read: async () =>
              i < lines.length
                ? { done: false, value: encoder.encode(lines[i++] + '\n') }
                : { done: true, value: undefined },
          }),
        },
        json: async () => ({}),
        text: async () => lines.join('\n'),
      } as any;
    }) as any;
  }

  beforeEach(() => {
    localStorage.clear();
    calls = [];
    originalFetch = globalThis.fetch;
    service = new AIPostService();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    localStorage.clear();
  });

  it('batches the request the way the app does', async () => {
    stubJson([{ result: { data: { json: ['t'] } } }]);
    await service.runAutoTag({ content: 'שלום עולם' });

    expect(calls[0].url).toBe('/api/trpc/ai.autoTag?batch=1');
    expect(JSON.parse(calls[0].init.body)).toEqual({ 0: { json: { content: 'שלום עולם' } } });
  });

  it('does NOT ask for jsonl on a plain mutation', () => {
    // With trpc-accept: application/jsonl the server answers HTTP 200 even for
    // failures and puts the error in the stream body, so a mutation sent that
    // way loses its status code and stops parsing as JSON.
    stubJson([{ result: { data: { json: [] } } }]);
    return service.runAutoTag({ content: 'note' }).then(() => {
      expect(calls[0].init.headers['trpc-accept']).toBeUndefined();
    });
  });

  it('does ask for jsonl on the streaming procedure', async () => {
    stubStream([JSON.stringify({ json: { type: 'text-delta', textDelta: 'x' } })]);
    await service.runPostProcessing({ content: 'x' });
    expect(calls[0].init.headers['trpc-accept']).toBe('application/jsonl');
  });

  it('raises an in-stream 401, which arrives inside an HTTP 200', async () => {
    // Exactly the frame the live instance returns for an unauthenticated
    // ai.writing call in jsonl mode.
    stubStream([
      JSON.stringify({ json: { '0': [[0], [null, 0, 0]] } }),
      JSON.stringify({
        json: [0, 0, [[{ error: { message: 'Unauthorized', code: -32001, data: { code: 'UNAUTHORIZED', httpStatus: 401 } } }]]],
      }),
    ]);
    await expect(service.runPostProcessing({ content: 'x' })).rejects.toThrow(/401|unauthenticated/i);
  });

  it('uses notes.upsert for the tRPC note fallback', async () => {
    stubJson([{ result: { data: { json: {} } } }]);
    await service.updateNoteContent(7, 'body');
    // `note.upsert` is a 404 on this instance — that fallback never worked.
    expect(calls[0].url).toBe('/api/trpc/notes.upsert?batch=1');
  });

  it('unwraps the batched response envelope', async () => {
    stubJson([{ result: { data: { json: ['alpha', 'beta'] } } }]);
    expect(await service.runAutoTag({ content: 'note' })).toEqual(['alpha', 'beta']);
  });

  it('surfaces a batched tRPC error instead of returning it as data', async () => {
    stubJson([{ error: { json: { message: 'No AI provider configured' } } }]);
    await expect(service.runAutoTag({ content: 'note' })).rejects.toThrow(/No AI provider configured/);
  });

  it("prefers the session token the app stores under localStorage['token']", async () => {
    localStorage.setItem('token', 'session-jwt');
    service.save({ blinkoApiToken: 'configured-api-key' });
    stubJson([{ result: { data: { json: [] } } }]);

    await service.runAutoTag({ content: 'note' });
    expect(calls[0].init.headers.Authorization).toBe('Bearer session-jwt');
  });

  it('unquotes a JSON-persisted token', async () => {
    localStorage.setItem('token', '"quoted-jwt"');
    stubJson([{ result: { data: { json: [] } } }]);
    await service.runAutoTag({ content: 'note' });
    expect(calls[0].init.headers.Authorization).toBe('Bearer quoted-jwt');
  });

  it('falls back to the configured token when not signed in', async () => {
    service.save({ blinkoApiToken: 'configured-api-key' });
    stubJson([{ result: { data: { json: [] } } }]);
    await service.runAutoTag({ content: 'note' });
    expect(calls[0].init.headers.Authorization).toBe('Bearer configured-api-key');
  });

  it('reports a missing procedure as 404, not as an auth problem', async () => {
    stubJson({}, 404);
    await expect(service.runAutoTag({ content: 'note' })).rejects.toThrow(/not available/i);
  });

  it('sends question, type and content to ai.writing', async () => {
    stubStream([JSON.stringify({ json: { type: 'text-delta', textDelta: 'ok' } })]);
    await service.runPostProcessing({ content: 'the note body' });

    expect(calls[0].url).toBe('/api/trpc/ai.writing?batch=1');
    const input = JSON.parse(calls[0].init.body)['0'].json;
    expect(input.question).toContain('the note body'); // via the prompt template
    expect(input.type).toBe('custom');
    expect(input.content).toBe('the note body'); // previously omitted entirely
  });

  it('accumulates text-delta chunks from a jsonl stream', async () => {
    stubStream([
      JSON.stringify({ json: { type: 'text-delta', textDelta: 'Hello ' } }),
      JSON.stringify({ json: { type: 'text-delta', textDelta: 'world' } }),
    ]);
    expect(await service.runPostProcessing({ content: 'x' })).toBe('Hello world');
  });

  it('accepts the older text_delta/value chunk shape', async () => {
    stubStream([
      JSON.stringify({ result: { data: { type: 'text_delta', value: 'שלום ' } } }),
      JSON.stringify({ result: { data: { type: 'text_delta', value: 'עולם' } } }),
    ]);
    expect(await service.runPostProcessing({ content: 'x' })).toBe('שלום עולם');
  });

  it('tolerates SSE framing and blank lines', async () => {
    stubStream([
      'data: ' + JSON.stringify({ json: { type: 'text-delta', textDelta: 'A' } }),
      '',
      'data: [DONE]',
    ]);
    expect(await service.runPostProcessing({ content: 'x' })).toBe('A');
  });

  it('raises an error chunk rather than returning empty text', async () => {
    stubStream([JSON.stringify({ json: { type: 'error', error: { name: 'RateLimited' } } })]);
    await expect(service.runPostProcessing({ content: 'x' })).rejects.toThrow(/RateLimited/);
  });
});
