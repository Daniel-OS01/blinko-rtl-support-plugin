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
  private actionLog: { timestamp: string; element: string; direction: string; textPreview: string }[] = [];

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
    return [...this.actionLog].reverse(); // Newest first
  }

  private logAction(element: HTMLElement, isRTL: boolean) {
      const entry = {
          timestamp: new Date().toLocaleTimeString(),
          element: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ').join('.')}` : ''),
          direction: isRTL ? 'RTL' : 'LTR',
          textPreview: (element.textContent || '').substring(0, 30).trim()
      };
      this.actionLog.push(entry);
      if (this.actionLog.length > this.MAX_LOG_SIZE) {
          this.actionLog.shift();
      }
      
      // Dispatch event for UI
      window.dispatchEvent(new CustomEvent('rtl-action-logged', { detail: entry }));
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
      this.dynamicStyleElement.textContent = this.settings.dynamicCSS || DEFAULT_DYNAMIC_CSS;
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

  // Method 1: Direct style application (Updated to use Dynamic CSS Class)
  private applyDirectRTL(element: HTMLElement, isRTL: boolean) {
    if (isRTL) {
      element.classList.add('blinko-detected-rtl');
      // Clean up legacy inline styles
      element.style.removeProperty('direction');
      element.style.removeProperty('text-align');
      element.style.removeProperty('unicode-bidi');
    } else {
      element.classList.remove('blinko-detected-rtl');
      // Clean up legacy inline styles
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

  // Method 3: CSS class-based RTL
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
        return;
    }

    // Explicitly enforce LTR for code blocks if not detected otherwise?
    // User requested code blocks to be CHECKED for RTL. So we remove the forceful LTR.
    // However, if the user explicitly disables the selector for code blocks, we should probably respect that.
    // Skip layout elements
    // Note: We used to skip .flex, .grid, header, nav, .sidebar, .toolbar, button, .btn here
    // But since the user requested "ALL text elements" including buttons, and we have
    // specific target selectors, we rely on the disabledSelectors logic to filter out unwanted elements.
    // If layout breaks, user should use disabledSelectors to exclude specific classes.

    const text = element.textContent || (element as HTMLInputElement).value || '';
    if (!text.trim() || text.length < this.settings.minRTLChars) return;

    let isRTL = false;

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
      // Hebrew regex detection
      if (this.settings.hebrewRegex && this.detectHebrewRegex(text)) {
        isRTL = true;
      }
      // Arabic regex detection
      else if (this.settings.arabicRegex && this.detectArabicRegex(text)) {
        isRTL = true;
      }
      // Original detector
      else {
        isRTL = this.detector.detectRTL(text);
      }
    }

    // Log the action for transparency
    this.logAction(element, isRTL);

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
        // Apply all methods for maximum compatibility
        // Prioritize CSS Class method as it uses the dynamic CSS
        this.applyCSSClassRTL(element, isRTL);
        this.applyAttributeRTL(element, isRTL);

        // We DO NOT apply direct styles in 'all' mode anymore to ensure Dynamic CSS takes precedence.
        // Direct styles (inline) override CSS classes unless !important is used, which limits flexibility.
        // Users who want inline styles can choose 'direct' method explicitly.
        // this.applyDirectRTL(element, isRTL);
        break;
      default:
        // Default fallthrough to CSS class if something unknown is selected, but 'css' is default in settings now.
        this.applyCSSClassRTL(element, isRTL);
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
    if (selectors) {
        document.querySelectorAll(selectors).forEach(element => {
            this.processElement(element as HTMLElement);
        });
    }
    // Removed legacy code block LTR enforcement
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
          this.processAllElements(); // Re-process to apply visuals
      } else {
          document.body.classList.remove('rtl-debug-mode');
          // Clear debug styles
          document.querySelectorAll('.rtl-debug-rtl, .rtl-debug-ltr').forEach(el => {
              el.classList.remove('rtl-debug-rtl', 'rtl-debug-ltr');
              el.removeAttribute('data-rtl-debug');
          });
      }
      return newVal;
  }

  public getActionLog() {
      return this.actionLog;
  }

  private logAction(element: HTMLElement, isRTL: boolean) {
      const logEntry = {
          timestamp: new Date().toLocaleTimeString(),
          element: element.tagName.toLowerCase() + (element.className ? `.${element.className.split(' ').join('.')}` : ''),
          direction: isRTL ? 'RTL' : 'LTR',
          textPreview: (element.textContent || '').substring(0, 20) + '...'
      };

      this.actionLog.unshift(logEntry);
      if (this.actionLog.length > 50) this.actionLog.pop(); // Keep last 50 entries

      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent('rtl-action-logged', { detail: logEntry }));
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
