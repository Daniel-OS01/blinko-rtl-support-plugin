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
 *  - Close note editor when clicking outside it (tap-outside)
 *  - Intercept AI 401 errors and show actionable guidance toasts
 */

import { UIUXSettings, DEFAULT_UIUX_SETTINGS } from '../types';
import { debounce } from '../utils/debounce';

const STORAGE_KEY = 'blinko-uiux-settings';
const STYLE_TAG_ID = 'blinko-uiux-dynamic-styles';

export class UIUXService {
  private settings: UIUXSettings;
  private singleTapCleanup: (() => void) | null = null;
  private backButtonCleanup: (() => void) | null = null;
  private tapOutsideCleanup: (() => void) | null = null;
  private aiInterceptorCleanup: (() => void) | null = null;
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
    this.applyTapOutsideClose();
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
    this.toggle('blinko-reduce-vspacing', s.reduceVerticalSpacing);
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
    root.style.setProperty('--blinko-v-padding', `${s.noteListPadding}px`);

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
      // Broad selector covers Blinko quick-note cards, article cards, and any
      // wrapper divs inside the masonry grids.  The `:not([data-single-tap])`
      // guard prevents duplicate handler attachment on already-processed cards.
      const cards = document.querySelectorAll<HTMLElement>(
        '[class*="note-card"]:not([data-single-tap]), ' +
        '[class*="blinko-card"]:not([data-single-tap]), ' +
        '[class*="blinko-note"]:not([data-single-tap]), ' +
        '[class*="note-item"]:not([data-single-tap]), ' +
        '.card-masonry-grid > div > div:not([data-single-tap]), ' +
        '.blog-masonry-grid > div > div:not([data-single-tap])'
      );

      cards.forEach(card => {
        card.setAttribute('data-single-tap', 'true');

        const handler = (e: MouseEvent) => {
          const target = e.target as HTMLElement;

          // Don't intercept clicks on interactive elements — let them handle
          // themselves. Also skip action bars, toolbars, and context menus.
          if (target.closest(
            'button, a, input, textarea, select, ' +
            '[role="button"], [role="menuitem"], [role="menu"], ' +
            '[class*="action"], [class*="toolbar"], [class*="menu"], ' +
            '[class*="tag"], [class*="more"], [class*="dropdown"]'
          )) return;

          // Re-entry guard — prevents our synthetic click from re-triggering
          // this handler and causing a double-open.
          if (card.dataset.opening) return;
          card.dataset.opening = 'true';

          // Strategy: always dispatch the click on the most specific element
          // the user actually tapped, letting React's event bubbling carry it
          // up through the card's onClick handler.  This works for both
          // quick-notes (type 0, no heading) and article notes (type 1, has
          // heading/link opener) because the React onClick is on an ancestor
          // that receives the bubbled event regardless.
          const reactTarget =
            (target.nodeType === Node.TEXT_NODE ? target.parentElement : target) ?? card;

          const syntheticClick = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
          });

          if (reactTarget !== card && card.contains(reactTarget)) {
            reactTarget.dispatchEvent(syntheticClick);
          } else {
            card.dispatchEvent(syntheticClick);
          }

          requestAnimationFrame(() => { delete card.dataset.opening; });
        };

