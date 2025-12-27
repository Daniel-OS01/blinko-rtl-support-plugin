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

  // Queue for debounced processing
  private pendingElements: Set<HTMLElement> = new Set();
  private debouncedProcessQueue: () => void;
  private autoProcessInterval: any = null;

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
    
    // Create debounced processor for the queue
    this.debouncedProcessQueue = debounce(() => {
       this.processPendingElements();
    }, 50); // Fast debounce for UI responsiveness
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
    if (!element) return;

    // Explicitly enforce LTR for code blocks
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'pre' || tagName === 'code' || element.classList.contains('code-block')) {
        this.renderer.applyLTR(element);
        return;
    }

    if (!this.shouldProcessElement(element)) return;

    // Check if direction is already set to avoid re-processing
    // (Optimization: only process if strictly necessary)
    const currentDir = element.getAttribute('dir');

    const text = this.getElementText(element);
    if (!text.trim() || text.length < (this.settings.minRTLChars || 2)) {
        // If empty or too short, maybe clear or leave as is.
        // Clearing is safer to avoid stale RTL states.
        // But some inputs might be cleared and we don't want them to jump.
        // For now, let's leave it.
        return;
    }

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

    // Ensure code blocks are reset to LTR
    document.querySelectorAll('pre, code, .code-block').forEach(el => {
        this.renderer.applyLTR(el as HTMLElement);
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

  private processPendingElements() {
      if (!this.isEnabled) {
          this.pendingElements.clear();
          return;
      }

      this.pendingElements.forEach(element => {
          // Double check if element is still connected
          if (document.contains(element)) {
              this.processElement(element);
          }
      });
      this.pendingElements.clear();
  }

  enable() {
      this.isEnabled = true;
      this.renderer.injectGlobalStyles();
      this.setupObserver();
      this.startAutoProcessing();
      // Remove redundant polling - rely on observer
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
      this.pendingElements.clear();

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

          let hasRelevantMutation = false;

          mutations.forEach((mutation) => {
             // Avoid loop: Ignore attribute mutations that we caused (e.g., 'dir' or 'style' changes if we didn't filter them)
             // We configured the observer to only watch 'value' and 'placeholder' attributes.

             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;
                         if (this.config.selectors.target.some(s => element.matches(s))) {
                             this.pendingElements.add(element);
                             hasRelevantMutation = true;
                         }
                         const allSelectors = this.config.selectors.target.join(', ');
                         element.querySelectorAll(allSelectors).forEach(child => {
                             this.pendingElements.add(child as HTMLElement);
                         });
                         if (element.querySelectorAll(allSelectors).length > 0) {
                             hasRelevantMutation = true;
                         }
                     }
                 });
             } else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
                  const target = mutation.target.nodeType === Node.ELEMENT_NODE
                    ? mutation.target as HTMLElement
                    : mutation.target.parentElement;

                  if (target) {
                      // Check if it matches any target selector
                      if (this.config.selectors.target.some(s => target.matches(s))) {
                          this.pendingElements.add(target);
                          hasRelevantMutation = true;
                      }
                  }
             }
          });

          if (hasRelevantMutation) {
               this.debouncedProcessQueue();
          }
      });
      
      // Observe with specific options
      // observing subtree of body is heavy, but needed for dynamic content.
      // We optimize the callback to avoid heavy work.
      this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true, // Watch text content changes
          attributes: true,
          attributeFilter: ['value', 'placeholder']
      });
  }

  private startAutoProcessing() {
      if (this.autoProcessInterval) clearInterval(this.autoProcessInterval);
      if (this.settings.autoDetect && this.isEnabled) {
          // Less aggressive polling since we have a better observer now
          this.autoProcessInterval = setInterval(() => {
              if (this.isEnabled && this.settings.autoDetect) {
                  this.processAllElements();
              }
          }, this.settings.processInterval || 5000);
      }
  }

  private stopAutoProcessing() {
      if (this.autoProcessInterval) {
          clearInterval(this.autoProcessInterval);
          this.autoProcessInterval = null;
      }
  }
}