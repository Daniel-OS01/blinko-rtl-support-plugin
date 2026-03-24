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
      document
        .querySelectorAll<HTMLElement>('[data-single-tap="true"]')
        .forEach(el => el.removeAttribute('data-single-tap'));
      return;
    }

    const markAndListen = () => {
      // Use broad selectors to cover Blinko's masonry card variants
      const cards = document.querySelectorAll<HTMLElement>(
        '[class*="note-card"]:not([data-single-tap]), ' +
        '[class*="blinko-card"]:not([data-single-tap]), ' +
        '.card-masonry-grid > div > div:not([data-single-tap])'
      );

      cards.forEach(card => {
        card.setAttribute('data-single-tap', 'true');

        const handler = (e: MouseEvent) => {
          const target = e.target as HTMLElement;

          // Never intercept clicks on genuinely interactive children
          if (
            target.closest(
              'button, a, input, textarea, ' +
              '[role="button"], [role="menuitem"], [role="menu"], ' +
              '[class*="tag"], [class*="action"], [class*="menu"], ' +
              '[class*="more"], [class*="dots"]'
            )
          ) return;

          // ── FIX FOR BUG 3: stop other handlers on the same element
          //    firing (prevents the context menu from opening simultaneously)
          e.stopImmediatePropagation();

          // ── FIX FOR BUG 2: delegate to the real "open" trigger ──────
          // Strategy 1 — explicit detail/open anchor or button in the card
          const detailTarget = card.querySelector<HTMLElement>(
            'a[href*="/detail"], a[href*="/note/"], ' +
            '[class*="detail-btn"], [class*="detail-link"], ' +
            '[class*="expand-btn"], [class*="open-note"], ' +
            '[data-action="open"], [data-action="detail"], ' +
            '[aria-label*="detail" i], [aria-label*="view detail" i]'
          );

          if (detailTarget && detailTarget !== target) {
            detailTarget.click();
            return;
          }

          // Strategy 2 — dispatch a dblclick on the card content body
          // (Blinko opens notes on double-click in the masonry view)
          const contentArea = card.querySelector<HTMLElement>(
            '.markdown-body, [class*="note-content"], ' +
            '[class*="card-body"], [class*="card-content"]'
          ) ?? card;

          contentArea.dispatchEvent(
            new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window })
          );
        };

        (card as any)._uiuxClickHandler = handler;
        card.addEventListener('click', handler);
      });
    };

    markAndListen();

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

  // ─── Back button closes note (Android) ───────────────────────────────

  private applyBackButton(): void {
    if (this.backButtonCleanup) {
      this.backButtonCleanup();
      this.backButtonCleanup = null;
    }

    if (!this.settings.backButtonClosesNote) return;

    // ── Detect the active overlay / expanded note ────────────────────
    const findOverlay = (): HTMLElement | null => {
      // HeroUI Dialog / Modal (Blinko uses HeroUI components)
      const heroModal = document.querySelector<HTMLElement>(
        '[role="dialog"][aria-modal="true"]:not([hidden]), ' +
        'section[aria-modal="true"]:not([hidden]), ' +
        '[data-slot="base"][role="dialog"]'
      );
      if (heroModal) return heroModal;

      // Next.js route-based note detail overlay
      const noteDetail = document.querySelector<HTMLElement>(
        '[class*="note-detail"]:not([hidden]), ' +
        '[class*="note-view"]:not([hidden]), ' +
        '[class*="expanded-note"]:not([hidden]), ' +
        '[class*="detail-modal"]:not([hidden])'
      );
      if (noteDetail) return noteDetail;

      // Generic accessible dialog fallback
      return document.querySelector<HTMLElement>(
        '[role="dialog"]:not([hidden]):not([aria-hidden="true"])'
      );
    };

    // ── Close the overlay by the most reliable mechanism available ───
    const closeOverlay = (overlay: HTMLElement): void => {
      // 1. HeroUI / Blinko close button
      const closeBtn = overlay.querySelector<HTMLElement>(
        '[data-slot="close-button"], ' +
        'button[aria-label="Close"], button[aria-label="close"], ' +
        'button[aria-label="Dismiss"], button[aria-label="dismiss"], ' +
        '[class*="closeButton"], [class*="close-btn"], [class*="btn-close"]'
      );
      if (closeBtn) { closeBtn.click(); return; }

      // 2. Click the backdrop / overlay background
      const backdrop = document.querySelector<HTMLElement>(
        '[data-slot="backdrop"], ' +
        '[class*="backdrop"]:not([hidden]), ' +
        '[class*="overlay-backdrop"]'
      );
      if (backdrop) { backdrop.click(); return; }

      // 3. Dispatch Escape on both the overlay and the document
      const escOpts: KeyboardEventInit = { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true };
      overlay.dispatchEvent(new KeyboardEvent('keydown', escOpts));
      document.dispatchEvent(new KeyboardEvent('keydown', escOpts));
    };

    const handler = (_e: PopStateEvent) => {
      const overlay = findOverlay();
      if (overlay) {
        closeOverlay(overlay);
        // Re-absorb the next back press only when an overlay was actually closed
        history.pushState({ blinkoPlugin: true }, '', window.location.href);
      }
      // ── FIX FOR LOGOUT BUG: if there is NO overlay we do NOT re-push.
      //    This lets the next back press navigate normally (e.g. to /login).
    };

    // ── FIX: only push the initial sentinel state when not on an auth page.
    //    Pushing while on /login would trap the user on that page.
    const isAuthPage = /\/(login|auth|signin|signup|register)/.test(window.location.pathname);
    if (!isAuthPage) {
      history.pushState({ blinkoPlugin: true }, '', window.location.href);
    }

    window.addEventListener('popstate', handler);

    this.backButtonCleanup = () => {
      window.removeEventListener('popstate', handler);
    };
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────

  destroy(): void {
    if (this.singleTapCleanup) this.singleTapCleanup();
    if (this.backButtonCleanup) this.backButtonCleanup();

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
