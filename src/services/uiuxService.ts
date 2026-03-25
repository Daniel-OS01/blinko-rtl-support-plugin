/**
 * UIUXService
 * ============
 * Manages UI/UX enhancement settings for the Blinko RTL Support plugin.
 *
 * Responsibilities:
 *  - Persist UIUXSettings to localStorage
 *  - Apply / remove body classes and CSS custom properties that drive
 *    Blinko-UIUX.css
 *  - Attach / detach single-tap note-open listeners
 *  - Intercept the Android hardware back button to close expanded notes
 */

import { UIUXSettings, DEFAULT_UIUX_SETTINGS } from '../types';

const STORAGE_KEY = 'blinko-uiux-settings';
const STYLE_TAG_ID = 'blinko-uiux-dynamic-styles';

export class UIUXService {
  private settings: UIUXSettings;
  private singleTapCleanup: (() => void) | null = null;
  private backButtonCleanup: (() => void) | null = null;
  private originalFetch: typeof window.fetch | null = null;
  private aiInterceptorActive = false;
  /** Tracks whether we have already pushed the initial sentinel history entry. */
  private backButtonInitialized = false;

  constructor() {
    this.settings = this.load();
  }

  // ─── Persistence ────────────────────────────────────────────────────

  private load(): UIUXSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_UIUX_SETTINGS, ...JSON.parse(raw) };
      }
    } catch {
      // ignore parse errors
    }
    return { ...DEFAULT_UIUX_SETTINGS };
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // ignore quota errors
    }
  }

  getSettings(): UIUXSettings {
    return { ...this.settings };
  }

  updateSettings(partial: Partial<UIUXSettings>): void {
    this.settings = { ...this.settings, ...partial };
    this.persist();
    this.apply();
    window.dispatchEvent(
      new CustomEvent('blinko-uiux-settings-changed', { detail: this.settings })
    );
  }

  // ─── Apply all settings to the DOM ──────────────────────────────────

  apply(): void {
    this.applyBodyClasses();
    this.applyCustomProperties();
    this.applyDynamicStyles();
    this.applySingleTap();
    this.applyBackButton();
    if (this.settings.interceptAIErrors) {
      this.applyAIErrorInterceptor();
    } else {
      this.restoreAIErrorInterceptor();
    }
  }

  // ─── Body class helpers ──────────────────────────────────────────────

  private toggle(cls: string, on: boolean): void {
    document.body.classList.toggle(cls, on);
  }

  private applyBodyClasses(): void {
    const s = this.settings;
    this.toggle('blinko-compact-datetime', s.compactDatetime);
    this.toggle('blinko-touch-targets', s.minTouchTargets);
    this.toggle('blinko-reduce-motion', s.reduceMotion);
    this.toggle('blinko-high-contrast', s.highContrast);
    this.toggle('blinko-focus-indicators', s.focusIndicators);
    this.toggle('blinko-compact-mode', s.compactMode);
    this.toggle('blinko-toolbar-labels', s.showToolbarLabels);
    this.toggle('blinko-custom-typography', true); // always; values driven by props
    this.toggle('blinko-custom-icons', true);
    this.toggle('blinko-custom-cards', true);
    this.toggle('blinko-back-closes-note', s.backButtonClosesNote);
  }

  // ─── CSS custom properties ───────────────────────────────────────────

  private applyCustomProperties(): void {
    const s = this.settings;
    const root = document.documentElement;
    root.style.setProperty('--blinko-datetime-fs', `${s.datetimeFontSize}px`);
    root.style.setProperty('--blinko-line-height', String(s.noteLineHeight));
    root.style.setProperty('--blinko-icon-size', `${s.toolbarIconSize}px`);
    root.style.setProperty('--blinko-mobile-icon-size', `${s.mobileToolbarIconSize}px`);
    root.style.setProperty('--blinko-touch-size', `${s.touchTargetSize}px`);
    root.style.setProperty('--blinko-card-radius', `${s.cardBorderRadius}px`);

    const shadowMap: Record<UIUXSettings['shadowIntensity'], string> = {
      none:   'none',
      subtle: '0 1px 3px rgba(0,0,0,.08)',
      normal: '0 1px 4px rgba(0,0,0,.12)',
      strong: '0 4px 12px rgba(0,0,0,.25)',
    };
    root.style.setProperty('--blinko-shadow', shadowMap[s.shadowIntensity]);
  }

  // ─── Dynamic style tag ───────────────────────────────────────────────

  private applyDynamicStyles(): void {
    let tag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement('style');
      tag.id = STYLE_TAG_ID;
      document.head.appendChild(tag);
    }
    tag.textContent = this.buildDynamicCSS();
  }

  private buildDynamicCSS(): string {
    // All pure-value overrides live here (no class toggles needed)
    return '';
  }

  // ─── Single-tap note open ────────────────────────────────────────────

  private applySingleTap(): void {
    // Clean up existing listener first
    if (this.singleTapCleanup) {
      this.singleTapCleanup();
      this.singleTapCleanup = null;
    }

    if (!this.settings.singleTapOpenNote) {
      // Remove all data-single-tap markers
      document
        .querySelectorAll<HTMLElement>('[data-single-tap="true"]')
        .forEach(el => el.removeAttribute('data-single-tap'));
      return;
    }

    // Mark note cards and attach click listeners
    const markAndListen = () => {
      // Selector covers both Blinko and Blinko Article card types
      const cards = document.querySelectorAll<HTMLElement>(
        '[class*="note-card"]:not([data-single-tap]), ' +
        '[class*="blinko-card"]:not([data-single-tap]), ' +
        '.card-masonry-grid > div > div:not([data-single-tap])'
      );

      cards.forEach(card => {
        card.setAttribute('data-single-tap', 'true');

        const handler = (e: MouseEvent) => {
          // Don't intercept clicks on interactive children (buttons, links, etc.)
          const target = e.target as HTMLElement;
          if (target.closest('button, a, input, textarea, [role="button"]')) return;

          // Re-entry guard: prevents the synthetic openBtn.click() from
          // re-triggering this handler and causing dual-event firing.
          if (card.dataset.opening) return;

          // Find the primary note-opener. Deliberately excludes <p> — paragraphs
          // are content, not openers; including them caused (a) the target===openBtn
          // dead-end when tapping text and (b) infinite synthetic-click loops.
          const openBtn = card.querySelector<HTMLElement>(
            '[class*="open"], [class*="expand"], [class*="title"], h1, h2, h3'
          );

          if (openBtn && openBtn !== target && !openBtn.contains(target as Node)) {
            // Target is content (e.g. <p>) but opener is a heading/title — redirect.
            card.dataset.opening = 'true';
            openBtn.click();
            requestAnimationFrame(() => { delete card.dataset.opening; });
          }
          // If target IS the opener (user tapped the title directly) the native
          // click already fired; no synthetic click needed.
        };

        (card as any)._uiuxClickHandler = handler;
        card.addEventListener('click', handler);
      });
    };

    markAndListen();

    // Watch for new cards added to the DOM
    const observer = new MutationObserver(markAndListen);
    observer.observe(document.body, { childList: true, subtree: true });

    this.singleTapCleanup = () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>('[data-single-tap="true"]').forEach(card => {
        const handler = (card as any)._uiuxClickHandler;
        if (handler) card.removeEventListener('click', handler);
        card.removeAttribute('data-single-tap');
        delete (card as any)._uiuxClickHandler;
      });
    };
  }

  // ─── Back button closes note (Android / web) ─────────────────────────

  private applyBackButton(): void {
    if (this.backButtonCleanup) {
      this.backButtonCleanup();
      this.backButtonCleanup = null;
    }

    if (!this.settings.backButtonClosesNote) return;

    // Push ONE sentinel entry so there is always something to pop back to.
    // This is intentionally guarded so that repeated apply() / updateSettings()
    // calls (e.g. on every settings change) do NOT accumulate dummy entries.
    // Accumulating entries was the root cause of the "logout blocked" defect —
    // users had to press back N times (one per settings update) before the
    // browser's real navigation took effect.
    if (!this.backButtonInitialized) {
      history.pushState({ blinkoPlugin: true }, '', window.location.href);
      this.backButtonInitialized = true;
    }

    const handler = (_e: PopStateEvent) => {
      // NOTE: popstate is NOT cancelable; e.preventDefault() has no effect and
      // has been removed to avoid confusion.

      // Look for any expanded / modal overlay that is currently visible.
      const overlay = document.querySelector<HTMLElement>(
        '[class*="expanded"]:not([style*="display: none"]), ' +
        '[class*="modal"]:not([style*="display: none"]), ' +
        '[class*="overlay"]:not([style*="display: none"]):not([id*="root"])'
      );

      if (overlay) {
        // Re-push the sentinel BEFORE closing the overlay so that the next
        // back press is also intercepted.
        history.pushState({ blinkoPlugin: true }, '', window.location.href);

        // Try to find and click a close button.
        const closeBtn = overlay.querySelector<HTMLElement>(
          '[class*="close"], [aria-label*="close" i], [aria-label*="dismiss" i], ' +
          'button[class*="X"], button svg[data-icon="x"]'
        );
        if (closeBtn) {
          closeBtn.click();
        } else {
          // Fallback: dispatch Escape key event.
          overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        }
      }
      // When no overlay is open the popstate is allowed to proceed normally —
      // the browser navigates back, enabling logout and regular back-navigation.
    };

    window.addEventListener('popstate', handler);

    this.backButtonCleanup = () => {
      window.removeEventListener('popstate', handler);
      this.backButtonInitialized = false;
    };
  }

  // ─── AI 401 interceptor ──────────────────────────────────────────────

  private isAIEndpointUrl(url: string): boolean {
    const normalized = url.toLowerCase();
    return (
      normalized.includes('ai.autotag') ||
      normalized.includes('ai.writing') ||
      normalized.includes('/trpc/ai')
    );
  }

  private extractFetchUrl(input: RequestInfo | URL): string {
    if (typeof input === 'string') return input;
    if (input instanceof URL) return input.toString();
    if (input instanceof Request) return input.url;
    return String(input);
  }

  private applyAIErrorInterceptor(): void {
    if (this.aiInterceptorActive) return;

    this.originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const response = await this.originalFetch!(input, init);
      const url = this.extractFetchUrl(input);

      if (response.status === 401 && this.isAIEndpointUrl(url)) {
        window.Blinko?.toast?.error(
          '🔐 AI request was unauthorized (401). Please sign in again, then retry AI Writing / Auto-Tag.'
        );
      }

      return response;
    };

    this.aiInterceptorActive = true;
  }

  private restoreAIErrorInterceptor(): void {
    if (!this.aiInterceptorActive || !this.originalFetch) return;
    window.fetch = this.originalFetch;
    this.originalFetch = null;
    this.aiInterceptorActive = false;
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────

  destroy(): void {
    if (this.singleTapCleanup) this.singleTapCleanup();
    if (this.backButtonCleanup) this.backButtonCleanup();
    this.restoreAIErrorInterceptor();

    // Remove all body classes
    const classes = [
      'blinko-compact-datetime', 'blinko-touch-targets', 'blinko-reduce-motion',
      'blinko-high-contrast', 'blinko-focus-indicators', 'blinko-compact-mode',
      'blinko-toolbar-labels', 'blinko-custom-typography', 'blinko-custom-icons',
      'blinko-custom-cards', 'blinko-back-closes-note',
    ];
    classes.forEach(c => document.body.classList.remove(c));

    // Remove CSS custom properties
    const props = [
      '--blinko-datetime-fs', '--blinko-line-height', '--blinko-icon-size',
      '--blinko-mobile-icon-size', '--blinko-touch-size', '--blinko-card-radius',
      '--blinko-shadow',
    ];
    props.forEach(p => document.documentElement.style.removeProperty(p));

    // Remove dynamic style tag
    document.getElementById(STYLE_TAG_ID)?.remove();
  }
}
