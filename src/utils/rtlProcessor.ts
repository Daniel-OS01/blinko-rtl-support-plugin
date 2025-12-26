import { RTLConfig } from '../config';
import { RTLRenderer } from '../renderer';
import { RTLDetector } from './rtlDetector';

/**
 * Advanced RTL processor for comprehensive text element handling
 */
export class RTLProcessor {
  private config: RTLConfig;
  private renderer: RTLRenderer;
  private detector: RTLDetector;
  private settings: any;
  private observer: MutationObserver | null = null;
  private autoProcessInterval: any = null;
  private isEnabled: boolean = false;

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
  }

  updateSettings(newSettings: any) {
    this.settings = { ...this.settings, ...newSettings };
  }

  /**
   * Process a single element
   */
  processElement(element: HTMLElement) {
    if (!element || !this.shouldProcessElement(element)) return;

    const text = this.getElementText(element);
    if (!text.trim() || text.length < (this.settings.minRTLChars || 2)) return;

    const isRTL = this.determineDirection(text);

    if (isRTL) {
      this.renderer.applyRTL(element);
    } else {
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

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      const textNode = node as Text;
      const text = textNode.textContent || '';

      // We only care about RTL segments in mixed content
      // If it is RTL, we might want to wrap it or check its parent
      if (text.trim() && this.detector.detectRTL(text)) {
        const parent = textNode.parentElement;
        if (parent && parent !== element && this.shouldProcessElement(parent)) {
           // If the parent is a span or similar inline element, apply RTL to it
           // This is recursive but safe because we check parent !== element
           // and we only apply if it's detected as RTL
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

      // Hebrew/Arabic Regex Check (mimicking original index.tsx logic)
      if (this.settings.hebrewRegex && /\p{Script=Hebrew}/u.test(text)) {
          return true;
      }
      if (this.settings.arabicRegex && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text)) {
          return true;
      }

      return this.detector.detectRTL(text);
  }


  /**
   * Check if element should be processed
   */
  private shouldProcessElement(element: HTMLElement): boolean {
    // Check skip layout classes
    const skipLayout = this.config.selectors.layout.some(selector => {
        // Simple class check if selector is a class
        if (selector.startsWith('.')) {
             return element.classList.contains(selector.substring(1)) || element.closest(selector);
        }
        if (selector.startsWith('#')) {
             return element.id === selector.substring(1) || element.closest(selector);
        }
        return element.matches(selector) || element.closest(selector);
    });

    if (skipLayout) return false;

    // Check ignore selectors
    if (this.config.selectors.ignore.some(selector => element.matches(selector))) {
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
      this.startAutoProcessing();
      setTimeout(() => this.processAllElements(), 100);
  }

  disable() {
      this.isEnabled = false;
      this.renderer.removeGlobalStyles();
      this.stopAutoProcessing();
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

          let shouldProcess = false;
          mutations.forEach((mutation) => {
             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;
                         // Check if the element itself needs processing
                         if (this.config.selectors.target.some(s => element.matches(s))) {
                             this.processElement(element);
                         }
                         // Check children
                         const allSelectors = this.config.selectors.target.join(', ');
                         element.querySelectorAll(allSelectors).forEach(child => {
                             this.processElement(child as HTMLElement);
                         });
                         shouldProcess = true;
                     }
                 });
             } else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
                  const target = mutation.target.nodeType === Node.ELEMENT_NODE
                    ? mutation.target as HTMLElement
                    : mutation.target.parentElement;

                  if (target) {
                      // Check if it matches any target selector
                      if (this.config.selectors.target.some(s => target.matches(s))) {
                          this.processElement(target);
                          shouldProcess = true;
                      }
                  }
             }
          });

          if (shouldProcess) {
               // Debounce re-processing all if needed, but we try to process locally above
          }
      });
      
      this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
          attributeFilter: ['value', 'placeholder'] // monitor input value changes if needed (but value isn't an attribute usually)
      });
  }

  private startAutoProcessing() {
      if (this.autoProcessInterval) clearInterval(this.autoProcessInterval);
      if (this.settings.autoDetect && this.isEnabled) {
          this.autoProcessInterval = setInterval(() => {
              if (this.isEnabled && this.settings.autoDetect) {
                  this.processAllElements();
              }
          }, this.settings.processInterval || 2000);
      }
  }

  private stopAutoProcessing() {
      if (this.autoProcessInterval) {
          clearInterval(this.autoProcessInterval);
          this.autoProcessInterval = null;
      }
  }
}
