/**
 * Guards for the two issues fixed in PR #145.
 *
 * Both are real, but neither is as severe as the "HIGH" label suggests:
 *
 * 1. `isAIEndpointUrl` matched with a bare `String.includes` over the whole
 *    URL, so any request whose URL merely *contained* "/trpc/ai" matched —
 *    including third-party ones. The interceptor returns the response
 *    completely untouched and only fires a toast on a 401, so the consequence
 *    is a misleading "AI feature requires an API key" message triggered by an
 *    unrelated site, not data exposure.
 *
 * 2. The prompt builder passed user note content as the *replacement string*
 *    to `String.prototype.replace`, where `$&`, `` $` ``, `$'` and `$1` carry
 *    special meaning. A note containing those sequences silently rewrote the
 *    prompt. It corrupts the request sent to the user's own configured
 *    provider; it is not a path to executing anything.
 *
 * The first fix originally failed open: it skipped the origin comparison
 * whenever the page origin was unknown, which is exactly the case in a
 * sandboxed iframe (origin `"null"`) — and in this test environment, which is
 * how the gap surfaced. It now refuses absolute URLs when the origin cannot be
 * established.
 */

import { describe, it, expect, beforeEach, afterEach, afterAll, jest } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch (e) {
  // Already registered by another test file in the same run.
}

import { UIUXService } from '../../src/services/uiuxService';
import { AIPostService } from '../../src/services/aiPostService';

/** happy-dom defaults to about:blank, whose origin is "null". */
function setPageUrl(url: string) {
  (window as any).happyDOM?.setURL?.(url);
}

const PAGE_ORIGIN = 'https://blinko.app';

describe('fetch interception is scoped to same-origin AI endpoints', () => {
  let service: UIUXService;
  let originalFetch: typeof window.fetch;
  let toastError: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    localStorage.clear();
    setPageUrl(`${PAGE_ORIGIN}/notes`);
    originalFetch = window.fetch;
    toastError = jest.fn();
    (window as any).Blinko = { toast: { error: toastError } };
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
    window.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  afterAll(() => {
    setPageUrl('about:blank');
  });

  /** Drive a 401 through the interceptor and report whether the toast fired. */
  async function fetch401(url: string): Promise<boolean> {
    window.fetch = jest.fn().mockResolvedValue({ status: 401, ok: false }) as any;
    service.updateSettings({ interceptAIErrors: true });
    await window.fetch(url);
    await new Promise((resolve) => setTimeout(resolve, 10));
    return toastError.mock.calls.length > 0;
  }

  describe('same-origin AI endpoints are intercepted', () => {
    const ours = [
      `${PAGE_ORIGIN}/api/trpc/ai.autoTag`,
      `${PAGE_ORIGIN}/api/trpc/ai.writing`,
      '/api/trpc/ai.autoTag',
      'api/trpc/ai.writing',
    ];

    for (const url of ours) {
      it(`fires for ${url}`, async () => {
        expect(await fetch401(url)).toBe(true);
      });
    }
  });

  it('does not fire for a same-origin non-AI endpoint', async () => {
    expect(await fetch401(`${PAGE_ORIGIN}/api/trpc/notes.list`)).toBe(false);
  });

  describe('cross-origin URLs containing the marker strings are ignored', () => {
    const hostile = [
      'https://attacker.example/?q=/trpc/ai',
      'https://attacker.example/trpc/ai.autoTag',
      'https://attacker.example/ai.writing',
      'https://attacker.example/redirect?next=/trpc/ai.autoTag',
      'https://attacker.example/#/trpc/ai',
      // Same host, different scheme and port — still a different origin.
      'http://blinko.app/api/trpc/ai.autoTag',
      'https://blinko.app:8443/api/trpc/ai.autoTag',
      // Lookalike hosts.
      'https://blinko.app.attacker.example/api/trpc/ai.autoTag',
      'https://notblinko.app/api/trpc/ai.autoTag',
    ];

    for (const url of hostile) {
      it(`ignores ${url}`, async () => {
        expect(await fetch401(url)).toBe(false);
      });
    }
  });

  it('ignores a malformed URL rather than throwing', async () => {
    expect(await fetch401('ht!tp://[not a url')).toBe(false);
  });

  describe('with an unknown page origin the guard fails closed', () => {
    beforeEach(() => {
      setPageUrl('about:blank'); // origin === "null", as in a sandboxed iframe
    });

    it('refuses an absolute URL that would otherwise match', async () => {
      expect(await fetch401('https://attacker.example/api/trpc/ai.autoTag')).toBe(false);
    });

    it('still accepts a relative URL, which is same-origin by construction', async () => {
      expect(await fetch401('/api/trpc/ai.autoTag')).toBe(true);
    });
  });
});

describe('prompt building treats note content as literal text', () => {
  let service: AIPostService;

  beforeEach(() => {
    localStorage.clear();
    service = new AIPostService();
    service.save({ customPrompt: '<<{note}>> tags:{tags}' } as any);
  });

  const replacementTokens: [string, string][] = [
    ['$& (whole match)', 'before $& after'],
    ['$` (prefix)', 'before $` after'],
    ["$' (suffix)", "before $' after"],
    ['$1 (capture group)', 'before $1 after'],
    ['$$ (escaped dollar)', 'before $$ after'],
  ];

  for (const [label, content] of replacementTokens) {
    it(`preserves ${label} verbatim`, () => {
      const prompt = service.buildPrompt({ content } as any);
      expect(prompt).toBe(`<<${content}>> tags:`);
      // The marker must not have leaked back in via expansion.
      expect(prompt).not.toContain('{note}');
    });
  }

  it('preserves replacement tokens in tag names too', () => {
    const prompt = service.buildPrompt({ content: 'note body', tags: [{ name: '$&' }] } as any);
    expect(prompt).toBe('<<note body>> tags:$&');
  });

  it('handles ordinary content unchanged', () => {
    expect(service.buildPrompt({ content: 'שלום עולם' } as any)).toBe('<<שלום עולם>> tags:');
  });
});
