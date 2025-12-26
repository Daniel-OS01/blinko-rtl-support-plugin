import { RTLDetector } from './rtlDetector';
import { DOMRTLRenderer } from '../renderer';
import { Config } from '../config';

/**
 * Class responsible for processing the DOM to apply RTL styling.
 * It coordinates detection and rendering, handling element traversal and updates.
 */
export class RTLProcessor {
  /**
   * Configuration object for the plugin.
   */
  private config: Config;

  /**
   * The renderer instance used to apply styles to DOM elements.
   */
  private renderer: DOMRTLRenderer;

  /**
   * The detector instance used to identify RTL content.
   */
  private detector: RTLDetector;

  /**
   * Current active settings.
   */
  private settings: any;

  /**
   * Creates an instance of RTLProcessor.
   *
   * @param config - The base configuration.
   * @param renderer - The DOM renderer.
   * @param detector - The RTL detector.
   * @param settings - The initial user settings.
   */
  constructor(config: Config, renderer: DOMRTLRenderer, detector: RTLDetector, settings: any) {
    this.config = config;
    this.renderer = renderer;
    this.detector = detector;
    this.settings = settings;
  }

  /**
   * Updates the current settings used by the processor.
   *
   * @param newSettings - The new settings object.
   */
  updateSettings(newSettings: any) {
    this.settings = newSettings;
  }

  /**
   * Enables the processor.
   * Triggers an initial processing of all matching elements in the DOM.
   */
  enable() {
    this.processAllElements();
  }

  /**
   * Disables the processor.
   * Cleans up all applied RTL styles from the DOM.
   */
  disable() {
    this.renderer.cleanup();
  }

  /**
   * Processes a single HTML element to determine and apply appropriate directionality.
   *
   * Logic:
   * 1. Check for manual overrides (via `data-manual-dir` attribute).
   * 2. If no override, check the global force direction setting.
   * 3. If set to 'auto', use the `RTLDetector` to analyze content.
   * 4. Apply the resulting direction ('rtl' or 'ltr') using the renderer.
   * 5. If mixed content handling is enabled, process child text nodes.
   *
   * @param element - The HTML element to process.
   */
  processElement(element: HTMLElement) {
    // 1. Check manual override first
    const manualDir = element.getAttribute('data-manual-dir');
    if (manualDir === 'rtl') {
        this.renderer.applyRTL(element, 'rtl');
        return;
    } else if (manualDir === 'ltr') {
        this.renderer.applyRTL(element, 'ltr');
        return;
    }

    // 2. Check global settings
    if (this.settings.manualToggle) {
        this.renderer.applyRTL(element, 'rtl');
        return;
    }

    if (this.settings.forceDirection === 'rtl') {
        this.renderer.applyRTL(element, 'rtl');
        return;
    } else if (this.settings.forceDirection === 'ltr') {
        this.renderer.applyRTL(element, 'ltr');
        return;
    }

    // 3. Auto-detection
    if (this.settings.autoDetect) {
        const isRTL = this.detector.isRTL(element);
        if (isRTL) {
            this.renderer.applyRTL(element, 'rtl');

            // 4. Mixed content handling (only if block is RTL)
            if (this.settings.mixedContent) {
                this.processChildTextNodes(element);
            }
        } else {
            this.renderer.applyRTL(element, 'ltr');
        }
    }
  }

  /**
   * Processes all elements matching the configured selectors within the document.
   * It queries the DOM for targets defined in `config.selectors.target` and
   * processes each one individually.
   */
  processAllElements() {
    if (!this.settings.enabled) return;

    const selectors = this.config.selectors.target.join(',');
    const elements = document.querySelectorAll(selectors);

    elements.forEach(el => {
        if (el instanceof HTMLElement) {
            this.processElement(el);
        }
    });
  }

  /**
   * Handles mixed LTR/RTL content within a block element by wrapping text nodes.
   * This ensures that LTR segments within an RTL block (or vice versa) are displayed correctly.
   *
   * It iterates through child nodes:
   * - If a text node is detected as LTR (English), it wraps it in a span with `dir="ltr"`.
   * - Recursively processes child elements.
   *
   * @param element - The parent element to scan for mixed content.
   */
  private processChildTextNodes(element: HTMLElement) {
      // Simple implementation: Wrap English words in LTR spans if parent is RTL
      // This is a naive approach; a full BIDI implementation is complex.
      // We'll iterate over child nodes.
      
      Array.from(element.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent;
              if (text && /[a-zA-Z]/.test(text)) {
                   // Detected LTR content in text node
                   // Check if it's purely LTR or mixed.
                   // For now, let's just wrap the whole node if it looks like an English sentence
                   // OR split by words? Splitting is dangerous for DOM integrity.

                   // Safe approach: If the node is significant and mostly LTR, wrap it.
                   const ltrCount = (text.match(/[a-zA-Z]/g) || []).length;
                   if (ltrCount > 3) { // Threshold
                       const span = document.createElement('span');
                       span.dir = 'ltr';
                       span.style.unicodeBidi = 'embed';
                       span.textContent = text;
                       element.replaceChild(span, node);
                   }
              }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Recursively check, but don't re-process blocks that are already handled
              // preventing infinite loops or double processing
              const el = node as HTMLElement;
              // Only process inline elements or containers that aren't block targets themselves
              const style = window.getComputedStyle(el);
              if (style.display.includes('inline')) {
                  this.processChildTextNodes(el);
              }
          }
      });
  }
}
