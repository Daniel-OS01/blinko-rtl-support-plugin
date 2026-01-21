import { RTLDetector } from '../utils/rtlDetector';
import { RTLSettings } from '../types';
import { advancedRTLCSS, DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './constants';
import { debounce } from '../utils/debounce';
import { PasteInterceptor } from '../utils/pasteInterceptor';
import { HoverContextManager } from '../utils/hoverManager';

export class RTLService {
  private detector: RTLDetector;
  private isRTLEnabled: boolean = false;
  private styleElement: HTMLStyleElement | null = null;
  private permanentStyleElement: HTMLStyleElement | null = null;
  private dynamicStyleElement: HTMLStyleElement | null = null;
  private observer: MutationObserver | null = null;
  private autoProcessInterval: any = null;
  // Managers
  private pasteInterceptor: PasteInterceptor;
  private hoverManager: HoverContextManager | null = null;

  // Optimizations
  private pendingElements: Set<HTMLElement> = new Set();
  private debouncedProcessQueue: () => void;
  private debouncedProcessAll: () => void;

  // Action Log
  private actionLog: { timestamp: string; element: string; direction: string; textPreview: string }[] = [];
  private readonly MAX_LOG_SIZE = 50;

  // Hebrew regex from userscript
  private readonly hebrewRegex = /\p{Script=Hebrew}/u;
  private readonly arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  private settings: RTLSettings = { ...DEFAULT_SETTINGS, targetSelectors: DEFAULT_TARGET_SELECTORS };

  constructor(detector: RTLDetector) {
    this.detector = detector;
    this.loadSettings();
    
    // Initialize Managers
    this.pasteInterceptor = new PasteInterceptor(detector);

    // Initialize optimization debouncers
    this.debouncedProcessAll = debounce(() => this.processAllElements(), 200);
    this.debouncedProcessQueue = debounce(() => {
       this.processPendingElements();
    }, 50);
  }

  public getSettings(): RTLSettings {
    return { ...this.settings };
  }

  public getActionLog() {
    return [...this.actionLog];
  }

  private logAction(element: HTMLElement, isRTL: boolean) {
      const logEntry = {
          timestamp: new Date().toLocaleTimeString(),
          element: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ').join('.')}` : ''),
          direction: isRTL ? 'RTL' : 'LTR',
          textPreview: (element.textContent || '').substring(0, 20) + '...'
      };

      this.actionLog.unshift(logEntry);
      if (this.actionLog.length > this.MAX_LOG_SIZE) {
          this.actionLog.pop();
      }

      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent('rtl-action-logged', { detail: logEntry }));
  }

  public isEnabled(): boolean {
    return this.isRTLEnabled;
  }

  public loadSettings() {
    const savedSettings = localStorage.getItem('blinko-rtl-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        // Merge with default settings to ensure new fields are present
        this.settings = { ...this.settings, ...parsed };

        // Backwards compatibility for target selectors
        if (!parsed.targetSelectors || parsed.targetSelectors.length < 5) {
             // If selectors look like the old default list, merge with new defaults
             const oldDefaults = new Set(parsed.targetSelectors || []);
             const combined = [...new Set([...DEFAULT_TARGET_SELECTORS, ...Array.from(oldDefaults)])] as string[];
             this.settings.targetSelectors = combined;
        }

        // Ensure dynamicCSS has a default if missing (migration)
        if (!this.settings.dynamicCSS) {
            this.settings.dynamicCSS = DEFAULT_DYNAMIC_CSS;
        }
        // Ensure disabledSelectors is initialized
        if (!this.settings.disabledSelectors) {
            this.settings.disabledSelectors = [];
        }

        this.detector.updateConfig({
          sensitivity: this.settings.sensitivity,
          minRTLChars: this.settings.minRTLChars
        });

        if (this.settings.permanentCSS && this.settings.customCSS) {
          this.injectPermanentCSS();
        }
      } catch (error) {
        console.error('Failed to load RTL plugin settings:', error);
      }
    }
  }

  public updateSettings(newSettings: Partial<RTLSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem('blinko-rtl-settings', JSON.stringify(this.settings));

    this.detector.updateConfig({
      sensitivity: this.settings.sensitivity,
      minRTLChars: this.settings.minRTLChars
    });

    // Update injected CSS
    this.injectCSS();

    if (this.settings.permanentCSS && this.settings.customCSS) {
      this.injectPermanentCSS();
    } else {
      this.removePermanentCSS();
    }

    if (this.isRTLEnabled) {
        this.injectDynamicCSS(); // Update dynamic CSS if changed
    }

    // Re-setup observer and processing if enabled
    if (this.isRTLEnabled) {
        this.setupObserver();
        this.startAutoProcessing();
        this.debouncedProcessAll();
        // Managers update implicitly via enabled check or settings usage
    }

    // Dispatch event for UI updates
    window.dispatchEvent(
        new CustomEvent('rtl-settings-changed', {
          detail: this.settings
        })
    );
  }

  private injectCSS() {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'blinko-dynamic-css';
      document.head.appendChild(this.styleElement);
    }
    this.styleElement.textContent = this.settings.dynamicCSS;
  }

  private injectDynamicCSS() {
      if (!this.dynamicStyleElement) {
          this.dynamicStyleElement = document.createElement('style');
          this.dynamicStyleElement.id = 'blinko-rtl-dynamic-css';
          document.head.appendChild(this.dynamicStyleElement);
      }

      let cssContent = this.settings.dynamicCSS || DEFAULT_DYNAMIC_CSS;

      // Safety Mechanism: Append Debug CSS if Debug Mode is ON and missing from user CSS
      if (this.settings.debugMode) {
          // Check if user CSS has debug definitions. If not, append them.
          // Simple check for class existence
          if (!cssContent.includes('.rtl-debug-rtl')) {
             cssContent += `
/* Visual Debugger - RTL Detected */
.rtl-debug-rtl {
    outline: 2px solid rgba(255, 0, 0, 0.5) !important;
    position: relative !important;
}
.rtl-debug-rtl::after {
    content: "RTL";
    position: absolute;
    top: -15px;
    right: 0;
    background: red;
    color: white;
    font-size: 10px;
    padding: 1px 3px;
    border-radius: 2px;
    z-index: 10000;
    pointer-events: none;
    white-space: nowrap;
}`;
          }
          if (!cssContent.includes('.rtl-debug-ltr')) {
              cssContent += `
/* Visual Debugger - LTR Detected */
.rtl-debug-ltr {
    outline: 2px solid rgba(0, 0, 255, 0.3) !important;
    position: relative !important;
}
.rtl-debug-ltr::after {
    content: "LTR";
    position: absolute;
    top: -15px;
    left: 0;
    background: blue;
    color: white;
    font-size: 10px;
    padding: 1px 3px;
    border-radius: 2px;
    z-index: 10000;
    pointer-events: none;
    white-space: nowrap;
}`;
          }
      }

      this.dynamicStyleElement.textContent = cssContent;
  }

  private removeDynamicCSS() {
      if (this.dynamicStyleElement) {
          this.dynamicStyleElement.remove();
          this.dynamicStyleElement = null;
      }
  }

  private injectPermanentCSS() {
    if (this.settings.customCSS && this.settings.permanentCSS) {
      if (!this.permanentStyleElement) {
        this.permanentStyleElement = document.createElement('style');
        this.permanentStyleElement.id = 'blinko-rtl-permanent-styles';
        document.head.appendChild(this.permanentStyleElement);
      }
      this.permanentStyleElement.textContent = this.settings.customCSS;
    }
  }

  private removePermanentCSS() {
    if (this.permanentStyleElement) {
      this.permanentStyleElement.remove();
      this.permanentStyleElement = null;
    }
  }

  private removeCSS() {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
    if (!this.settings.permanentCSS) {
      this.removePermanentCSS();
    }
    this.removeDynamicCSS();
  }

  // Method 1: Direct style application
  // DEPRECATED: Moving to class-based application only, but kept for legacy method 'direct' if user specifically requests it
  // However, we align it to avoid inline conflict with dynamic CSS
  private applyDirectRTL(element: HTMLElement, isRTL: boolean) {
    if (isRTL) {
      element.classList.add('blinko-detected-rtl');
      element.style.direction = 'rtl';
      element.style.textAlign = 'right';
      element.style.unicodeBidi = 'embed';
    } else {
      element.classList.remove('blinko-detected-rtl');
      element.style.removeProperty('direction');
      element.style.removeProperty('text-align');
      element.style.removeProperty('unicode-bidi');
    }
    this.applyDebugVisuals(element, isRTL);
  }

  // Method 2: Attribute-based RTL
  private applyAttributeRTL(element: HTMLElement, isRTL: boolean) {
    if (isRTL) {
      element.setAttribute('dir', 'rtl');
      element.setAttribute('lang', 'he');
    } else {
      element.setAttribute('dir', 'ltr');
      element.removeAttribute('lang');
    }
    this.applyDebugVisuals(element, isRTL);
  }

  // Method 3: CSS class-based RTL (Primary Method)
  private applyCSSClassRTL(element: HTMLElement, isRTL: boolean) {
    element.classList.remove('rtl-force', 'ltr-force', 'rtl-auto');
    if (isRTL) {
      element.classList.add('rtl-force');
    } else {
      element.classList.add('ltr-force');
    }
    this.applyDebugVisuals(element, isRTL);
  }

  // Method 4: Unicode bidi method
  private applyUnicodeBidiRTL(element: HTMLElement) {
    element.classList.add('rtl-auto');
    element.style.unicodeBidi = 'plaintext';
  }

  public detectHebrewRegex(text: string): boolean {
    return this.hebrewRegex.test(text);
  }

  public detectArabicRegex(text: string): boolean {
    return this.arabicRegex.test(text);
  }

  public processElement = (element: HTMLElement) => {
    if (!element) return;

    // Skip disabled selectors
    if (this.settings.disabledSelectors && this.settings.disabledSelectors.some(selector => element.matches(selector))) {
        console.log('Skipping disabled element:', element.tagName);
        return;
    }

    // Skip layout elements, BUT exclude explicit target selectors like 'button' or '.btn' from being skipped
    if (element.closest('.flex, .grid, header, nav, .sidebar, .toolbar')) {
       // We still want to process the element if it matches a target selector, even if it's inside a layout container.
       // The previous exclusion of 'button' and '.btn' here prevented buttons from being processed even if they were in targetSelectors.
    }

    const text = element.textContent || (element as HTMLInputElement).value || (element as HTMLInputElement).placeholder || '';
    console.log('Processing element:', element.tagName, 'Text:', text.substring(0, 10));
    if (!text.trim() || text.length < this.settings.minRTLChars) {
        console.log('Skipping short text');
        // Even if empty, for inputs we might want to default to LTR if previously set to RTL?
        // But let's avoid flickering.
        return;
    }

    let isRTL = false;

    // We intentionally removed the explicit forceLTR variable to avoid confusion.
    // The default state is isRTL = false, which will result in .ltr-force being applied
    // via applyCSSClassRTL if 'all' or 'css' method is used.
    // This effectively enforces LTR for anything that doesn't match RTL criteria.

    // Manual toggle - force RTL on all
    if (this.settings.manualToggle) {
      isRTL = true;
    }
    // Force direction override
    else if (this.settings.forceDirection === 'rtl') {
      isRTL = true;
    }
    else if (this.settings.forceDirection === 'ltr') {
      isRTL = false;
    }
    // Auto-detection with multiple methods
    else {
      // SPECIAL HANDLING FOR CODE BLOCKS
      // If element is a code block, use stricter threshold to prevent mixed content from flipping entire block
      const isCodeBlock = element.matches('pre, code, .code-block, .CodeMirror-line, .notion-code-block');

      if (isCodeBlock) {
          // Stricter detection for code blocks
          // We need a higher ratio of RTL characters to flip a code block
          // Or we rely solely on detector with a higher threshold temporarily

          // Count RTL chars manually for stricter check
          const hebrewChars = (text.match(/[\u0590-\u05FF]/g) || []).length;
          const arabicChars = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length;
          const totalRTL = hebrewChars + arabicChars;

          // Use non-whitespace length for more accurate ratio in code blocks
          // (Code blocks often have significant indentation/whitespace)
          const nonWhitespaceLength = text.replace(/\s/g, '').length || text.length;
          const ratio = totalRTL / nonWhitespaceLength;

          // Require at least 60% RTL (of visible characters) to flip a code block
          if (ratio > 0.6) {
              isRTL = true;
          }
      } else {
          // Normal detection using configured strategy (Strategy Pattern)
          // This supports sensitivity settings and proper mixed content handling
          isRTL = this.detector.detectRTL(text);
      }
    }

    // Log the action for transparency
    this.logAction(element, isRTL);

    // Special handling for code blocks:
    // If it's a code block (isCodeBlock) and we found RTL (isRTL=true), we allow it.
    // If we didn't find RTL (isRTL=false), it stays false, effectively forcing LTR via .ltr-force.
    // This logic works without a separate forceLTR variable because .ltr-force is applied when isRTL is false.

    // Apply RTL using selected method
    switch (this.settings.method) {
      case 'direct':
        this.applyDirectRTL(element, isRTL);
        break;
      case 'attributes':
        this.applyAttributeRTL(element, isRTL);
        break;
      case 'css':
        this.applyCSSClassRTL(element, isRTL);
        break;
      case 'unicode':
        this.applyUnicodeBidiRTL(element);
        break;
      case 'all':
      default:
        // Prioritize CSS Class method as it uses the dynamic CSS
        this.applyCSSClassRTL(element, isRTL);
        this.applyAttributeRTL(element, isRTL);

        // Direct styles are still useful as fallback
        this.applyDirectRTL(element, isRTL);
        break;
    }

    // Handle mixed content if enabled
    if (this.settings.processMixedContent && this.settings.mixedContent) {
        // Implementation logic for mixed content could go here
    }
  }

  public processAllElements = () => {
    if (!this.isRTLEnabled) return;
    
    // Process active target selectors
    const activeSelectors = this.settings.targetSelectors.filter(
        s => !this.settings.disabledSelectors.includes(s)
    );
    const selectors = activeSelectors.join(', ');
    console.log('processAllElements selectors:', selectors);
    if (selectors) {
        const elements = document.querySelectorAll(selectors);
        console.log('processAllElements found elements:', elements.length);
        elements.forEach(element => {
            this.processElement(element as HTMLElement);
        });
    }

  }

  private processPendingElements() {
      if (!this.isRTLEnabled) {
          this.pendingElements.clear();
          return;
      }

      this.pendingElements.forEach(element => {
          if (document.contains(element)) {
              this.processElement(element);
          }
      });
      this.pendingElements.clear();
  }

  public enable() {
    this.isRTLEnabled = true;
    this.injectCSS();
    this.injectDynamicCSS(); // Inject dynamic CSS
    if (this.settings.permanentCSS) {
      this.injectPermanentCSS();
    }
    
    // Enable Managers
    this.pasteInterceptor.enable();
    if (!this.hoverManager) {
        this.hoverManager = new HoverContextManager({
            selectors: this.settings.targetSelectors,
            processElement: (el) => this.processElement(el),
            isEnabled: () => this.isRTLEnabled
        });
        this.hoverManager.init();
    }

    this.setupObserver();
    this.startAutoProcessing();
    this.debouncedProcessAll();
  }

  public disable() {
    this.isRTLEnabled = false;
    this.removeCSS();
    
    // Disable Managers
    this.pasteInterceptor.disable();
    if (this.hoverManager) {
        this.hoverManager.destroy();
        this.hoverManager = null;
    }

    this.stopAutoProcessing();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.pendingElements.clear();
  }

  public toggle() {
    if (this.isRTLEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  public toggleManual() {
    const newVal = !this.settings.manualToggle;
    this.updateSettings({ manualToggle: newVal });
    return newVal;
  }

  public toggleDebugMode() {
      const newVal = !this.settings.debugMode;
      this.updateSettings({ debugMode: newVal });
      if (newVal) {
          document.body.classList.add('rtl-debug-mode');
          this.injectDynamicCSS(); // Re-inject to ensure debug styles are present
          this.processAllElements(); // Re-process to apply visuals
      } else {
          document.body.classList.remove('rtl-debug-mode');
          // Clear debug styles classes
          document.querySelectorAll('.rtl-debug-rtl, .rtl-debug-ltr').forEach(el => {
              el.classList.remove('rtl-debug-rtl', 'rtl-debug-ltr');
              el.removeAttribute('data-rtl-debug');
          });
      }
      return newVal;
    }

  private applyDebugVisuals(element: HTMLElement, isRTL: boolean) {
      if (this.settings.debugMode) {
          element.classList.remove('rtl-debug-rtl', 'rtl-debug-ltr');
          if (isRTL) {
              element.classList.add('rtl-debug-rtl');
              element.setAttribute('data-rtl-debug', 'RTL Detected');
          } else {
              element.classList.add('rtl-debug-ltr');
              element.setAttribute('data-rtl-debug', 'LTR Detected');
          }
      } else {
          // Cleanup if debug mode was disabled but we are processing
           element.classList.remove('rtl-debug-rtl', 'rtl-debug-ltr');
           element.removeAttribute('data-rtl-debug');
      }
  }

  private setupObserver() {
      if (this.observer) this.observer.disconnect();
      if (!this.settings.autoDetect) return;

      this.observer = new MutationObserver((mutations) => {
          if (!this.isRTLEnabled) return;

          let hasRelevantMutation = false;

          // Compute active selectors for matching
          const activeSelectors = this.settings.targetSelectors.filter(
            s => !this.settings.disabledSelectors.includes(s)
          );
          const selectors = activeSelectors.join(', ');

          mutations.forEach((mutation) => {
             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;
                         if (activeSelectors.some(s => element.matches(s))) {
                             this.pendingElements.add(element);
                             hasRelevantMutation = true;
                         }

                         if (selectors && element.querySelector(selectors)) {
                             element.querySelectorAll(selectors).forEach(child => {
                                 this.pendingElements.add(child as HTMLElement);
                             });
                             hasRelevantMutation = true;
                         }
                     }
                 });
             } else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
                  const target = mutation.target.nodeType === Node.ELEMENT_NODE
                    ? mutation.target as HTMLElement
                    : mutation.target.parentElement;

                  if (target) {
                      if (activeSelectors.some(s => target.matches(s))) {
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
      
      this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
          attributeFilter: ['value', 'placeholder', 'contenteditable']
      });
  }

  private startAutoProcessing() {
      if (this.autoProcessInterval) clearInterval(this.autoProcessInterval);
      if (this.settings.autoDetect && this.isRTLEnabled) {
          // Less aggressive polling since we have a better observer now
          this.autoProcessInterval = setInterval(() => {
              if (this.isRTLEnabled && this.settings.autoDetect) {
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
