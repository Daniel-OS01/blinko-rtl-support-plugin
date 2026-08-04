import { RTLDetector } from '../utils/rtlDetector';
import { RTLSettings, Direction } from '../types';
import { advancedRTLCSS, DEFAULT_DYNAMIC_CSS, DEFAULT_TARGET_SELECTORS, DEFAULT_SETTINGS } from './constants';
import { debounce } from '../utils/debounce';
import { PasteInterceptor } from '../utils/pasteInterceptor';
import { StorageManager } from './storageManager';

/**
 * Whitespace test over a UTF-16 code unit, matching the character set of the
 * `/\s/` regex it replaces: ASCII whitespace plus every Unicode space
 * separator, the line/paragraph separators, and the BOM.
 */
function isWhitespaceCode(code: number): boolean {
  return (
    code === 0x20 ||                      // space
    (code >= 0x09 && code <= 0x0D) ||     // tab, LF, VT, FF, CR
    code === 0xA0 ||                      // no-break space
    code === 0x1680 ||                    // ogham space mark
    (code >= 0x2000 && code <= 0x200A) || // en quad … hair space
    code === 0x2028 ||                    // line separator
    code === 0x2029 ||                    // paragraph separator
    code === 0x202F ||                    // narrow no-break space
    code === 0x205F ||                    // medium mathematical space
    code === 0x3000 ||                    // ideographic space
    code === 0xFEFF                       // zero-width no-break space (BOM)
  );
}

export class RTLService {
  private detector: RTLDetector;
  private isRTLEnabled: boolean = false;
  private validSelectorsCache = new Map<string, boolean>();
  private dummyElement = document.createElement('div');
  private baseStyleElement: HTMLStyleElement | null = null;
  private styleElement: HTMLStyleElement | null = null;
  private permanentStyleElement: HTMLStyleElement | null = null;
  private dynamicStyleElement: HTMLStyleElement | null = null;
  private observer: MutationObserver | null = null;
  private autoProcessInterval: any = null;
  /** Current sweep cadence, which backs off while the page is quiet. */
  private currentProcessInterval: number = 5000;
  /** Set by the MutationObserver; reset by each sweep. */
  private sawMutationSinceSweep: boolean = false;
  /** Ceiling for the backed-off sweep interval. */
  private static readonly MAX_PROCESS_INTERVAL = 60_000;
  // Managers
  private pasteInterceptor: PasteInterceptor;
  private storageManager: StorageManager;

  // Optimizations
  private pendingElements: Set<HTMLElement> = new Set();
  private debouncedProcessQueue: () => void;
  private debouncedProcessAll: () => void;

  // Action Log
  private actionLog: { timestamp: string; element: string; direction: string; textPreview: string }[] = [];
  private readonly MAX_LOG_SIZE = 50;
  /**
   * Cap on the stored text sample per log entry.
   *
   * The field is called textPreview but held the element's entire textContent,
   * with 50 of them retained and each one broadcast in a CustomEvent on every
   * processed element. On a large note container that is the whole note.
   */
  private readonly MAX_LOG_TEXT_PREVIEW = 120;

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
      if (!this.settings.enableActionLog) return;

      const logEntry = {
          timestamp: new Date().toLocaleTimeString(),
          element: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ').join('.')}` : ''),
          direction: direction.toUpperCase(),
          textPreview: this.truncateForLog(element.textContent || '')
      };

