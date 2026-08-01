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
import { NOTE_CARD_SELECTOR, INTERACTIVE_SELECTOR } from './blinkoDom';

const STORAGE_KEY = 'blinko-uiux-settings';
const STYLE_TAG_ID = 'blinko-uiux-dynamic-styles';

export class UIUXService {
  private static activeBackButtonHandler: ((e: PopStateEvent) => void) | null = null;
  private static activeOnPopStateHandler: Window['onpopstate'] = null;
  private static previousOnPopStateHandler: Window['onpopstate'] = null;
  private static activeTapOutsideHandler: ((e: MouseEvent) => void) | null = null;
  private static originalFetchRef: typeof window.fetch | null = null;
  private static aiInterceptorInstalled = false;

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
        const stored = JSON.parse(raw) as Partial<UIUXSettings> & { _settingsVersion?: number };
        const merged = { ...DEFAULT_UIUX_SETTINGS, ...stored };

        // v1→v2 migration: force-enable flags that defaulted to false before v2.
        // Existing users have these stored as false, which overrides the new defaults.
        if (!stored._settingsVersion || stored._settingsVersion < 2) {
          merged.compactDatetime = true;
          merged.singleTapOpenNote = true;
          merged.backButtonClosesNote = true;
          merged.tapOutsideClosesNote = true;
          merged.reduceMotion = true;
          merged.interceptAIErrors = true;
          merged._settingsVersion = 2;
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
        }

        return merged;
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
    if (this.singleTapCleanup) {
      this.singleTapCleanup();
      this.singleTapCleanup = null;
    }

    if (!this.settings.singleTapOpenNote) {
      document
        .querySelectorAll<HTMLElement>('[data-single-tap="true"]')
        .forEach(el => el.removeAttribute('data-single-tap'));
      return;
    }

    // Card and interactive-element detection live in blinkoDom.ts, checked
    // against markup captured from the running app. Re-processing is guarded in
    // JS via the _uiuxClickHandler property check rather than by a
    // `:not([data-single-tap])` selector, which happy-dom does not support
    // reliably.

    const markAndListen = () => {
      document.querySelectorAll<HTMLElement>(NOTE_CARD_SELECTOR).forEach(card => {
        // Skip cards already processed — JS guard replaces CSS :not([data-single-tap])
        if ((card as any)._uiuxClickHandler) return;
        card.setAttribute('data-single-tap', 'true');

        const handler = (e: MouseEvent) => {
          const target = e.target as HTMLElement;

          // Skip clicks on interactive elements that are INSIDE the card.
          // The check is scoped to descendants of the card to avoid false positives
          // from body/root classes (e.g. blinko-custom-icons matches [class*="icon"]).
          const ignoreMatch = target.closest(INTERACTIVE_SELECTOR);
          if (ignoreMatch && card.contains(ignoreMatch)) return;

          // Re-entry guard: prevents our synthetic click from re-triggering
          // this handler (the click bubbles back through the card).
          if (card.dataset.opening) return;
          card.dataset.opening = 'true';

          // Find the element that navigates to the note detail view.
          // Priority: heading element > heading/title link > any valid href.
          // Article notes (type 1) have a heading that serves as the navigation
          // target. Quick notes (type 0) have no heading.
          const opener =
            card.querySelector<HTMLElement>('h1, h2, h3, h4') ??
            card.querySelector<HTMLElement>(
              'a[href]:not([href="#"]):not([href^="javascript"])'
            );

          if (opener && opener.contains(target)) {
            // User tapped directly on the opener element — native click already fired; skip.
            requestAnimationFrame(() => { delete card.dataset.opening; });
            return;
          }

          if (opener) {
            opener.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          } else {
            // Quick note: dispatch on the card component so the React onClick
            // fires and triggers navigation.
            card.dispatchEvent(
              new MouseEvent('click', { bubbles: true, cancelable: true, composed: true })
            );
          }

          requestAnimationFrame(() => { delete card.dataset.opening; });
        };

        (card as any)._uiuxClickHandler = handler;
        card.addEventListener('click', handler);
      });
    };

    markAndListen();

    // Watch for new cards added to the DOM. Debounced to prevent excessive
    // callback firing (e.g. Bitwarden autofill overlay reacting to attribute
    // writes). cancel() is called during cleanup to drop inflight calls.
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
        delete card.dataset.opening;
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