        (card as any)._uiuxClickHandler = handler;
        card.addEventListener('click', handler);
      });
    };

    markAndListen();

    // Watch for new cards added to the DOM.
    // Debounced to prevent excessive callback firing that would otherwise
    // trigger browser-extension MutationObserver feedback loops (e.g. Bitwarden
    // autofill overlay reacting to data-single-tap attribute writes).
    // cancel() is called during cleanup to drop any inflight pending call.
    const debouncedMarkAndListen = debounce(markAndListen, 150);

    const observer = new MutationObserver(debouncedMarkAndListen);
    observer.observe(document.body, { childList: true, subtree: true });

    this.singleTapCleanup = () => {
      debouncedMarkAndListen.cancel();
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

    if (!this.settings.backButtonClosesNote) {
      // Feature explicitly disabled — reset so re-enabling pushes sentinel again.
      this.backButtonInitialized = false;
      return;
    }

    // Push ONE sentinel entry so there is always something to pop back to.
    // Guarded by backButtonInitialized so repeated apply() / updateSettings() calls
    // (triggered by any settings change) do NOT accumulate dummy entries.
    // The flag is intentionally NOT reset in backButtonCleanup — resetting it there
    // would cause a new pushState on every settings save, which was the original
    // "logout blocked" defect.
    if (!this.backButtonInitialized) {
      history.pushState({ blinkoPlugin: true }, '', window.location.href);
      this.backButtonInitialized = true;
    }

    const handler = (_e: PopStateEvent) => {
      // NOTE: popstate is NOT cancelable; e.preventDefault() has no effect and
      // has been removed to avoid confusion.

      // Look for any expanded / modal overlay that is currently visible.
      // Visibility is checked in JS (not CSS :not([style*="..."])) for broad
      // selector-engine compatibility (happy-dom, jsdom, older browsers).
      const findVisibleOverlay = (): HTMLElement | null => {
        const candidates = document.querySelectorAll<HTMLElement>(
          '[class*="expanded"], [class*="modal"], [class*="overlay"]:not([id*="root"])'
        );
        for (const el of Array.from(candidates)) {
          if (el.style.display === 'none' || el.style.visibility === 'hidden') continue;
          return el;
        }
        return null;
      };
      const overlay = findVisibleOverlay();

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
    };
  }

  // ─── Tap outside to close note ───────────────────────────────────────
  //
  // Closes the Blinko note editor when the user clicks/taps outside the
  // editor container — replicating the behavior already present on the
  // Blinko Article note type.
  //
  // Uses 'mousedown' (capture phase) to match how most modal libraries
  // implement outside-click detection.

  private applyTapOutsideClose(): void {
    if (this.tapOutsideCleanup) {
      this.tapOutsideCleanup();
      this.tapOutsideCleanup = null;
    }

    if (!this.settings.tapOutsideClosesNote) return;

    const findActiveOverlay = (): HTMLElement | null =>
      document.querySelector<HTMLElement>(
        '[class*="editor-container"]:not([style*="display: none"]), ' +
        '[class*="note-editor"]:not([style*="display: none"]), ' +
        '[class*="blinko-editor"]:not([style*="display: none"]), ' +
        '[class*="dialog-content"]:not([style*="display: none"]), ' +
        '[class*="modal-content"]:not([style*="display: none"])'
      );

    const closeViaButtonOrEscape = (scope: HTMLElement): void => {
      const closeBtn =
        scope.querySelector<HTMLElement>('[class*="close"], [aria-label*="close" i], button[data-dismiss]') ??
        document.querySelector<HTMLElement>('.modal-close');
      if (closeBtn) {
        closeBtn.click();
      } else {
        // Fallback: Escape with bubbles:true propagates up from scope to document
        scope.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      }
    };

    const handler = (e: MouseEvent): void => {
      const overlay = findActiveOverlay();
      if (!overlay) return;
      if (!overlay.contains(e.target as Node)) {
        closeViaButtonOrEscape(overlay);
      }
    };

    document.addEventListener('mousedown', handler, true);
    document.body.classList.add('blinko-tap-outside-close-active');

    this.tapOutsideCleanup = () => {
      document.removeEventListener('mousedown', handler, true);
      document.body.classList.remove('blinko-tap-outside-close-active');
    };
  }

  // ─── AI 401 Error Interceptor ────────────────────────────────────────
  //
  // The errors "Auto-tag failed: tRPC ai.autoTag failed: 401" and
  // "AI processing failed: AI writing API error: 401" originate from
  // Blinko's core tRPC endpoints — they are NOT plugin calls.
  //
  // Root cause: AI provider API key is not configured in Blinko Settings → AI,
  // or the key has expired / been revoked.
  //
  // This interceptor wraps window.fetch and shows an actionable guidance toast
  // when a 401 is returned from a known AI endpoint. The response is returned
  // completely untouched — no response body/headers are modified.

  private extractFetchUrl(input: RequestInfo | URL): string {
    if (typeof input === 'string') return input;
    if (input instanceof Request) return input.url;
    return String(input);
  }

  private isAIEndpointUrl(url: string): boolean {
    return url.includes('ai.autoTag') || url.includes('ai.writing') || url.includes('/trpc/ai');
  }

  private restoreAIErrorInterceptor(): void {
    if (!this.aiInterceptorCleanup) return;
    this.aiInterceptorCleanup();
    this.aiInterceptorCleanup = null;
  }

  private applyAIErrorInterceptor(): void {
    // Idempotent — only install once per enable-cycle.
    // apply() is called on every updateSettings(); the caller is responsible
    // for calling restoreAIErrorInterceptor() when the setting is toggled off.
    if (this.aiInterceptorCleanup) return;

    const originalFetch = window.fetch;

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const response = await originalFetch(...args);

      if (response.status === 401 && this.isAIEndpointUrl(this.extractFetchUrl(args[0]))) {
        // Defer to next tick so Blinko's own error handler runs first
        setTimeout(() => {
          (window as any).Blinko?.toast?.error?.(
            'AI feature requires an API key. Go to Settings → AI to configure your provider.'
          );
        }, 0);
      }

      return response;
    };

    this.aiInterceptorCleanup = () => {
      window.fetch = originalFetch;
    };
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────

  destroy(): void {
    if (this.singleTapCleanup) this.singleTapCleanup();
    if (this.backButtonCleanup) this.backButtonCleanup();
    if (this.tapOutsideCleanup) this.tapOutsideCleanup();
    if (this.aiInterceptorCleanup) { this.aiInterceptorCleanup(); this.aiInterceptorCleanup = null; }

    // Remove all body classes
    const classes = [
      'blinko-compact-datetime', 'blinko-touch-targets', 'blinko-reduce-motion',
      'blinko-high-contrast', 'blinko-focus-indicators', 'blinko-compact-mode',
      'blinko-toolbar-labels', 'blinko-custom-typography', 'blinko-custom-icons',
      'blinko-custom-cards', 'blinko-back-closes-note', 'blinko-reduce-vspacing',
      'blinko-tap-outside-close-active',
    ];
    classes.forEach(c => document.body.classList.remove(c));

    // Remove CSS custom properties
    const props = [
      '--blinko-datetime-fs', '--blinko-line-height', '--blinko-icon-size',
      '--blinko-mobile-icon-size', '--blinko-touch-size', '--blinko-card-radius',
      '--blinko-shadow', '--blinko-v-padding',
    ];
    props.forEach(p => document.documentElement.style.removeProperty(p));

    // Remove dynamic style tag
    document.getElementById(STYLE_TAG_ID)?.remove();
  }
}
