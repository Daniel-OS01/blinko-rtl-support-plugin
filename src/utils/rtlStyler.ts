import { RTLDetector } from './rtlDetector';
import { debounce } from './debounce';

export interface RTLStyleConfig {
  autoDetect: boolean;
  forceDirection: 'auto' | 'rtl' | 'ltr';
  applyToSelectors: string[];
}

export class RTLStyler {
  private config: RTLStyleConfig;
  private detector: RTLDetector;
  private observer: MutationObserver | null = null;
  private styleSheet: CSSStyleSheet | null = null;
  private debouncedProcessElement: (element: HTMLElement) => void;

  constructor(
    detector: RTLDetector,
    config: RTLStyleConfig = {
      autoDetect: true,
      forceDirection: 'auto',
      applyToSelectors: [
        '.note-content',
        '.note-editor',
        'textarea',
        '.markdown-content',
        '.note-text',
      ],
    }
  ) {
    this.detector = detector;
    this.config = config;
    this.injectRTLStyles();
    this.debouncedProcessElement = debounce(this.processElement.bind(this), 150);
  }

  /**
   * Inject RTL CSS styles into document
   */
  private injectRTLStyles(): void {
    if (document.getElementById('blinko-rtl-styles')) return;

    const style = document.createElement('style');
    style.id = 'blinko-rtl-styles';
    style.textContent = `
      /* RTL Content Styling */
      .blinko-rtl-content {
        direction: rtl !important;
        text-align: right !important;
        font-family: 'Noto Sans Hebrew', 'Tahoma', 'Arial', sans-serif;
      }

      .blinko-ltr-content {
        direction: ltr !important;
        text-align: left !important;
      }

      /* RTL specific adjustments */
      .blinko-rtl-content input,
      .blinko-rtl-content textarea {
        text-align: right;
        direction: rtl;
      }

      .blinko-rtl-content .note-editor {
        text-align: right;
        direction: rtl;
      }

      /* Mixed content support */
      .blinko-mixed-content {
        unicode-bidi: embed;
      }

      /* RTL toolbar adjustments */
      .blinko-rtl-content .toolbar {
        flex-direction: row-reverse;
      }

      /* RTL button alignment */
      .blinko-rtl-content .button-group {
        flex-direction: row-reverse;
      }

      /* RTL icons that should flip */
      .blinko-rtl-content .icon-arrow-left {
        transform: scaleX(-1);
      }

      .blinko-rtl-content .icon-arrow-right {
        transform: scaleX(-1);
      }

      /* Margin and padding adjustments */
      .blinko-rtl-content .note-item {
        padding-right: 1em;
        padding-left: 0.5em;
      }

      /* Animation support for direction changes */
      .blinko-direction-transition {
        transition: all 0.2s ease-in-out;
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Apply RTL styling to element
   */
  public applyRTL(element: HTMLElement, isRTL: boolean): void {
    if (this.config.forceDirection !== 'auto') {
      isRTL = this.config.forceDirection === 'rtl';
    }

    element.classList.remove('blinko-rtl-content', 'blinko-ltr-content');
    element.classList.add('blinko-direction-transition');

    if (isRTL) {
      element.classList.add('blinko-rtl-content');
      element.setAttribute('dir', 'rtl');
    } else {
      element.classList.add('blinko-ltr-content');
      element.setAttribute('dir', 'ltr');
    }
  }

  /**
   * Start observing DOM for changes
   */
  public startObserving(): void {
    if (this.observer) return;

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.debouncedProcessElement(node as HTMLElement);
            }
          });
        } else if (mutation.type === 'characterData') {
          const element = mutation.target.parentElement;
          if (element) {
            this.debouncedProcessElement(element);
          }
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  /**
   * Stop observing DOM changes
   */
  public stopObserving(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Process element for RTL detection and styling
   */
  private processElement(element: HTMLElement): void {
    if (!this.config.autoDetect) return;

    const matchesSelector = this.config.applyToSelectors.some(
      (selector) => element.matches?.(selector) || element.querySelector?.(selector)
    );

    if (matchesSelector) {
      const text =
        element.textContent || (element as HTMLInputElement).value || '';
      if (text) {
        const isRTL = this.detector.detectRTL(text);
        this.applyRTL(element, isRTL);
      }
    }
  }

  /**
   * Update styler configuration
   */
  public updateConfig(config: Partial<RTLStyleConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Clean up styles and observers
   */
  public destroy(): void {
    this.stopObserving();
    const styleElement = document.getElementById('blinko-rtl-styles');
    if (styleElement) {
      styleElement.remove();
    }
  }
}