    const processedEvents = new WeakSet<Event>();
    const runBackButtonHandler = (_e: PopStateEvent) => {
      if (processedEvents.has(_e)) return;
      processedEvents.add(_e);

      // NOTE: popstate is NOT cancelable; e.preventDefault() has no effect and
      // has been removed to avoid confusion.

      // Look for any expanded / modal overlay that is currently visible.
      // Visibility is checked in JS (not CSS :not([style*="..."])) for broad
      // selector-engine compatibility (happy-dom, jsdom, older browsers).
      const findVisibleOverlay = (): HTMLElement | null => {
        const candidates = document.querySelectorAll<HTMLElement>(
          '[class*="expanded"], [class*="modal"], [class*="overlay"]'
        );
        for (const el of Array.from(candidates)) {
          const id = (el.id || '').toLowerCase();
          if (id.includes('root')) continue;
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
        const closeBtn = Array.from(
          overlay.querySelectorAll<HTMLElement>('button, [class*="close"], [aria-label], [data-dismiss]')
        ).find((el) => {
          const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
          const className = (el.className || '').toString().toLowerCase();
          return (
            className.includes('close') ||
            className.includes('dismiss') ||
            ariaLabel.includes('close') ||
            ariaLabel.includes('dismiss') ||
            el.hasAttribute('data-dismiss')
          );
        }) ?? null;
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

    if (UIUXService.activeBackButtonHandler) {
      window.removeEventListener('popstate', UIUXService.activeBackButtonHandler);
      UIUXService.activeBackButtonHandler = null;
    }
    if (UIUXService.activeOnPopStateHandler && window.onpopstate === UIUXService.activeOnPopStateHandler) {
      window.onpopstate = UIUXService.previousOnPopStateHandler;
      UIUXService.activeOnPopStateHandler = null;
      UIUXService.previousOnPopStateHandler = null;
    }

    const previousOnPopState = window.onpopstate;
    const propertyHandler: NonNullable<Window['onpopstate']> = function (this: WindowEventHandlers, event: PopStateEvent) {
      runBackButtonHandler(event);
      if (typeof previousOnPopState === 'function') {
        previousOnPopState.call(window, event);
      }
    };

    window.addEventListener('popstate', runBackButtonHandler);
    window.onpopstate = propertyHandler;
    UIUXService.activeBackButtonHandler = runBackButtonHandler;
    UIUXService.activeOnPopStateHandler = propertyHandler;
    UIUXService.previousOnPopStateHandler = previousOnPopState;

    this.backButtonCleanup = () => {
      window.removeEventListener('popstate', runBackButtonHandler);
      if (UIUXService.activeBackButtonHandler === runBackButtonHandler) {
        UIUXService.activeBackButtonHandler = null;
      }
      if (window.onpopstate === propertyHandler) {
        window.onpopstate = previousOnPopState;
      }
      if (UIUXService.activeOnPopStateHandler === propertyHandler) {
        UIUXService.activeOnPopStateHandler = null;
        UIUXService.previousOnPopStateHandler = null;
      }
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

    const findActiveOverlay = (): HTMLElement | null => {
      const candidates = document.querySelectorAll<HTMLElement>(
        '[class*="editor-container"], [class*="note-editor"], [class*="blinko-editor"], [class*="dialog-content"], [class*="modal-content"]'
      );
      for (const el of Array.from(candidates)) {
        if (el.style.display === 'none' || el.style.visibility === 'hidden') continue;
        return el;
      }
      return null;
    };

    const closeViaButtonOrEscape = (scope: HTMLElement): void => {
      const closeBtn =
        Array.from(scope.querySelectorAll<HTMLElement>('button, [class*="close"], [aria-label], [data-dismiss]'))
          .find((el) => {
            const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
            const className = (el.className || '').toString().toLowerCase();
            return className.includes('close') || ariaLabel.includes('close') || el.hasAttribute('data-dismiss');
          }) ??
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

    if (UIUXService.activeTapOutsideHandler) {
      document.removeEventListener('mousedown', UIUXService.activeTapOutsideHandler, true);
    }
    document.addEventListener('mousedown', handler, true);
    UIUXService.activeTapOutsideHandler = handler;
    document.body.classList.add('blinko-tap-outside-close-active');

    this.tapOutsideCleanup = () => {
      document.removeEventListener('mousedown', handler, true);
      if (UIUXService.activeTapOutsideHandler === handler) {
        UIUXService.activeTapOutsideHandler = null;
      }
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

  private static readonly AI_PATH_MARKERS = ['ai.autoTag', 'ai.writing', '/trpc/ai'];

  private isAIPath(pathname: string): boolean {
    return UIUXService.AI_PATH_MARKERS.some(marker => pathname.includes(marker));
  }

  /**
   * Decide whether a fetch URL belongs to Blinko's own AI endpoints.
   *
   * Matching on the raw URL string would also match third-party requests that
   * merely contain one of the markers (`https://elsewhere.example/?q=/trpc/ai`),
   * so the check is scoped to same-origin requests and run against the pathname
   * only — the query and fragment are attacker-controllable and carry no
   * routing meaning here.
   *
   * When the page origin cannot be determined (a sandboxed iframe reports
   * `"null"`, and `about:blank` has no meaningful origin) an absolute URL is
   * refused rather than guessed at. This guard decides whether to act on
   * another site's response, so the unknown case has to fail closed.
   */
  private isAIEndpointUrl(urlStr: string): boolean {
    try {
      const pageOrigin = window.location.origin;
      const hasKnownOrigin =
        !!pageOrigin && pageOrigin !== 'null' && !pageOrigin.startsWith('about:');

      // `new URL` without a base succeeds only for absolute URLs.
      let absolute: URL | null = null;
      try {
        absolute = new URL(urlStr);
      } catch {
        absolute = null;
      }

      if (absolute) {
        if (!hasKnownOrigin) return false;
        if (absolute.origin !== pageOrigin) return false;
        return this.isAIPath(absolute.pathname);
      }

      // Relative URL: resolves against the page, so it is same-origin by
      // construction. The base below only supplies a parseable prefix.
      const resolved = new URL(urlStr, hasKnownOrigin ? pageOrigin : 'http://localhost');
      return this.isAIPath(resolved.pathname);
    } catch {
      return false;
    }
  }

  private restoreAIErrorInterceptor(): void {
    if (!this.aiInterceptorCleanup) return;
    this.aiInterceptorCleanup();
    this.aiInterceptorCleanup = null;
  }

  private applyAIErrorInterceptor(): void {
    if (UIUXService.aiInterceptorInstalled && UIUXService.originalFetchRef) {
      window.fetch = UIUXService.originalFetchRef;
      UIUXService.aiInterceptorInstalled = false;
    }
    if (this.aiInterceptorCleanup) {
      this.aiInterceptorCleanup();
      this.aiInterceptorCleanup = null;
    }

    const originalFetch = window.fetch;
    UIUXService.originalFetchRef = originalFetch;

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
      UIUXService.aiInterceptorInstalled = false;
      UIUXService.originalFetchRef = null;
    };
    UIUXService.aiInterceptorInstalled = true;
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
