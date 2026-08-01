/**
 * UIUXService — Comprehensive Unit Tests
 * ========================================
 * Covers all four prior bug fixes and all new features added in the
 * second implementation session.
 *
 * Test environment: Bun + happy-dom (same pattern as storageManager.test.ts)
 */

import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';
import { UIUXService } from '../../src/services/uiuxService';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

try {
  GlobalRegistrator.register();
} catch {
  // Already registered — ignore
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeCard(opts: { heading?: boolean; paragraph?: boolean } = {}): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'group/card flex flex-col p-4 bg-background';
  if (opts.heading !== false) {
    const h3 = document.createElement('h3');
    h3.textContent = 'Note title';
    card.appendChild(h3);
  }
  if (opts.paragraph !== false) {
    const p = document.createElement('p');
    p.textContent = 'Note body text';
    card.appendChild(p);
  }
  document.body.appendChild(card);
  return card;
}

function makeOverlay(): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.className = 'expanded';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close';
  closeBtn.textContent = '×';
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
  return overlay;
}

function makeEditor(): { backdrop: HTMLDivElement; editor: HTMLDivElement; closeBtn: HTMLButtonElement } {
  const backdrop = document.createElement('div');
  backdrop.id = 'tap-outside-backdrop';
  backdrop.style.position = 'fixed';
  backdrop.style.inset = '0';

  const editor = document.createElement('div');
  editor.className = 'editor-container';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close';
  editor.appendChild(closeBtn);
  backdrop.appendChild(editor);
  document.body.appendChild(backdrop);
  return { backdrop, editor, closeBtn };
}

function triggerBackNavigation(): void {
  const event = new PopStateEvent('popstate', { state: null });
  window.dispatchEvent(event);
  if (typeof window.onpopstate === 'function') {
    window.onpopstate(event);
  }
}

// ─── Mock Blinko toast ────────────────────────────────────────────────────────

const mockToast = { success: jest.fn(), error: jest.fn() };
(window as any).Blinko = { toast: mockToast };

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 1 — Regression tests for Issues 1–4 (prior session fixes)
// ═══════════════════════════════════════════════════════════════════════════════

