import { RTLConfig } from '../config';
import { RTLRenderer } from '../renderer';
import { RTLDetector } from './rtlDetector';
import { debounce } from './debounce';

/**
 * Advanced RTL processor for comprehensive text element handling
 */
export class RTLProcessor {
  private config: RTLConfig;
  private renderer: RTLRenderer;
  private detector: RTLDetector;
  private settings: any;
  private observer: MutationObserver | null = null;
  private isEnabled: boolean = false;
  private debouncedProcessAll: () => void;

  constructor(
    config: RTLConfig,
    renderer: RTLRenderer,
    detector: RTLDetector,
    settings: any
  ) {
    this.config = config;
    this.renderer = renderer;
    this.detector = detector;
    this.settings = settings;

    // Debounce the full processing to avoid performance hits
    this.debouncedProcessAll = debounce(() => {
        if (this.isEnabled && this.settings.autoDetect) {
            this.processAllElements();
        }
    }, 500);
  }

  updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
    // Re-process if settings changed
    if (this.isEnabled) {
        this.debouncedProcessAll();
    }
  }

  /**
   * Process a single element
   */
  processElement(element: HTMLElement) {
    if (!element || !this.shouldProcessElement(element)) return;

    // Optimization: Check if already processed and direction is manually set or stable
    if (element.hasAttribute('data-manual-dir')) return;

    const text = this.getElementText(element);
    if (!text.trim() || text.length < (this.settings.minRTLChars || 2)) {
        // If empty or too short, maybe clear or leave as is.
        // Clearing is safer to avoid stale RTL states.
        // But some inputs might be cleared and we don't want them to jump.
        // For now, let's leave it.
        return;
    }

    const isRTL = this.determineDirection(text);

    // Only apply if changed to avoid DOM thrashing
    const currentDir = element.getAttribute('dir') || getComputedStyle(element).direction;
    const targetDir = isRTL ? 'rtl' : 'ltr';

    // We check classList because that's what our renderer uses primarily
    const hasRTLClass = element.classList.contains('rtl-detected');
    const hasLTRClass = element.classList.contains('ltr-detected');

    if (isRTL && !hasRTLClass) {
      this.renderer.applyRTL(element);
    } else if (!isRTL && !hasLTRClass) {
      this.renderer.applyLTR(element);
    }

    // Process child text nodes if mixed content is enabled
    if (this.settings.mixedContent) {
        this.processChildTextNodes(element);
    }
  }

  /**
   * Process child text nodes for mixed content
   */
  private processChildTextNodes(element: HTMLElement) {
    if (!element) return;

    // Use a more specific TreeWalker to avoid traversing everything
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
          acceptNode: (node) => {
              // Skip if parent is already handled or shouldn't be touched
              if (node.parentElement && node.parentElement !== element) {
                  // If parent is a span we created or handled, maybe skip?
                  // For now accept all text nodes.
              }
              return NodeFilter.FILTER_ACCEPT;
          }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      const textNode = node as Text;
      const text = textNode.textContent || '';

      if (text.trim() && this.detector.detectRTL(text)) {
        const parent = textNode.parentElement;
        if (parent && parent !== element && this.shouldProcessElement(parent)) {
           this.renderer.applyRTL(parent);
        }
      }
    }
  }

  /**
   * Determine direction based on settings and detection
   */
  private determineDirection(text: string): boolean {
      if (this.settings.manualToggle || this.settings.forceDirection === 'rtl') {
          return true;
      }
      if (this.settings.forceDirection === 'ltr') {
          return false;
      }

      return this.detector.detectRTL(text);
  }


  /**
   * Check if element should be processed
   */
  private shouldProcessElement(element: HTMLElement): boolean {
    // Check ignore selectors first (fastest)
    if (this.config.selectors.ignore.some(selector => element.matches(selector))) {
        return false;
    }

    // Check layout selectors (closest is slower, but necessary)
    // Optimization: Cache results if possible or assume structure doesn't change much.
    // For now, we keep it but ensure we don't do it for every mutation if not needed.
    const skipLayout = this.config.selectors.layout.some(selector => {
        if (selector.startsWith('.')) {
             return element.classList.contains(selector.substring(1)) || element.closest(selector);
        }
        if (selector.startsWith('#')) {
             return element.id === selector.substring(1) || element.closest(selector);
        }
        return element.matches(selector) || element.closest(selector);
    });

    if (skipLayout) return false;

    return true;
  }

  /**
   * Get text content from element
   */
  private getElementText(element: HTMLElement): string {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      return (element as HTMLInputElement).value || '';
    }
    return element.textContent || '';
  }

  /**
   * Process all elements matching target selectors
   */
  processAllElements() {
    if (!this.isEnabled) return;
    
    // Use selectors from config
    const allSelectors = this.config.selectors.target.join(', ');
    const elements = document.querySelectorAll(allSelectors);
    
    elements.forEach(element => {
      this.processElement(element as HTMLElement);
    });

    // Also handle custom selectors if any
    this.settings.customSelectors?.forEach((selector: string) => {
        try {
            document.querySelectorAll(selector).forEach(element => {
                this.processElement(element as HTMLElement);
            });
        } catch (e) {
            console.warn(`Invalid custom selector: ${selector}`);
        }
    });
  }

  enable() {
      this.isEnabled = true;
      this.renderer.injectGlobalStyles();
      this.setupObserver();
      // Remove polling, rely on observer + initial pass
      // this.startAutoProcessing();
      setTimeout(() => this.processAllElements(), 100);
  }

  disable() {
      this.isEnabled = false;
      this.renderer.removeGlobalStyles();
      if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
      }

      // Cleanup DOM
      const allSelectors = this.config.selectors.target.join(', ');
      document.querySelectorAll(allSelectors).forEach(el => {
          this.renderer.clear(el as HTMLElement);
      });
  }

  private setupObserver() {
      if (this.observer) this.observer.disconnect();
      if (!this.settings.autoDetect) return;

      this.observer = new MutationObserver((mutations) => {
          if (!this.isEnabled) return;

          let shouldProcessAll = false;

          mutations.forEach((mutation) => {
             if (mutation.type === 'childList') {
                 // Too many nodes? Use full scan
                 if (mutation.addedNodes.length > 10) {
                     shouldProcessAll = true;
                 } else {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node as HTMLElement;
                            // Check if the element itself needs processing
                            if (this.config.selectors.target.some(s => element.matches(s))) {
                                this.processElement(element);
                            } else {
                                // If it's a container, we might want to scan inside or just debounce a full scan
                                // Scanning inside is better than full scan
                                const allSelectors = this.config.selectors.target.join(', ');
                                const children = element.querySelectorAll(allSelectors);
                                if (children.length > 0) {
                                    children.forEach(child => this.processElement(child as HTMLElement));
                                }
                            }
                        }
                    });
                 }
             } else if (mutation.type === 'characterData') {
                  const target = mutation.target.parentElement;
                  if (target && this.shouldProcessElement(target)) {
                      // Only process this specific element
                      this.processElement(target);
                  }
             } else if (mutation.type === 'attributes') {
                  const target = mutation.target as HTMLElement;
                  if (target && this.shouldProcessElement(target)) {
                       this.processElement(target);
                  }
             }
          });

          if (shouldProcessAll) {
              this.debouncedProcessAll();
          }
      });
      
      // Observe with specific options
      // observing subtree of body is heavy, but needed for dynamic content.
      // We optimize the callback to avoid heavy work.
      this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
          attributeFilter: ['value', 'placeholder', 'class']
      });
  }
}
