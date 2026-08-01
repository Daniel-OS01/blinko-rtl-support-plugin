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
