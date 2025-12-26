import { RTLDetector } from '../utils/rtlDetector';
import { RTLSettings } from '../types';
import { advancedRTLCSS } from './constants';

export class RTLService {
  private detector: RTLDetector;
  private isRTLEnabled: boolean = false;
  private styleElement: HTMLStyleElement | null = null;
  private permanentStyleElement: HTMLStyleElement | null = null;
  private observer: MutationObserver | null = null;
  private autoProcessInterval: NodeJS.Timeout | null = null;

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
        setTimeout(() => this.processAllElements(), 100);
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
    console.log('Processing all elements, RTL enabled:', this.isRTLEnabled, 'Method:', this.settings.method);

    let totalProcessed = 0;

    // Merge target selectors with custom selectors if any
    const allSelectors = [...this.settings.targetSelectors, ...(this.settings.customSelectors || [])];
    // Remove duplicates
    const uniqueSelectors = [...new Set(allSelectors)];

    uniqueSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        // console.log(`Found ${elements.length} elements for selector: ${selector}`);
        elements.forEach(element => {
          this.processElement(element as HTMLElement);
          totalProcessed++;
        });
      } catch (error) {
        console.warn(`Invalid selector: ${selector}`);
      }
    });

    // Additional logic from RTLProcessor for Vditor and Markdown if enabled
    if (this.settings.vditorSupport) {
         // Add specific vditor logic if needed, or rely on selectors
         // The selectors in default settings cover most vditor cases
    }

    console.log(`Total elements processed: ${totalProcessed}`);
  }

  private setupObserver() {
    if (this.observer) this.observer.disconnect();

    if (!this.settings.autoDetect) return;

    this.observer = new MutationObserver((mutations) => {
      if (!this.isRTLEnabled) return;

      let shouldProcess = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              this.processElement(element);

              this.settings.targetSelectors.forEach(selector => {
                try {
                  element.querySelectorAll(selector).forEach(child => {
                    this.processElement(child as HTMLElement);
                  });
                } catch (error) {
                  // Ignore invalid selectors
                }
              });

              shouldProcess = true;
            }
          });
        }
      });

      if (shouldProcess) {
        // Simple debounce
        setTimeout(this.processAllElements, 100);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private startAutoProcessing() {
    if (this.autoProcessInterval) {
      clearInterval(this.autoProcessInterval);
    }

    if (this.settings.autoDetect && this.isRTLEnabled) {
      this.autoProcessInterval = setInterval(() => {
        if (this.isRTLEnabled && this.settings.autoDetect) {
          this.processAllElements();
        } else {
          if (this.autoProcessInterval) {
              clearInterval(this.autoProcessInterval);
              this.autoProcessInterval = null;
          }
        }
      }, this.settings.processInterval);
    }
  }

  private stopAutoProcessing() {
    if (this.autoProcessInterval) {
      clearInterval(this.autoProcessInterval);
      this.autoProcessInterval = null;
    }
  }

  public enable() {
    console.log('Enabling RTL with settings:', this.settings);
    this.isRTLEnabled = true;
    this.injectCSS();
    this.injectPermanentCSS();
    this.setupObserver();
    this.startAutoProcessing();

    localStorage.setItem('blinko-rtl-enabled', 'true');

    // Process existing elements immediately
    setTimeout(this.processAllElements, 100);
  }

  public disable() {
    this.isRTLEnabled = false;
    this.removeCSS();
    this.stopAutoProcessing();

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    localStorage.setItem('blinko-rtl-enabled', 'false');

    // Remove RTL styling
    document.querySelectorAll('[dir="rtl"], [lang="he"], [lang="ar"]').forEach(el => {
      el.removeAttribute('dir');
      el.removeAttribute('lang');
    });

    document.querySelectorAll('.rtl-force, .rtl-auto, .ltr-force').forEach(el => {
      el.classList.remove('rtl-force', 'rtl-auto', 'ltr-force');
      (el as HTMLElement).style.direction = '';
      (el as HTMLElement).style.textAlign = '';
      (el as HTMLElement).style.unicodeBidi = '';
    });
  }

  public toggle() {
    if (this.isRTLEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  public toggleManual(): boolean {
    this.settings.manualToggle = !this.settings.manualToggle;
    this.updateSettings({ manualToggle: this.settings.manualToggle });
    if (this.isRTLEnabled) {
      this.processAllElements();
    }
    return this.settings.manualToggle;
  }
}
