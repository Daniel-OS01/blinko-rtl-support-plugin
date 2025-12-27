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
    this.debouncedProcessAll = debounce(() => this.processAllElements(), 200);
  }

  updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
    if (this.isEnabled) {
      this.processAllElements();
    }
  }

  /**
   * Process a single element
   */
  processElement(element: HTMLElement) {
    if (!element || !this.shouldProcessElement(element)) return;

    // Check if direction is already set to avoid re-processing
    // (Optimization: only process if strictly necessary)
    const currentDir = element.getAttribute('dir');

    const text = this.getElementText(element);
    if (!text.trim() || text.length < (this.settings.minRTLChars || 2)) return;

    const isRTL = this.determineDirection(text);

    if (isRTL) {
        if (currentDir !== 'rtl') {
            this.renderer.applyRTL(element);
        }
    } else {
        if (currentDir === 'rtl') {
            this.renderer.applyLTR(element);
        }
    }

    if (this.settings.mixedContent) {
        this.processChildTextNodes(element);
    }
  }

  /**
   * Process child text nodes for mixed content
   */
  private processChildTextNodes(element: HTMLElement) {
    if (!element) return;

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      const textNode = node as Text;
      const text = textNode.textContent || '';

      if (text.trim() && this.detector.detectRTL(text)) {
        const parent = textNode.parentElement;
        if (parent && parent !== element && this.shouldProcessElement(parent)) {
           if (parent.getAttribute('dir') !== 'rtl') {
               this.renderer.applyRTL(parent);
           }
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

      // Use the injected detector which should have the improved Strategy
      return this.detector.detectRTL(text);
  }


  /**
   * Check if element should be processed
   */
  private shouldProcessElement(element: HTMLElement): boolean {
    if (!element.matches) return false;

    // Check skip layout classes
    const skipLayout = this.config.selectors.layout.some(selector => {
        try {
            if (selector.startsWith('.')) {
                 return element.classList.contains(selector.substring(1)) || element.closest(selector);
            }
            if (selector.startsWith('#')) {
                 return element.id === selector.substring(1) || element.closest(selector);
            }
            return element.matches(selector) || element.closest(selector);
        } catch { return false; }
    });

    if (skipLayout) return false;

    // Check ignore selectors
    if (this.config.selectors.ignore.some(selector => {
        try { return element.matches(selector); } catch { return false; }
    })) {
        return false;
    }

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
    
    const allSelectors = this.config.selectors.target.join(', ');
    const elements = document.querySelectorAll(allSelectors);
    
    elements.forEach(element => {
      this.processElement(element as HTMLElement);
    });

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
      // Remove redundant polling - rely on observer
      setTimeout(() => this.processAllElements(), 100);
  }

  disable() {
      this.isEnabled = false;
      this.renderer.removeGlobalStyles();
      if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
      }

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

          let shouldProcess = false;
          const candidates = new Set<HTMLElement>();

          mutations.forEach((mutation) => {
             // Avoid loop: Ignore attribute mutations that we caused (e.g., 'dir' or 'style' changes if we didn't filter them)
             // We configured the observer to only watch 'value' and 'placeholder' attributes.

             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;
                         if (this.config.selectors.target.some(s => element.matches(s))) {
                             candidates.add(element);
                         }
                         const allSelectors = this.config.selectors.target.join(', ');
                         element.querySelectorAll(allSelectors).forEach(child => {
                             candidates.add(child as HTMLElement);
                         });
                         shouldProcess = true;
                     }
                 });
             } else if (mutation.type === 'characterData') {
                 const target = mutation.target.parentElement;
                 if (target && this.config.selectors.target.some(s => target.matches(s))) {
                      candidates.add(target);
                      shouldProcess = true;
                 }
             } else if (mutation.type === 'attributes') {
                 // Should be safe due to attributeFilter
                 const target = mutation.target as HTMLElement;
                 if (this.config.selectors.target.some(s => target.matches(s))) {
                      candidates.add(target);
                      shouldProcess = true;
                 }
             }
          });

          // Process localized candidates immediately
          candidates.forEach(el => this.processElement(el));

          // If massive changes, debounce a full scan?
          // For now, rely on localized updates.
      });
      
      this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true, // Watch text content changes
          attributes: true,
          attributeFilter: ['value', 'placeholder'] // EXCLUDE 'dir', 'class', 'style' to prevent loops
      });
  }
}