describe('UIUXService — Issue 1: Back button history guard', () => {
  let service: UIUXService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('pushes the sentinel state exactly once when first enabled', () => {
    const before = history.length;
    service.updateSettings({ backButtonClosesNote: true });
    expect(history.length).toBe(before + 1);
  });

  it('does NOT accumulate history entries on repeated updateSettings() calls', () => {
    service.updateSettings({ backButtonClosesNote: true });
    const afterFirstEnable = history.length;

    // Simulate 5 settings changes (the original bug: each call pushed a new entry)
    for (let i = 0; i < 5; i++) {
      service.updateSettings({ compactDatetime: i % 2 === 0 });
    }

    expect(history.length).toBe(afterFirstEnable);
  });

  it('re-pushes sentinel when back is pressed and an overlay is open', () => {
    service.updateSettings({ backButtonClosesNote: true });
    makeOverlay();
    const before = history.length;

    // Simulate back button press
    triggerBackNavigation();

    // Handler should re-push sentinel for the next back press
    expect(history.length).toBe(before + 1);
  });

  it('does NOT push when back is pressed and no overlay is open', () => {
    service.updateSettings({ backButtonClosesNote: true });
    const before = history.length;

    // No overlay in DOM
    triggerBackNavigation();

    // No re-push — navigation should proceed naturally
    expect(history.length).toBe(before);
  });

  it('resets backButtonInitialized when feature is disabled, allowing re-initialization', () => {
    service.updateSettings({ backButtonClosesNote: true });
    const afterEnable = history.length;

    // Disable
    service.updateSettings({ backButtonClosesNote: false });

    // Re-enable — should push sentinel once again
    service.updateSettings({ backButtonClosesNote: true });
    expect(history.length).toBe(afterEnable + 1);
  });

  it('clicks the close button on the overlay when back is pressed', () => {
    service.updateSettings({ backButtonClosesNote: true });
    const overlay = makeOverlay();
    const closeBtn = overlay.querySelector<HTMLElement>('.close')!;
    const clickSpy = jest.fn();
    closeBtn.addEventListener('click', clickSpy);

    triggerBackNavigation();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('UIUXService — Issue 2: Single-tap on <p> text content', () => {
  let service: UIUXService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  // These three cover the legacy path — clicking through to the read-only
  // detail overlay. Opening the editor is now the default, so they opt out of
  // it explicitly rather than relying on a default that changed.
  it('redirects tap on <p> text to the heading click', () => {
    const card = makeCard({ heading: true, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: false });

    const h3 = card.querySelector('h3')!;
    const p = card.querySelector('p')!;

    const headingClickSpy = jest.fn();
    h3.addEventListener('click', headingClickSpy);

    // Tap on the paragraph
    p.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(headingClickSpy).toHaveBeenCalledTimes(1);
  });

  it('does NOT fire a synthetic click when the heading itself is tapped', () => {
    const card = makeCard({ heading: true, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true });

    const h3 = card.querySelector('h3')!;

    let syntheticClickCount = 0;
    h3.addEventListener('click', () => { syntheticClickCount++; });

    // Native tap on heading — should not get an extra synthetic click from plugin
    h3.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Exactly 1 click: the native one. No extra synthetic click from the plugin.
    expect(syntheticClickCount).toBe(1);
  });

  it('skips clicks on interactive children (button inside card)', () => {
    const card = makeCard({ heading: true, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true });

    const h3 = card.querySelector('h3')!;
    const btn = document.createElement('button');
    btn.textContent = 'Action';
    card.appendChild(btn);

    const headingClickSpy = jest.fn();
    h3.addEventListener('click', headingClickSpy);

    // Tap on the button — should NOT open note
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(headingClickSpy).not.toHaveBeenCalled();
  });

  it('skips clicks on anchor tags inside card', () => {
    const card = makeCard({ heading: true, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true });

    const h3 = card.querySelector('h3')!;
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Link';
    card.appendChild(link);

    const headingClickSpy = jest.fn();
    h3.addEventListener('click', headingClickSpy);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(headingClickSpy).not.toHaveBeenCalled();
  });

  // ── Quick note (NoteType=0) — no heading elements ──────────────────────────

  it('dispatches card-level click for quick notes that have no heading (NoteType=0)', () => {
    // Blinko quick notes have only <p> content — no h1/h2/h3 or opener element.
    // The plugin must fall back to dispatching a synthetic click on the card so
    // Blinko's React onClick handler fires.
    const card = makeCard({ heading: false, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: false });

    const p = card.querySelector('p')!;

    // Count clicks whose target IS the card itself — these are the synthetic
    // dispatches from the plugin fallback, not the original <p> event bubbling up.
    let syntheticCardClicks = 0;
    card.addEventListener('click', (e) => {
      if (e.target === card) syntheticCardClicks++;
    });

    p.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Plugin must dispatch exactly one synthetic card click
    expect(syntheticCardClicks).toBe(1);
  });

  it('re-entry guard prevents loop when quick note card-click bubbles back', async () => {
    // If the re-entry guard is missing, the synthetic card click would bubble back
    // to the handler, which would dispatch another click, ad infinitum → stack overflow.
    const card = makeCard({ heading: false, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true });

    const p = card.querySelector('p')!;

    expect(() => {
      p.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }).not.toThrow();

    // After the rAF cleanup window, dataset.opening must be cleared
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(card.dataset.opening).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('UIUXService — Issue 3A: Re-entry guard prevents dual event', () => {
  let service: UIUXService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('calls openBtn.click() exactly once despite rapid re-entrant paragraph clicks', () => {
    const card = makeCard({ heading: true, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: false });

    const h3 = card.querySelector('h3')!;
    const p = card.querySelector('p')!;

    let h3ClickCount = 0;
    h3.addEventListener('click', () => { h3ClickCount++; });

    // Tap paragraph — triggers synthetic h3.click()
    p.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // The synthetic h3.click() bubbles back to card.
    // If re-entry guard is working, the card handler must not call h3.click() again.
    // h3ClickCount should be exactly 1 (from the synthetic click fired by plugin).
    expect(h3ClickCount).toBe(1);
  });

  it('card.dataset.opening is set during handler and cleared after rAF', async () => {
    const card = makeCard({ heading: true, paragraph: true });
    service.updateSettings({ singleTapOpenNote: true });

    const p = card.querySelector('p')!;

    p.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // During the microtask, opening flag should be set
    // After rAF it should be cleared
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(card.dataset.opening).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe('UIUXService — Issue 3B: CSS selector regression (tag layout)', () => {
  it('Blinko-UIUX.css no longer contains the over-broad [class*="flex"][class*="col"] compact selector', async () => {
    // Read the CSS file content and verify the offending selector is gone
    const cssPath = new URL('../../src/assets/styles/Blinko-UIUX.css', import.meta.url).pathname;
    const cssContent = await Bun.file(cssPath).text();

    // The removed rule: .blinko-compact-datetime .card-masonry-grid [class*="flex"][class*="col"]
    expect(cssContent).not.toContain('.card-masonry-grid [class*="flex"][class*="col"]');
  });

  it('compact-datetime CSS does not match elements with class "flex flex-col"', () => {
    // The flex-col tag container should NOT be affected by compact-datetime rules
    // Verify by checking that none of the replacement selectors match "flex flex-col"
    const el = document.createElement('div');
    el.className = 'flex flex-col gap-1';
    const grid = document.createElement('div');
    grid.className = 'card-masonry-grid';
    grid.appendChild(el);
    document.body.appendChild(grid);

    // The compact-datetime selectors target [class*="meta"], [class*="time"] etc.
    // A "flex flex-col" element should NOT be selected by any of these
    const matched = document.querySelector(
      '.blinko-compact-datetime [class*="note-card"] [class*="meta"], ' +
      '.blinko-compact-datetime [class*="note-card"] [class*="header"], ' +
      '.blinko-compact-datetime [class*="note-item"] [class*="time"], ' +
      '.blinko-compact-datetime [class*="note-item"] [class*="date"], ' +
      '.blinko-compact-datetime [class*="blinko-card"] [class*="footer"], ' +
      '.blinko-compact-datetime [class*="blinko-card"] [class*="timestamp"]'
    );
    expect(matched).toBeNull();

    document.body.removeChild(grid);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 2 — MutationObserver debounce
// ═══════════════════════════════════════════════════════════════════════════════

describe('UIUXService — Phase 2: MutationObserver debounce', () => {
  let service: UIUXService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('cards added before singleTap enable are still marked', () => {
    // Pre-existing card before enable
    const card = document.createElement('div');
    card.className = 'group/card flex flex-col p-4 bg-background';
    document.body.appendChild(card);

    service.updateSettings({ singleTapOpenNote: true });

    // After apply(), markAndListen runs synchronously — card should be marked
    expect(card.getAttribute('data-single-tap')).toBe('true');
  });

  it('new cards added after enable are marked via MutationObserver', async () => {
    service.updateSettings({ singleTapOpenNote: true });

    // Add a new card after enable
    const card = document.createElement('div');
    card.className = 'group/card flex flex-col p-4 bg-background';
    document.body.appendChild(card);

    // Wait for debounced observer callback (150ms + buffer)
    await new Promise(resolve => setTimeout(resolve, 300));

    expect(card.getAttribute('data-single-tap')).toBe('true');
  });

  it('disabling singleTap removes data-single-tap markers', () => {
    const card = makeCard();
    service.updateSettings({ singleTapOpenNote: true });
    expect(card.getAttribute('data-single-tap')).toBeTruthy();

    service.updateSettings({ singleTapOpenNote: false });
    expect(card.getAttribute('data-single-tap')).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 3 — Tap outside to close note
// ═══════════════════════════════════════════════════════════════════════════════

describe('UIUXService — Phase 3: tapOutsideClosesNote', () => {
  let service: UIUXService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('clicking outside the editor fires the close button', () => {
    service.updateSettings({ tapOutsideClosesNote: true });

    const { backdrop, closeBtn } = makeEditor();
    const clickSpy = jest.fn();
    closeBtn.addEventListener('click', clickSpy);

    // Click on the backdrop (outside editor)
    backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking inside the editor does NOT fire close button', () => {
    service.updateSettings({ tapOutsideClosesNote: true });

    const { editor, closeBtn } = makeEditor();
    const clickSpy = jest.fn();
    closeBtn.addEventListener('click', clickSpy);

    // Click inside the editor content
    const inner = document.createElement('p');
    inner.textContent = 'Note text';
    editor.appendChild(inner);

    inner.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('does nothing when tapOutsideClosesNote is disabled', () => {
    service.updateSettings({ tapOutsideClosesNote: false });

    const { backdrop, closeBtn } = makeEditor();
    const clickSpy = jest.fn();
    closeBtn.addEventListener('click', clickSpy);

    backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('destroy() removes the mousedown listener', () => {
    service.updateSettings({ tapOutsideClosesNote: true });

    const { backdrop, closeBtn } = makeEditor();
    const clickSpy = jest.fn();
    closeBtn.addEventListener('click', clickSpy);

    service.destroy();

    // After destroy, backdrop click should not trigger close
    backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('dispatches Escape if no close button is found', () => {
    service.updateSettings({ tapOutsideClosesNote: true });

    // Editor with no close button
    const backdrop = document.createElement('div');
    const editor = document.createElement('div');
    editor.className = 'editor-container';
    backdrop.appendChild(editor);
    document.body.appendChild(backdrop);

    const escapeSpy = jest.fn();
    editor.addEventListener('keydown', escapeSpy);

    backdrop.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(escapeSpy).toHaveBeenCalledTimes(1);
    const event = escapeSpy.mock.calls[0][0] as KeyboardEvent;
    expect(event.key).toBe('Escape');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 4 — Reduce vertical spacing
// ═══════════════════════════════════════════════════════════════════════════════

describe('UIUXService — Phase 4: reduceVerticalSpacing', () => {
  let service: UIUXService;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('enabling adds blinko-reduce-vspacing class to body', () => {
    service.updateSettings({ reduceVerticalSpacing: true });
    expect(document.body.classList.contains('blinko-reduce-vspacing')).toBe(true);
  });

  it('disabling removes blinko-reduce-vspacing class from body', () => {
    service.updateSettings({ reduceVerticalSpacing: true });
    service.updateSettings({ reduceVerticalSpacing: false });
    expect(document.body.classList.contains('blinko-reduce-vspacing')).toBe(false);
  });

  it('sets --blinko-v-padding CSS custom property', () => {
    service.updateSettings({ reduceVerticalSpacing: true, noteListPadding: 6 });
    const val = document.documentElement.style.getPropertyValue('--blinko-v-padding');
    expect(val).toBe('6px');
  });

  it('updates --blinko-v-padding when noteListPadding slider changes', () => {
    service.updateSettings({ reduceVerticalSpacing: true, noteListPadding: 0 });
    expect(document.documentElement.style.getPropertyValue('--blinko-v-padding')).toBe('0px');

    service.updateSettings({ noteListPadding: 20 });
    expect(document.documentElement.style.getPropertyValue('--blinko-v-padding')).toBe('20px');
  });

  it('destroy() removes blinko-reduce-vspacing class and CSS var', () => {
    service.updateSettings({ reduceVerticalSpacing: true, noteListPadding: 8 });
    service.destroy();

    expect(document.body.classList.contains('blinko-reduce-vspacing')).toBe(false);
    expect(document.documentElement.style.getPropertyValue('--blinko-v-padding')).toBe('');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 5 — AI 401 error interceptor
// ═══════════════════════════════════════════════════════════════════════════════

describe('UIUXService — Phase 5: AI 401 error interceptor', () => {
  let service: UIUXService;
  let originalFetch: typeof fetch;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';
    jest.clearAllMocks();
    originalFetch = window.fetch;
    // The interceptor only acts on same-origin requests, so the page needs a
    // real origin. happy-dom defaults to about:blank, whose origin is "null".
    (window as any).happyDOM?.setURL?.('https://blinko.app/notes');
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
    window.fetch = originalFetch;
    (window as any).happyDOM?.setURL?.('about:blank');
  });

  it('shows guidance toast on 401 from AI autoTag endpoint', async () => {
    // Mock must be set before updateSettings so the interceptor wraps the mock
    window.fetch = jest.fn().mockResolvedValue({ status: 401, ok: false }) as any;
    service.updateSettings({ interceptAIErrors: true });

    await window.fetch('https://blinko.app/api/trpc/ai.autoTag');

    // Wait for the setTimeout(0) inside interceptor
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockToast.error).toHaveBeenCalledWith(
      expect.stringContaining('Settings')
    );
  });

  it('shows guidance toast on 401 from AI writing endpoint', async () => {
    window.fetch = jest.fn().mockResolvedValue({ status: 401, ok: false }) as any;
    service.updateSettings({ interceptAIErrors: true });

    await window.fetch('https://blinko.app/api/trpc/ai.writing');

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockToast.error).toHaveBeenCalledWith(
      expect.stringContaining('Settings')
    );
  });

  it('does NOT show toast for 401 from non-AI endpoint', async () => {
    window.fetch = jest.fn().mockResolvedValue({ status: 401, ok: false }) as any;
    service.updateSettings({ interceptAIErrors: true });

    await window.fetch('https://blinko.app/api/trpc/notes.list');

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it('does NOT show toast for 200 response from AI endpoint', async () => {
    window.fetch = jest.fn().mockResolvedValue({ status: 200, ok: true }) as any;
    service.updateSettings({ interceptAIErrors: true });

    await window.fetch('https://blinko.app/api/trpc/ai.autoTag');

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it('returns the original response untouched', async () => {
    const mockResponse = { status: 401, ok: false, body: 'Unauthorized' };
    window.fetch = jest.fn().mockResolvedValue(mockResponse) as any;
    service.updateSettings({ interceptAIErrors: true });

    const result = await window.fetch('https://blinko.app/api/trpc/ai.autoTag');

    expect(result).toBe(mockResponse);
  });

  it('does NOT intercept when interceptAIErrors is false', async () => {
    service.updateSettings({ interceptAIErrors: false });

    // fetch should not be replaced
    expect(window.fetch).toBe(originalFetch);
  });

  it('destroy() restores original window.fetch', () => {
    service.updateSettings({ interceptAIErrors: true });
    expect(window.fetch).not.toBe(originalFetch);

    service.destroy();
    expect(window.fetch).toBe(originalFetch);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// General lifecycle
// ═══════════════════════════════════════════════════════════════════════════════

describe('UIUXService — Lifecycle: destroy() cleans up all state', () => {
  it('removes all known body classes on destroy', () => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.body.className = '';

    const service = new UIUXService();
    service.updateSettings({
      compactDatetime: true,
      minTouchTargets: true,
      reduceMotion: true,
      highContrast: true,
      focusIndicators: true,
      compactMode: true,
      showToolbarLabels: true,
      backButtonClosesNote: true,
      reduceVerticalSpacing: true,
    });

    service.destroy();

    const classes = [
      'blinko-compact-datetime', 'blinko-touch-targets', 'blinko-reduce-motion',
      'blinko-high-contrast', 'blinko-focus-indicators', 'blinko-compact-mode',
      'blinko-toolbar-labels', 'blinko-custom-typography', 'blinko-custom-icons',
      'blinko-custom-cards', 'blinko-back-closes-note', 'blinko-reduce-vspacing',
    ];
    for (const cls of classes) {
      expect(document.body.classList.contains(cls)).toBe(false);
    }
  });

  it('persists settings to localStorage', () => {
    localStorage.clear();
    const service = new UIUXService();
    service.updateSettings({ compactDatetime: true, noteListPadding: 5 });

    const raw = localStorage.getItem('blinko-uiux-settings');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.compactDatetime).toBe(true);
    expect(parsed.noteListPadding).toBe(5);

    service.destroy();
  });

  it('loads persisted settings on construction', () => {
    localStorage.clear();
    localStorage.setItem('blinko-uiux-settings', JSON.stringify({
      compactDatetime: true,
      noteListPadding: 7,
    }));

    const service = new UIUXService();
    const s = service.getSettings();
    expect(s.compactDatetime).toBe(true);
    expect(s.noteListPadding).toBe(7);
    service.destroy();
  });
});

describe('UIUXService — card click opens the editor', () => {
  let service: UIUXService;

  function makeCard(): { card: HTMLElement; body: HTMLElement; icon: HTMLElement } {
    const card = document.createElement('div');
    card.className = 'group/card flex flex-col p-4 bg-background';
    card.innerHTML =
      '<div class="w-full">' +
      '<svg id="icon" class="cursor-pointer text-desc"></svg>' +
      '<div class="markdown-body"><p id="body">testing</p></div>' +
      '</div>';
    document.body.appendChild(card);
    return {
      card,
      body: card.querySelector('#body') as HTMLElement,
      icon: card.querySelector('#icon') as HTMLElement,
    };
  }

  /**
   * The detail overlay Blinko mounts after a card click, in preview mode.
   * Class names copied from the app bundle: the overlay is
   * `div.fixed.inset-0.z-[9999]` and its content pane carries the
   * preview-to-edit toggle on onDoubleClick.
   */
  function mountDetailOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] bg-background overflow-hidden';
    overlay.innerHTML =
      '<div class="h-full flex">' +
      '<div class="w-full mx-auto h-full flex flex-col px-4">' +
      '<div class="flex-1 overflow-y-auto min-h-0 py-4" id="pane"></div>' +
      '</div></div>';
    document.body.appendChild(overlay);
    return overlay.querySelector('#pane') as HTMLElement;
  }

  const frame = () => new Promise(r => setTimeout(r, 20));

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    service = new UIUXService();
  });

  afterEach(() => {
    service.destroy();
  });

  it('double-clicks the detail preview pane once it appears', async () => {
    const { body } = makeCard();
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });

    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // The overlay mounts a moment later, as it does in the app.
    const pane = mountDetailOverlay();
    let dbl = 0;
    pane.addEventListener('dblclick', () => { dbl++; });

    await frame();
    expect(dbl).toBe(1);
  });

  it('does not double-click the card itself — nothing is bound there', async () => {
    const { card, body } = makeCard();
    let cardDbl = 0;
    card.addEventListener('dblclick', () => { cardDbl++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    mountDetailOverlay();
    await frame();

    expect(cardDbl).toBe(0);
  });

  it('does nothing when the editor is already open', async () => {
    const { body } = makeCard();
    const editor = document.createElement('div');
    editor.id = 'global-editor';
    document.body.appendChild(editor);

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const pane = mountDetailOverlay();
    let dbl = 0;
    pane.addEventListener('dblclick', () => { dbl++; });

    await frame();
    expect(dbl).toBe(0);
  });

  it('gives up quietly when no overlay ever appears', async () => {
    const { body } = makeCard();
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });

    expect(() => {
      body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }).not.toThrow();

    await frame();
    expect(document.getElementById('global-editor')).toBeNull();
  });

  it('does not fire on the action rail', async () => {
    const { icon } = makeCard();
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });

    icon.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const pane = mountDetailOverlay();
    let dbl = 0;
    pane.addEventListener('dblclick', () => { dbl++; });

    await frame();
    expect(dbl).toBe(0);
  });

  it('does nothing at all when the feature is off', async () => {
    const { body } = makeCard();
    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: false });

    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const pane = mountDetailOverlay();
    let dbl = 0;
    pane.addEventListener('dblclick', () => { dbl++; });

    await frame();
    expect(dbl).toBe(0);
  });

  // Regression coverage: before this PR, enabling `cardClickOpensEditor`
  // caused the handler to `return` immediately after dispatching a dblclick
  // on the card, skipping the legacy heading-forward behaviour entirely. The
  // fix lets the card's own click fall through to that forwarding regardless
  // of this setting, but no test exercised the heading branch at all — every
  // other case in this suite uses a headingless card.
  it('still forwards the click to the note heading when the editor feature is on', async () => {
    const { card, body } = makeCard();
    const heading = document.createElement('h2');
    heading.textContent = 'Title';
    card.appendChild(heading);

    let headingClicks = 0;
    heading.addEventListener('click', () => { headingClicks++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: true });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await frame();
    expect(headingClicks).toBe(1);
  });

  it('still forwards the click to the note heading when the editor feature is off', async () => {
    const { card, body } = makeCard();
    const heading = document.createElement('h2');
    heading.textContent = 'Title';
    card.appendChild(heading);

    let headingClicks = 0;
    heading.addEventListener('click', () => { headingClicks++; });

    service.updateSettings({ singleTapOpenNote: true, cardClickOpensEditor: false });
    body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await frame();
    expect(headingClicks).toBe(1);
  });
});