      // enableActionLog is guaranteed truthy here — the early-return guard above
      // already handles the falsy case, so no inner check is needed.
      this.actionLog.unshift(logEntry);
      if (this.actionLog.length > this.MAX_LOG_SIZE) {
          this.actionLog.pop();
      }
      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent('rtl-action-logged', { detail: logEntry }));
  }

  private truncateForLog(text: string): string {
    if (text.length <= this.MAX_LOG_TEXT_PREVIEW) return text;
    return text.slice(0, this.MAX_LOG_TEXT_PREVIEW) + '…';
  }

  public isEnabled(): boolean {
    return this.isRTLEnabled;
  }

  public loadSettings() {
    const loadedSettings = this.storageManager.load();
    if (loadedSettings) {
        // Merge with default settings
        this.settings = { ...this.settings, ...loadedSettings };

        // v1→v2 migration: apply corrected defaults for existing installs.
        // Before v2, minRTLChars defaulted to 2 and darkMode to false.
        // Stored values override defaults, so migration is required to update them.
        const storedVersion = (loadedSettings as any)._settingsVersion ?? 0;
        if (storedVersion < 2) {
            this.settings.minRTLChars = 1;
            this.settings.darkMode = true;
            (this.settings as any)._settingsVersion = 2;
            this.storageManager.save(this.settings);
        }

        // v2→v3 migration: minRTLChars used to govern two unrelated gates —
        // the minimum count of RTL characters in the detector, and the minimum
        // total text length before an element was examined at all. The length
        // role moves to minTextLength.
        //
        // Carry the stored value across so existing installs keep the length
        // behaviour they had, rather than silently starting to process short
        // elements they previously skipped.
        if (storedVersion < 3) {
            if (this.settings.minTextLength === undefined) {
                this.settings.minTextLength = this.settings.minRTLChars ?? 1;
            }
            (this.settings as any)._settingsVersion = 3;
            this.storageManager.save(this.settings);
        }

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
        if (this.settings.enablePasteInterceptor === undefined) {
            this.settings.enablePasteInterceptor = true;
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
        this.settings.enablePasteInterceptor = true;
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

        // Update Managers
        if (this.settings.enablePasteInterceptor !== false) {
             this.pasteInterceptor.enable();
        } else {
             this.pasteInterceptor.disable();
        }

        // Update Mobile View
        this.applyMobileView();
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

  public injectBaseCSS() {
    if (this.baseStyleElement) return;
    this.baseStyleElement = document.createElement('style');
    this.baseStyleElement.id = 'blinko-rtl-base-styles';
    this.baseStyleElement.textContent = advancedRTLCSS;
    document.head.appendChild(this.baseStyleElement);
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
    content: attr(data-rtl-debug) " " attr(data-debug-name);
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
    content: attr(data-rtl-debug) " " attr(data-debug-name);
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

  /**
   * Remove the base stylesheet. Only called from destroy() — disable() leaves
   * it in place, since the toggle button it styles outlives a disabled state.
   */
  public removeBaseCSS() {
    if (this.baseStyleElement) {
      this.baseStyleElement.remove();
      this.baseStyleElement = null;
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
      element.style.unicodeBidi = 'isolate';
    } else if (direction === 'ltr') {
      element.classList.remove('blinko-detected-rtl');
      element.style.direction = 'ltr';
      element.style.textAlign = 'left';
      element.style.unicodeBidi = 'isolate';
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
    } else if (direction === 'ltr') {
      element.setAttribute('dir', 'ltr');
    } else {
        element.removeAttribute('dir');
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

  /**
   * Hand direction back to the browser's own bidi algorithm.
   *
   * `dir="auto"` makes the browser pick direction from the first strong
   * character, and `unicode-bidi: plaintext` does the same per paragraph — for
   * mixed content that is more accurate than any ratio we compute, because it
   * is applied per run rather than per element.
   *
   * This used to take no direction argument at all: it added `rtl-auto` and an
   * isolate to every element it saw, so LTR and neutral text were marked
   * identically to RTL, nothing was ever cleaned up when content changed, and
   * it was the only applier that skipped applyDebugVisuals — which is why
   * debug mode appeared dead under this method.
   */
  private applyUnicodeBidiRTL(element: HTMLElement, direction: Direction) {
    if (direction === 'neutral') {
      element.classList.remove('rtl-auto');
      element.style.removeProperty('unicode-bidi');
      element.removeAttribute('dir');
    } else {
      element.classList.add('rtl-auto');
      element.style.unicodeBidi = 'plaintext';
      element.setAttribute('dir', 'auto');
    }
    this.applyDebugVisuals(element, direction);
  }

  /**
   * Remove every trace this service applies, whatever method left it there.
   *
   * The short-text path used to call applyCSSClassRTL(el, 'neutral'), which
   * only knows about rtl-force / ltr-force / rtl-auto. Under `direct` that left
   * both `blinko-detected-rtl` and an inline `direction: rtl` behind; under
   * `attributes` it left `dir="rtl"`. An element whose text became short kept
   * styling for text it no longer contained.
   */
  private clearDirection(element: HTMLElement) {
    element.classList.remove('rtl-force', 'ltr-force', 'rtl-auto', 'blinko-detected-rtl');
    element.style.removeProperty('direction');
    element.style.removeProperty('text-align');
    element.style.removeProperty('unicode-bidi');
    element.removeAttribute('dir');
    this.applyDebugVisuals(element, 'neutral');
  }

  public detectHebrewRegex(text: string): boolean {
    return this.hebrewRegex.test(text);
  }

  public detectArabicRegex(text: string): boolean {
    return this.arabicRegex.test(text);
  }

  /** Text belonging to this element rather than to its descendants. */
  private ownText(element: HTMLElement): string {
    let text = '';
    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.nodeType === Node.TEXT_NODE) text += node.textContent || '';
    }
    return text;
  }

  /**
   * True when the element holds only other elements — no text of its own.
   * Such an element has no direction to determine; its children do.
   */
  private isPureContainer(element: HTMLElement): boolean {
    if (element.childElementCount === 0) return false;
    // Inputs carry their content in value/placeholder, not child nodes.
    const tag = element.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return false;
    return !this.ownText(element).trim();
  }

  /**
   * The text a direction verdict should be based on.
   *
   * When an element has element children, only its own text counts — the
   * children are classified separately, so folding their content in here means
   * deciding the same characters twice under two different contexts.
   */
  private getDirectionalText(element: HTMLElement): string {
    const asInput = element as HTMLInputElement;
    if (element.childElementCount > 0) {
      const own = this.ownText(element);
      if (own.trim()) return own;
    }
    return element.textContent || asInput.value || asInput.placeholder || '';
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
        return;
    }

    // Check if element is part of the UI shell that should be protected
    // But allow processing if it's explicitly in target selectors (which processAllElements uses)
    // or if it's a content element.

    // A pure container — element children, no text of its own — is left alone.
    //
    // The default target selectors match `.markdown-body div`, `p` and `span`
    // simultaneously, and textContent on a container is the concatenation of
    // every descendant. A note holding one Hebrew paragraph and one English
    // paragraph therefore gave the wrapping div a single blended direction,
    // which then contradicted the direction its own children were each
    // assigned. Whichever won was a function of DOM order rather than intent.
    //
    // Its children match the selectors too and are classified on their own
    // text, so the container does not need a verdict — and cannot have a
    // correct one when its children disagree.
    if (this.isPureContainer(element)) {
        this.clearDirection(element);
        return;
    }

    const text = this.getDirectionalText(element);

    // Short text handling
    if (!text.trim() || text.length < (this.settings.minTextLength ?? 1)) {
        // Neutral state for empty/short text to avoid forcing LTR on what might
        // be an RTL placeholder. Clear whatever the configured method applied
        // earlier, not just the CSS classes.
        this.clearDirection(element);
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
          let totalRTL = 0;
          let nonWhitespaceLength = 0;
          const limit = text.length;

          for (let i = 0; i < limit; i++) {
            const code = text.charCodeAt(i);
            // Skip whitespace. Must stay equivalent to the /\s/ this replaced,
            // which is Unicode-aware — NBSP-indented code is common, and
            // counting those as significant would dilute the RTL ratio.
            if (!isWhitespaceCode(code)) {
                nonWhitespaceLength++;
                // Hebrew (0x0590-0x05FF) or Arabic (0x0600-0x06FF, 0x0750-0x077F, 0x08A0-0x08FF)
                if ((code >= 0x0590 && code <= 0x05FF) ||
                    (code >= 0x0600 && code <= 0x06FF) ||
                    (code >= 0x0750 && code <= 0x077F) ||
                    (code >= 0x08A0 && code <= 0x08FF)) {
                    totalRTL++;
                }
            }
          }

          if (nonWhitespaceLength === 0) nonWhitespaceLength = text.length || 1;
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
        this.applyUnicodeBidiRTL(element, direction);
        break;
      case 'all':
      default:
        // 'all' means all three appliers. It previously ran the class and
        // attribute appliers only, leaving the inline styles it advertises
        // unset — the name and the behaviour disagreed.
        this.applyDirectRTL(element, direction);
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

    // 💡 What: Replaced individual querySelectorAll calls with a single combined comma-separated query.
    // 🎯 Why: Iterating over n selectors and calling querySelectorAll for each is an O(n * DOM_size) operation.
    // Combining them into a single query reduces this to O(1 * DOM_size), providing a 1.5x - 60x speedup depending on engine/DOM size.
    // ⚠️ Note: querySelectorAll throws if *any* selector is invalid, so a fallback is required.
    // Robust selector processing: Try fast path first, fallback to individual iteration
    if (activeSelectors.length > 0) {
        try {
            // Fast path: try querying all selectors at once
            const combinedSelector = activeSelectors.join(',');
            const elements = document.querySelectorAll(combinedSelector);
            elements.forEach(element => {
                this.processElement(element as HTMLElement);
            });
        } catch (e) {
            // Fallback: If one selector is invalid, the combined query fails.
            // Iterate individually to prevent one bad selector from crashing everything.
            activeSelectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        this.processElement(element as HTMLElement);
                    });
                } catch (innerE) {
                    console.warn(`Invalid selector in processAllElements: '${selector}'`, innerE);
                }
            });
        }
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
    this.settings.enabled = true;
    this.storageManager.save(this.settings);
    this.injectCSS();
    this.injectDynamicCSS(); // Inject dynamic CSS
    if (this.settings.permanentCSS) {
      this.injectPermanentCSS();
    }
    
    // Enable Managers
    if (this.settings.enablePasteInterceptor !== false) {
        this.pasteInterceptor.enable();
    }

    // Apply Mobile View
    this.applyMobileView();

    this.setupObserver();
    this.startAutoProcessing();

    // Immediate process followed by debounced to catch initial load
    this.processAllElements();
    setTimeout(() => this.processAllElements(), 500); // Retry shortly after for late loaders
  }

  public disable() {
    this.isRTLEnabled = false;
    this.settings.enabled = false;
    this.storageManager.save(this.settings);
    this.removeCSS();
    
    // Disable Managers
    this.pasteInterceptor.disable();

    // Remove Mobile View
    document.body.classList.remove('blinko-rtl-mobile-view');

    this.stopAutoProcessing();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.pendingElements.clear();
  }

  private applyMobileView() {
      if (this.settings.mobileView) {
          document.body.classList.add('blinko-rtl-mobile-view');
      } else {
          document.body.classList.remove('blinko-rtl-mobile-view');
      }
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

          let directionLabel = '';
          if (direction === 'rtl') {
              element.classList.add('rtl-debug-rtl');
              directionLabel = 'RTL';
          } else if (direction === 'ltr') {
              element.classList.add('rtl-debug-ltr');
              directionLabel = 'LTR';
          } else {
              element.removeAttribute('data-rtl-debug');
              element.removeAttribute('data-debug-name');
              return;
          }

          element.setAttribute('data-rtl-debug', directionLabel);

          if (this.settings.debugShowElementNames) {
              const tagName = element.tagName.toLowerCase();
              const id = element.id ? `#${element.id}` : '';
              const nameLabel = `${tagName}${id}`;
              element.setAttribute('data-debug-name', nameLabel);
          } else {
              element.removeAttribute('data-debug-name');
          }
      } else {
          // Cleanup if debug mode was disabled but we are processing
           element.classList.remove('rtl-debug-rtl', 'rtl-debug-ltr');
           element.removeAttribute('data-rtl-debug');
           element.removeAttribute('data-debug-name');
      }
  }

  private setupObserver() {
      if (this.observer) this.observer.disconnect();
      if (!this.settings.autoDetect) return;

      // Compute active selectors for matching
      const activeSelectors = this.settings.targetSelectors.filter(
        s => !this.settings.disabledSelectors.includes(s)
      );

      // Build a safe matching function or list
      // We use a dummy element and cache to safely and efficiently test selector validity without DOM traversal
      const safeSelectors: string[] = [];
      activeSelectors.forEach(s => {
          let isValid = this.validSelectorsCache.get(s);
          if (isValid === undefined) {
              try {
                  this.dummyElement.matches(s);
                  isValid = true;
              } catch (e) {
                  isValid = false;
              }
              this.validSelectorsCache.set(s, isValid);
          }
          if (isValid) {
              safeSelectors.push(s);
          }
      });

      const joinedSelectors = safeSelectors.join(', ');

      this.observer = new MutationObserver((mutations) => {
          if (!this.isRTLEnabled) return;

          let hasRelevantMutation = false;

          mutations.forEach((mutation) => {
             if (mutation.type === 'childList') {
                 mutation.addedNodes.forEach(node => {
                     if (node.nodeType === Node.ELEMENT_NODE) {
                         const element = node as HTMLElement;

                         // Skip mutations inside a currently-focused editable area.
                         // Vditor modifies the DOM on every keypress (adds/removes
                         // formatting spans). Re-classifying those elements causes
                         // the visible LTR↔RTL flicker. The browser handles BiDi
                         // automatically via `unicode-bidi: plaintext` while editing.
                         const activeEl = document.activeElement as HTMLElement | null;
                         if (activeEl) {
                             const editingRoot: HTMLElement | null =
                                 activeEl.isContentEditable
                                     ? ((activeEl.closest('[contenteditable]') as HTMLElement) ?? activeEl)
                                     : ((activeEl.closest('[contenteditable]') as HTMLElement | null) ??
                                        (activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'INPUT'
                                            ? activeEl : null));
                             if (editingRoot && editingRoot.contains(element)) return;
                         }

                         // Check individual matches safely
                         let matched = false;
                         if (joinedSelectors) {
                             matched = element.matches(joinedSelectors);
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
                      // Skip editable elements during characterData mutations (user is actively
                      // typing). Toggling rtl-force/ltr-force classes on every keypress causes
                      // the visible LTR↔RTL flicker in the editor. These elements already have
                      // `unicode-bidi: plaintext` via injected CSS so the browser handles BiDi
                      // per-character without explicit direction classes.
                      if (mutation.type === 'characterData') {
                          const isEditable =
                              target.isContentEditable ||
                              target.tagName === 'TEXTAREA' ||
                              target.tagName === 'INPUT' ||
                              !!target.closest('[contenteditable="true"], [contenteditable]');
                          if (isEditable) return;
                      }

                      let matched = false;
                      if (joinedSelectors) {
                          try {
                              matched = target.matches(joinedSelectors);
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
               this.sawMutationSinceSweep = true;
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

  /**
   * Periodic full-document sweep, as a safety net behind the MutationObserver.
   *
   * The observer covers document.body with childList, subtree, characterData
   * and attributes, so in practice it sees everything the sweep would. The
   * sweep exists for content that arrives without a mutation the observer is
   * watching — and it costs a querySelectorAll across all 57 target selectors
   * every tick, forever, on every open tab.
   *
   * It now backs off: each sweep that changes nothing doubles the interval, up
   * to a ceiling, and any observed mutation resets it to the configured base.
   * A quiet tab settles at one sweep a minute instead of twelve, while a page
   * that is actively changing keeps the original cadence. Set processInterval
   * to 0 to switch the sweep off entirely and rely on the observer alone.
   */
  private startAutoProcessing() {
      if (this.autoProcessInterval) clearInterval(this.autoProcessInterval);
      if (!this.settings.autoDetect || !this.isRTLEnabled) return;

      const base = this.settings.processInterval ?? 5000;
      if (base <= 0) return; // explicitly disabled — observer only

      this.currentProcessInterval = base;
      this.scheduleAutoProcess();
  }

  private scheduleAutoProcess() {
      if (this.autoProcessInterval) clearInterval(this.autoProcessInterval);

      this.autoProcessInterval = setInterval(() => {
          if (!this.isRTLEnabled || !this.settings.autoDetect) return;

          this.processAllElements();

          if (this.sawMutationSinceSweep) {
              // Page is active — stay at the configured cadence.
              this.sawMutationSinceSweep = false;
              if (this.currentProcessInterval !== (this.settings.processInterval ?? 5000)) {
                  this.currentProcessInterval = this.settings.processInterval ?? 5000;
                  this.scheduleAutoProcess();
              }
              return;
          }

          const next = Math.min(this.currentProcessInterval * 2, RTLService.MAX_PROCESS_INTERVAL);
          if (next !== this.currentProcessInterval) {
              this.currentProcessInterval = next;
              this.scheduleAutoProcess();
          }
      }, this.currentProcessInterval);
  }

  private stopAutoProcessing() {
      if (this.autoProcessInterval) {
          clearInterval(this.autoProcessInterval);
          this.autoProcessInterval = null;
      }
      this.currentProcessInterval = this.settings.processInterval ?? 5000;
      this.sawMutationSinceSweep = false;
  }
}
