import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { UIUXService } from '../../src/services/uiuxService';

try {
  GlobalRegistrator.register();
} catch {
  // ignore duplicate register
}

describe('UIUXService', () => {
  let service: UIUXService;
  let originalPushState: History['pushState'];
  let pushStateCalls: Array<{ state: any; title: string; url?: string | URL | null }>;
  let rafQueue: FrameRequestCallback[];
  let originalRAF: typeof requestAnimationFrame;
  let originalFetch: typeof fetch;

  const flushRaf = () => {
    const queue = [...rafQueue];
    rafQueue = [];
    queue.forEach(cb => cb(performance.now()));
  };

  beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    document.documentElement.removeAttribute('style');
    localStorage.clear();

    originalPushState = window.history.pushState.bind(window.history);
    pushStateCalls = [];
    window.history.pushState = ((state: any, title: string, url?: string | URL | null) => {
      pushStateCalls.push({ state, title, url });
    }) as History['pushState'];

    rafQueue = [];
    originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    }) as typeof requestAnimationFrame;

    originalFetch = globalThis.fetch;
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();

    window.history.pushState = originalPushState;
    window.requestAnimationFrame = originalRAF;
    globalThis.fetch = originalFetch;

    document.body.innerHTML = '';
    document.head.innerHTML = '';
    localStorage.clear();
  });

  it('guards back-button sentinel push so repeated apply does not stack history entries', () => {
    service.updateSettings({ backButtonClosesNote: true });
    service.apply();
    service.apply();

    expect(pushStateCalls.length).toBe(1);
    expect(pushStateCalls[0]?.state).toEqual({ blinkoPlugin: true });
  });

  it('redirects a single tap on <p> content to the opener element', () => {
    const card = document.createElement('article');
    card.className = 'note-card';

    const title = document.createElement('h2');
    title.textContent = 'Open me';

    const body = document.createElement('p');
    body.textContent = 'tap content';

    card.appendChild(title);
    card.appendChild(body);
    document.body.appendChild(card);

    let titleClicks = 0;
    title.addEventListener('click', () => {
      titleClicks += 1;
    });

    service.updateSettings({ singleTapOpenNote: true });

    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(titleClicks).toBe(1);
    expect(card.dataset.opening).toBe('true');

    flushRaf();
    expect(card.dataset.opening).toBeUndefined();
  });

  it('uses dataset re-entry guard to avoid synthetic click loops', () => {
    const card = document.createElement('article');
    card.className = 'note-card';

    const title = document.createElement('h2');
    title.textContent = 'Open me';

    const body = document.createElement('p');
    body.textContent = 'tap content';

    card.appendChild(title);
    card.appendChild(body);
    document.body.appendChild(card);

    let titleClicks = 0;
    title.addEventListener('click', () => {
      titleClicks += 1;
      card.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    service.updateSettings({ singleTapOpenNote: true });

    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(titleClicks).toBe(1);
  });

  it('keeps compact-datetime selectors scoped (regression check against CSS content)', () => {
    const css = readFileSync(join(process.cwd(), 'src/assets/styles/Blinko-UIUX.css'), 'utf8');

    expect(css).toContain('.blinko-compact-datetime [class*="note-card"] [class*="meta"]');
    expect(css).toContain('.blinko-compact-datetime [class*="blinko-card"] [class*="footer"]');
    expect(css).not.toContain('.card-masonry-grid [class*="flex"][class*="col"]');
  });

  it('debounces MutationObserver callback work under rapid mutations', async () => {
    const originalQuerySelectorAll = document.querySelectorAll.bind(document);
    let queryCalls = 0;
    document.querySelectorAll = ((selectors: string) => {
      if (selectors.includes('[data-single-tap')) queryCalls += 1;
      return originalQuerySelectorAll(selectors);
    }) as Document['querySelectorAll'];

    const callbacks: MutationCallback[] = [];
    const OriginalMO = globalThis.MutationObserver;
    globalThis.MutationObserver = class {
      constructor(cb: MutationCallback) {
        callbacks.push(cb);
      }
      observe() {}
      disconnect() {}
      takeRecords() { return []; }
    } as any;

    service.updateSettings({ singleTapOpenNote: true });

    for (let i = 0; i < 25; i += 1) {
      callbacks.forEach(cb => cb([], {} as MutationObserver));
    }

    await new Promise(r => setTimeout(r, 30));

    document.querySelectorAll = originalQuerySelectorAll as Document['querySelectorAll'];
    globalThis.MutationObserver = OriginalMO;

    expect(queryCalls).toBeLessThanOrEqual(3);
  });

  it('closes note when tapping outside and removes outside listener on destroy', () => {
    const expanded = document.createElement('div');
    expanded.className = 'note-expanded';
    expanded.setAttribute('data-open', 'true');
    document.body.appendChild(expanded);

    service.updateSettings({ backButtonClosesNote: true });

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(expanded.getAttribute('data-open')).toBe('false');

    service.destroy();

    expanded.setAttribute('data-open', 'true');
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(expanded.getAttribute('data-open')).toBe('true');
  });

  it('applies reduced vertical spacing class and custom property values', () => {
    service.updateSettings({ compactMode: true, noteLineHeight: 1.25 });

    expect(document.body.classList.contains('blinko-compact-mode')).toBeTrue();
    expect(document.documentElement.style.getPropertyValue('--blinko-line-height')).toBe('1.25');
  });

  it('shows toast on AI 401 responses and restores fetch on destroy', async () => {
    const baseFetch = globalThis.fetch;
    const toastEvents: CustomEvent[] = [];

    window.addEventListener('blinko-toast', (event) => {
      toastEvents.push(event as CustomEvent);
    });

    globalThis.fetch = (async () => new Response('{}', { status: 401 })) as typeof fetch;

    service.apply();
    await globalThis.fetch('/api/trpc/ai.writing');

    expect(toastEvents.length).toBe(1);

    service.destroy();
    expect(globalThis.fetch).toBe(baseFetch);
  });
});
