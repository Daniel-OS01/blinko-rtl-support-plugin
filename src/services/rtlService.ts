import { RTLDetector } from '../utils/rtlDetector';
import { RTLSettings } from '../types';
import { advancedRTLCSS } from './constants';
import { debounce } from '../utils/debounce';

export class RTLService {
  private detector: RTLDetector;
  private isRTLEnabled: boolean = false;
  private styleElement: HTMLStyleElement | null = null;
  private permanentStyleElement: HTMLStyleElement | null = null;
  private observer: MutationObserver | null = null;
  private autoProcessInterval: any = null;

  // Optimizations
  private pendingElements: Set<HTMLElement> = new Set();
  private debouncedProcessQueue: () => void;
  private debouncedProcessAll: () => void;

  // Hebrew regex from userscript
  private readonly hebrewRegex = /\p{Script=Hebrew}/u;
  private readonly arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

  private settings: RTLSettings = {
    enabled: false,
    sensitivity: 'medium',
    forceDirection: 'auto',
    autoDetect: true,
    manualMode: false,
    manualToggle: false,
    darkMode: false,
    method: 'all',
    customCSS: '',
    permanentCSS: false,
    targetSelectors: [
      '.markdown-body p',
      '.markdown-body div',
      '.vditor-reset p',
      '.vditor-reset div',
      '.card-masonry-grid .markdown-body p',
      '.card-masonry-grid .markdown-body div',
      'textarea',
      '[contenteditable="true"]',
      'input[type="text"]',
      '.CodeMirror-line',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'span', 'li', 'td', 'th'
    ],
    minRTLChars: 2,
    processInterval: 2000,
    hebrewRegex: true,
    arabicRegex: true,
    mixedContent: true,
    savedPresets: [],
    // Defaults for extended properties
    vditorSupport: true,
    markdownSupport: true,
    enhancedTextProcessing: true,
    processMixedContent: false
  };

  constructor(detector: RTLDetector) {
    this.detector = detector;
    this.loadSettings();
    
    // Initialize optimization debouncers
    this.debouncedProcessAll = debounce(() => this.processAllElements(), 200);
    this.debouncedProcessQueue = debounce(() => {
       this.processPendingElements();
    }, 50);
  }

  public getSettings(): RTLSettings {
    return { ...this.settings };
  }

  public isEnabled(): boolean {
    return this.isRTLEnabled;
  }

  public loadSettings() {
    const savedSettings = localStorage.getItem('blinko-rtl-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        this.settings = { ...this.settings, ...parsed };

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

    if (this.settings.permanentCSS && this.settings.customCSS) {
      this.injectPermanentCSS();
    } else {
      this.removePermanentCSS();
    }

    // Re-setup observer and processing if enabled
    if (this.isRTLEnabled) {
        this.setupObserver();
        this.startAutoProcessing();
        this.debouncedProcessAll();
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
      this.styleElement.id = 'blinko-rtl-advanced-styles';
      this.styleElement.textContent = advancedRTLCSS;
      document.head.appendChild(this.styleElement);
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
  }

  // Method 1: Direct style application
  private applyDirectRTL(element: HTMLElement, isRTL: boolean) {
    if (isRTL) {
      element.style.direction = 'rtl';
      element.style.textAlign = 'right';
      element.style.unicodeBidi = 'embed';
    } else {
      element.style.direction = 'ltr';
      element.style.textAlign = 'left';
      element.style.unicodeBidi = 'normal';
    }
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
  }

  // Method 3: CSS class-based RTL
  private applyCSSClassRTL(element: HTMLElement, isRTL: boolean) {
    element.classList.remove('rtl-force', 'ltr-force', 'rtl-auto');
    if (isRTL) {
      element.classList.add('rtl-force');
    } else {
      element.classList.add('ltr-force');
    }
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

    // Explicitly enforce LTR for code blocks (Optimization)
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'pre' || tagName === 'code' || element.classList.contains('code-block')) {
        this.applyDirectRTL(element, false);
        return;
    }

    // Skip layout elements
    if (element.closest('.flex, .grid, header, nav, .sidebar, .toolbar, button, .btn')) {
      return;
    }

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
        // Apply all methods for maximum compatibility
        this.applyDirectRTL(element, isRTL);
        this.applyAttributeRTL(element, isRTL);
        this.applyCSSClassRTL(element, isRTL);
        break;
    }

    // Handle mixed content if enabled (from RTLProcessor logic)
    if (this.settings.processMixedContent && this.settings.mixedContent) {
        // Implementation from RTLProcessor's processChildTextNodes could go here
        // For now, leaving it simple as per original index.tsx
    }
  }

  public processAllElements = () => {
    if (!this.isRTLEnabled) return;
    
    const selectors = this.settings.targetSelectors.join(', ');
    if (selectors) {
        document.querySelectorAll(selectors).forEach(element => {
            this.processElement(element as HTMLElement);
        });
    }

    // Ensure code blocks are reset to LTR
    document.querySelectorAll('pre, code, .code-block').forEach(el => {
        this.applyDirectRTL(el as HTMLElement, false);
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
    if (this.settings.permanentCSS) {
      this.injectPermanentCSS();
    }
    this.setupObserver();
    this.startAutoProcessing();
    this.debouncedProcessAll();
  }

  public disable() {
    this.isRTLEnabled = false;
    this.removeCSS();
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

  private setupObserver() {
      if (this.observer) this.observer.disconnect();
      if (!this.settings.autoDetect) return;

      this.observer = new MutationObserver((mutations) => {
          if (!this.isRTLEnabled) return;

          let hasRelevantMutation = false;

          mutations.forEach((mutation) => {
             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;
                         if (this.settings.targetSelectors.some(s => element.matches(s))) {
                             this.pendingElements.add(element);
                             hasRelevantMutation = true;
                         }
                         const selectors = this.settings.targetSelectors.join(', ');
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
                      if (this.settings.targetSelectors.some(s => target.matches(s))) {
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