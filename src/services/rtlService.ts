import { RTLDetector } from '../utils/rtlDetector';
import { RTLSettings } from '../types';
import { advancedRTLCSS, DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './constants';
import { debounce } from '../utils/debounce';
import { PasteInterceptor } from '../utils/pasteInterceptor';

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
    this.storageManager = new StorageManager();
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

  private logAction(element: HTMLElement, direction: Direction) {
      const logEntry = {
          timestamp: new Date().toLocaleTimeString(),
          element: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ').join('.')}` : ''),
          direction: direction.toUpperCase(),
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
    const loadedSettings = this.storageManager.load();
    if (loadedSettings) {
        // Merge with default settings
        this.settings = { ...this.settings, ...loadedSettings };

        // Ensure critical fields are initialized
        if (!this.settings.dynamicCSS) {
            this.settings.dynamicCSS = DEFAULT_DYNAMIC_CSS;
        }
        if (!this.settings.disabledSelectors) {
            this.settings.disabledSelectors = [];
        }
        if (this.settings.autoDetect === undefined) {
            this.settings.autoDetect = true;
        }

        // Apply config to detector
        this.detector.updateConfig({
          sensitivity: this.settings.sensitivity,
          minRTLChars: this.settings.minRTLChars
        });

        // Inject persistent CSS if enabled
        if (this.settings.permanentCSS && this.settings.customCSS) {
          this.injectPermanentCSS();
        }
    } else {
        // No saved settings, default to autoDetect
        this.settings.autoDetect = true;
    }
  }

  public updateSettings(newSettings: Partial<RTLSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.storageManager.save(this.settings);

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

  // Import/Export Proxy Methods
  public exportSettings(): string {
      return this.storageManager.export(this.settings);
  }

  public importSettings(jsonString: string) {
      try {
          const importedSettings = this.storageManager.import(jsonString);
          // Apply imported settings (merge with current defaults to be safe)
          this.updateSettings(importedSettings);
          return true;
      } catch (e) {
          console.error('Import failed:', e);
          throw e; // Re-throw for UI handling
      }
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

  private applyDirectRTL(element: HTMLElement, direction: Direction) {
    if (direction === 'rtl') {
      element.classList.add('blinko-detected-rtl');
      element.style.direction = 'rtl';
      element.style.textAlign = 'right';
      element.style.unicodeBidi = 'embed';
    } else if (direction === 'ltr') {
      element.classList.remove('blinko-detected-rtl');
      element.style.direction = 'ltr';
      element.style.textAlign = 'left';
      element.style.unicodeBidi = 'embed';
    } else {
      element.classList.remove('blinko-detected-rtl');
      element.style.removeProperty('direction');
      element.style.removeProperty('text-align');
      element.style.removeProperty('unicode-bidi');
    }
    this.applyDebugVisuals(element, direction);
  }

  private applyAttributeRTL(element: HTMLElement, direction: Direction) {
    if (direction === 'rtl') {
      element.setAttribute('dir', 'rtl');
      element.setAttribute('lang', 'he');
    } else if (direction === 'ltr') {
      element.setAttribute('dir', 'ltr');
      element.removeAttribute('lang');
    } else {
        element.removeAttribute('dir');
        element.removeAttribute('lang');
    }
    this.applyDebugVisuals(element, direction);
  }

  private applyCSSClassRTL(element: HTMLElement, direction: Direction) {
    element.classList.remove('rtl-force', 'ltr-force', 'rtl-auto');
    if (direction === 'rtl') {
      element.classList.add('rtl-force');
    } else if (direction === 'ltr') {
      element.classList.add('ltr-force');
    }
    this.applyDebugVisuals(element, direction);
  }

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

    // Helper: Safely check matches
    const safeMatches = (el: HTMLElement, selector: string) => {
        try {
            return el.matches(selector);
        } catch (e) {
            console.warn(`Invalid selector '${selector}':`, e);
            return false;
        }
    };

    // Skip disabled selectors
    if (this.settings.disabledSelectors && this.settings.disabledSelectors.some(selector => safeMatches(element, selector))) {
        // console.log('Skipping disabled element:', element.tagName);
        return;
    }

    // Check if element is part of the UI shell that should be protected
    // But allow processing if it's explicitly in target selectors (which processAllElements uses)
    // or if it's a content element.

    const text = element.textContent || (element as HTMLInputElement).value || (element as HTMLInputElement).placeholder || '';
    // console.log('Processing element:', element.tagName, 'Text:', text.substring(0, 10));

    // Short text handling
    if (!text.trim() || text.length < this.settings.minRTLChars) {
        // Neutral state for empty/short text to avoid forcing LTR on what might be an RTL placeholder
        this.applyCSSClassRTL(element, 'neutral');
        return;
    }

    let direction: Direction = 'neutral';

    // Manual toggle - force RTL on all
    if (this.settings.manualToggle) {
      direction = 'rtl';
    }
    // Force direction override
    else if (this.settings.forceDirection === 'rtl') {
      direction = 'rtl';
    }
    else if (this.settings.forceDirection === 'ltr') {
      direction = 'ltr';
    }
    // Auto-detection with multiple methods
    else {
      // SPECIAL HANDLING FOR CODE BLOCKS
      const isCodeBlock = safeMatches(element, 'pre, code, .code-block, .CodeMirror-line, .notion-code-block');

      if (isCodeBlock) {
          const hebrewChars = (text.match(/[\u0590-\u05FF]/g) || []).length;
          const arabicChars = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length;
          const totalRTL = hebrewChars + arabicChars;

          const nonWhitespaceLength = text.replace(/\s/g, '').length || text.length;
          const ratio = totalRTL / nonWhitespaceLength;

          if (ratio > 0.6) {
              direction = 'rtl';
          } else {
              direction = 'ltr'; // Code blocks default to LTR usually
          }
      } else {
          // Normal detection
          const isRTL = this.detector.detectRTL(text);
          if (isRTL) {
              direction = 'rtl';
          } else {
              // Check if it's explicitly LTR (contains latin chars)
              // If it has NO LTR chars (e.g. "123" or "!!!"), stay neutral
              const hasLTR = /[a-zA-Z]/.test(text);
              if (hasLTR) {
                  direction = 'ltr';
              } else {
                  direction = 'neutral';
              }
          }
      }
    }

    // Check manual override attribute
    const manualDir = element.getAttribute('data-manual-dir');
    if (manualDir === 'rtl') direction = 'rtl';
    if (manualDir === 'ltr') direction = 'ltr';

    // Log action if direction changed (optimization: only log changes?)
    // For now log all for transparency
    this.logAction(element, direction);

    // Apply RTL using selected method
    switch (this.settings.method) {
      case 'direct':
        this.applyDirectRTL(element, direction);
        break;
      case 'attributes':
        this.applyAttributeRTL(element, direction);
        break;
      case 'css':
        this.applyCSSClassRTL(element, direction);
        break;
      case 'unicode':
        this.applyUnicodeBidiRTL(element);
        break;
      case 'all':
      default:
        this.applyCSSClassRTL(element, direction);
        this.applyAttributeRTL(element, direction);
        break;
    }
  }

  public processAllElements = () => {
    if (!this.isRTLEnabled) return;
    
    // Process active target selectors
    const activeSelectors = this.settings.targetSelectors.filter(
        s => !this.settings.disabledSelectors.includes(s)
    );

    // Robust selector processing
    // Iterate individually to prevent one bad selector from crashing everything
    activeSelectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            // console.log(`Processing selector '${selector}': found ${elements.length}`);
            elements.forEach(element => {
                this.processElement(element as HTMLElement);
            });
        } catch (e) {
            console.warn(`Invalid selector in processAllElements: '${selector}'`, e);
        }
    });
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

    this.setupObserver();
    this.startAutoProcessing();

    // Immediate process followed by debounced to catch initial load
    this.processAllElements();
    setTimeout(() => this.processAllElements(), 500); // Retry shortly after for late loaders
  }

  public disable() {
    this.isRTLEnabled = false;
    this.removeCSS();
    
    // Disable Managers
    this.pasteInterceptor.disable();

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

  private applyDebugVisuals(element: HTMLElement, direction: Direction) {
      if (this.settings.debugMode) {
          element.classList.remove('rtl-debug-rtl', 'rtl-debug-ltr');
          if (direction === 'rtl') {
              element.classList.add('rtl-debug-rtl');
              element.setAttribute('data-rtl-debug', 'RTL Detected');
          } else if (direction === 'ltr') {
              element.classList.add('rtl-debug-ltr');
              element.setAttribute('data-rtl-debug', 'LTR Detected');
          } else {
              // Neutral - no visual or maybe a neutral visual?
              // For now, no visual for neutral
              element.removeAttribute('data-rtl-debug');
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

          // Build a safe matching function or list
          // We can't check 'matches' with invalid selectors without try-catch
          const safeSelectors: string[] = [];
          activeSelectors.forEach(s => {
              try {
                  document.querySelector(s); // Just to test validity, or trust the loop below
                  safeSelectors.push(s);
              } catch (e) {
                  // Ignore invalid
              }
          });

          const joinedSelectors = safeSelectors.join(', ');

          mutations.forEach((mutation) => {
             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;

                         // Check individual matches safely
                         let matched = false;
                         for (const s of safeSelectors) {
                             if (element.matches(s)) {
                                 matched = true;
                                 break;
                             }
                         }

                         if (matched) {
                             this.pendingElements.add(element);
                             hasRelevantMutation = true;
                         }

                         // Also check children
                         if (joinedSelectors) {
                             try {
                                const children = element.querySelectorAll(joinedSelectors);
                                if (children.length > 0) {
                                    children.forEach(child => {
                                        this.pendingElements.add(child as HTMLElement);
                                    });
                                    hasRelevantMutation = true;
                                }
                             } catch (e) {
                                 // Should not happen as we filtered joinedSelectors, but safe is safe
                             }
                         }
                     }
                 });
             } else if (mutation.type === 'characterData' || mutation.type === 'attributes') {
                  const target = mutation.target.nodeType === Node.ELEMENT_NODE
                    ? mutation.target as HTMLElement
                    : mutation.target.parentElement;

                  if (target) {
                      let matched = false;
                      for (const s of safeSelectors) {
                           try {
                               if (target.matches(s)) {
                                   matched = true;
                                   break;
                               }
                           } catch (e) {}
                      }

                      if (matched) {
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
